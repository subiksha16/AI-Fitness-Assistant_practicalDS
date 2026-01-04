



# AI Fitness Assistant

AI Fitness Assistant is an intelligent workout companion that combines a high-performance Python backend with a modern React + Vite frontend. It leverages **Retrieval-Augmented Generation (RAG)** to help users discover exercises, build routines, and receive AI-assisted fitness guidance based on curated datasets.

---

## 🌟 Features

* **AI-Powered Q&A:** Get expert answers to fitness questions using a FAISS vector database for document-grounded retrieval.
* **Exercise Retrieval:** Seamlessly fetch workout data through a dedicated `fitness-api.js` client.
* **Modern Tech Stack:** Built with React, Vite, Tailwind CSS, and ESLint for a fast and optimized developer experience.
* **Data Pipeline:** Includes automated scripts for data ingestion (`ingest.py`) and dataset management (`dataset.py`).

---

## 🏗 Project Structure

```text
AI-Fitness-Assistant_practicalDS/
├── app.py                # Main Python app / backend entrypoint
├── ingest.py             # Script to ingest fitness data into FAISS
├── dataset.py            # Dataset utilities and loaders
├── requirements.txt      # Python dependencies
├── fitness-api.js        # Frontend API calls for fitness/exercise data
├── index.html            # Frontend entry HTML
├── src/                  # React source (components, pages, hooks)
├── public/               # Static assets
├── faiss_db/             # Vector database files
├── data/                 # Raw/source fitness data
├── infrastructure/       # Infrastructure or deployment configs
├── package.json          # Node.js dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

# AI Fitness Assistant - Setup Guide

## 🛠 Setup Instructions

### Prerequisites

* Python 3.10+ installed
* Node.js and npm installed (for the React frontend)
* (Optional) A virtual environment tool such as `venv` or `conda`

---

## Backend Setup (Python)

### 1. Clone the repository

```bash
git clone https://github.com/subiksha16/AI-Fitness-Assistant_practicalDS.git
cd AI-Fitness-Assistant_practicalDS
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your required API keys or model settings.

### 5. Ingest data into FAISS

```bash
python ingest.py
```

### 6. Run the backend

```bash
python app.py
```

---

## Frontend Setup (React + Vite)

### 1. Install Node dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

---

## ⚙️ Configuration

* **Tailwind CSS**: Managed via `tailwind.config.js` and `postcss.config.js`
* **ESLint**: React + Vite linting rules are defined in `eslint.config.js`
* **Vite**: Main bundler and proxy configuration is in `vite.config.js`

---

## 🚀 Future Improvements

* **Personalization**: Add authentication and user profiles for personalized workout plans
* **Computer Vision**: Integrate pose estimation to provide real-time form feedback
* **Scale**: Extend the dataset and FAISS index for broader fitness and nutritional coverage
* **DevOps**: Containerize the app with Docker and add CI/CD workflows for automated testing
