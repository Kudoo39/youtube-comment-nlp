from fastapi import FastAPI
from collections import defaultdict
import os, requests
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

class Comment(BaseModel):
    comment_data: List[str]

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
     "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "j-hartmann/emotion-english-distilroberta-base")
HF_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
HF_HEADERS = {"Authorization": f"Bearer {HF_API_TOKEN}"}


def hf_infer(text: str):
    resp = requests.post(HF_URL, headers=HF_HEADERS, json={"inputs": text}, timeout=30)
    resp.raise_for_status()
    data = resp.json()

    # Normalize output: [[{...}]] or [{...}]
    if isinstance(data, list) and len(data) and isinstance(data[0], list):
        return data[0]
    return data


@app.post("/api/analyze")
async def analyze(payload: Comment):
    aggregated_score = defaultdict(float)
    count_per_emotion = defaultdict(int)
    comment_with_emotions = []

    for text in payload.comment_data:
        emotions = hf_infer(text)
        # sort by score
        emotions_sorted = sorted(emotions, key=lambda x: x["score"], reverse=True)
        comment_with_emotions.append([text, emotions_sorted[:5]])

        for emo in emotions:
            aggregated_score[emo["label"]] += emo["score"]
            count_per_emotion[emo["label"]] += 1

    if not aggregated_score:
        return {"Result": [], "comment_with_emotions": comment_with_emotions}

    # Average score per emotion
    averaged_emotions = {
        label: aggregated_score[label] / count_per_emotion[label]
        for label in aggregated_score
    }

    # Rank and round
    ranked_emotions = sorted(averaged_emotions.items(), key=lambda x: x[1], reverse=True)
    rounded_emotions = [(label, round(score, 2)) for label, score in ranked_emotions]

    # Top 5 results
    result = rounded_emotions[:5]

    return {"Result": result, "comment_with_emotions": comment_with_emotions}
