// fitness-api.js
const API_URL = 'http://localhost:5000/api';

export const fitnessAPI = {
  async checkHealth() {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
  },

  async askQuestion(question) {
    const res = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    return res.json();
  },

  async getDataset() {
    const res = await fetch(`${API_URL}/dataset`);
    return res.json();
  }
};