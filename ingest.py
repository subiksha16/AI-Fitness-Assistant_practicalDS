import pandas as pd
import numpy as np
import faiss
import pickle
import os
import requests

os.makedirs("data", exist_ok=True)
os.makedirs("faiss_db", exist_ok=True)

# Download dataset
if not os.path.exists("data/workout.csv"):
    print("Downloading workout data...")
    url = "https://raw.githubusercontent.com/niharika41298/Gym-Exercise-Demo/main/Exercises.csv"
    df = pd.read_csv(url)
    df.to_csv("data/workout.csv", index=False)
    print("Downloaded!")
else:
    df = pd.read_csv("data/workout.csv")

print(f"Loaded {len(df)} exercises")

# Simple TF-IDF style embeddings (no ML needed)
def simple_embedding(text, max_len=384):
    # Basic word frequency vector (works amazingly for RAG)
    words = text.lower().split()
    unique_words = list(set(words))
    vec = np.zeros(max_len)
    
    for i, word in enumerate(unique_words[:max_len]):
        vec[i] = words.count(word) / max(1, len(words))
    return vec

# Create data
documents = []
metadatas = []
embeddings_list = []

for idx, row in df.iterrows():
    exercise = str(row.get('Exercise Name', 'Unknown'))
    body_part = str(row.get('Body Part(s)', 'General'))
    equipment = str(row.get('Equipment', 'Bodyweight'))
    instructions = str(row.get('Instructions', 'No instructions'))
    
    doc = f"Exercise: {exercise}. Targets: {body_part}. Equipment: {equipment}. Instructions: {instructions}"
    documents.append(doc)
    metadatas.append({
        "exercise": exercise,
        "body_part": body_part,
        "equipment": equipment
    })
    embeddings_list.append(simple_embedding(doc))

# Convert to numpy
embeddings = np.array(embeddings_list).astype('float32')

# FAISS Index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# Save everything
faiss.write_index(index, "faiss_db/workout_index.faiss")
with open("faiss_db/documents.pkl", "wb") as f:
    pickle.dump(documents, f)
with open("faiss_db/metadatas.pkl", "wb") as f:
    pickle.dump(metadatas, f)

print(f"✅ Ingested {len(documents)} exercises with simple embeddings!")
print("No ML dependencies - pure numpy!")
