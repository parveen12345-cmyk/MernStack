from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os

app = FastAPI()

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class Book(BaseModel):
    id: str
    title: str
    author: str
    category: str
    progress: int
    timeLeft: str
    coverUrl: str
    isFavorite: bool = False
    isCompleted: bool = False

class UserStats(BaseModel):
    pagesRead: int
    booksFinished: int
    streak: int
    monthlyGoalProgress: int

# --- Mock Database ---
DATA_FILE = "data.json"

def load_data():
    if not os.path.exists(DATA_FILE):
        initial_data = {
            "books": [
                {
                    "id": "1",
                    "title": "The Art of Resilience",
                    "author": "Marcus Aurelius",
                    "category": "Philosophy",
                    "progress": 35,
                    "timeLeft": "4 hrs left",
                    "coverUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpAkBGa1EL2pkc04O-wIWY_sHn_jiYd5FkdcSvq6wsPAfBxwtHlcMrvXkbp_XoLYndj8EUFp5kt2jgEIWb0NNUkBR_g12n-VMfvxhaa501MrS9SyqHrEY479vUZJd6eEf1KA354-ao3EXy2lYweuRzsSy2vI2dOWiBFU5klVOMXp_Js37HqJkAk-LkvqX7mjktpvun3mZkLTMoyNB-moeQoHdNKlAtSgCGFs6DsBW3DPafmU3OYj7eIipUpB0CJJlVX7Pqs6sIew",
                    "isFavorite": False,
                    "isCompleted": False
                },
                {
                    "id": "2",
                    "title": "Digital Minimalism",
                    "author": "Cal Newport",
                    "category": "Productivity",
                    "progress": 82,
                    "timeLeft": "12 mins left",
                    "coverUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDdRU66OHe2osyA2x7djnet3K3fPhTAelq3mn7608YnEPvS7dQ4-8PgV4ZJKb0eGrczK3-wf5l7wUJTMjbeWQkBc5ZP0At1Npy_XtwLUSm4m0or3K6tTr6zR9J8zQm23bLEoDX-FBREIBrSAHYxUSkV7hnL-h10R-ocPmbMKoXV1E_i-otyLPJlOH_xnAMPPmLyHuqTU9GRYnPU8BnrshKlreqXHR2OSRFxuulotmgySNuCKZv45cGQjAsrTgASTvhTCo_FvPSP-Ew",
                    "isFavorite": True,
                    "isCompleted": False
                }
            ],
            "stats": {
                "pagesRead": 1482,
                "booksFinished": 24,
                "streak": 12,
                "monthlyGoalProgress": 75
            }
        }
        with open(DATA_FILE, "w") as f:
            json.dump(initial_data, f)
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

# --- Endpoints ---

@app.get("/api/books", response_model=List[Book])
async def get_books():
    data = load_data()
    return data["books"]

@app.get("/api/stats", response_model=UserStats)
async def get_stats():
    data = load_data()
    return data["stats"]

@app.post("/api/chat")
async def ai_chat(message: dict):
    # Mock AI logic
    msg = message.get("text", "").lower()
    if "hello" in msg:
        response = "Hello! I am your Readify AI assistant. How can I help you explore your library today?"
    elif "resilience" in msg:
        response = "Based on 'The Art of Resilience', Marcus Aurelius emphasizes that our power lies in our perception. Would you like a deep-dive summary?"
    else:
        response = f"That's a fascinating thought about '{msg}'. Let me analyze your library to find connections..."
    
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
