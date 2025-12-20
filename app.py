from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import faiss
import pickle
import numpy as np
import requests
import json

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Load FAISS index
index = faiss.read_index("faiss_db/workout_index.faiss")
with open("faiss_db/documents.pkl", "rb") as f:
    documents = pickle.load(f)
with open("faiss_db/metadatas.pkl", "rb") as f:
    metadatas = pickle.load(f)

def simple_embedding(text, max_len=384):
    words = text.lower().split()
    unique_words = list(set(words))
    vec = np.zeros(max_len)
    for i, word in enumerate(unique_words[:max_len]):
        vec[i] = words.count(word) / max(1, len(words))
    return vec.astype('float32')

class Query(BaseModel):
    question: str

@app.post("/chat")
async def rag_chat(query: Query):
    # Simple embedding search
    query_emb = simple_embedding(query.question)
    query_emb = query_emb.reshape(1, -1)
    distances, indices = index.search(query_emb, 3)
    
    context = []
    sources = []
    for i, idx in enumerate(indices[0]):
        if idx < len(documents):
            context.append(documents[idx])
            sources.append(metadatas[idx])
    
    context_text = "\n\n".join(context)
    
    # Direct Ollama API call
    prompt = f"""You are a gym trainer AI. Answer using ONLY these exercises:

{context_text}

Question: {query.question}

Answer:"""
    
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2:1b",
            "prompt": prompt,
            "stream": False
        }
    )
    
    result = response.json()
    answer = result['response']
    
    return {
        "answer": answer,
        "sources": sources
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
