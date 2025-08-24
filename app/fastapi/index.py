from fastapi import FastAPI
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
from collections import defaultdict
import os
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
    "http://localhost:8000"
]

app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze(comment: Comment):
    client = HumeStreamClient(os.getenv("HUME_API_KEY"))
    config = LanguageConfig()
    result = []

    aggregated_score = defaultdict(float)
    count_per_emotion = defaultdict(int)
    comment_with_emotions = []

    async with client.connect([config]) as socket:
        for comment in comment.comment_data:
            result = await socket.send_text(comment)
            emotions = result["language"]["predictions"][0]["emotions"]
            comment_with_emotions.append([comment, emotions])

            for emotion in emotions:
                aggregated_score[emotion['name']] += emotion['score']
                count_per_emotion[emotion['name']] += 1

            averaged_emotions = {emotion: aggregated_score[emotion] / count_per_emotion[emotion] for emotion in aggregated_score}

            # Rank emotions by score
            ranked_emotions = sorted(averaged_emotions.items(), key=lambda x: x[1], reverse=True)

            # Round scores to two decimal places
            rounded_emotions = [(emotion, round(score, 2)) for emotion, score in ranked_emotions]
            
        emotion_dict = {}
        for emotion, score in rounded_emotions[:6]:
            if emotion not in emotion_dict or score > emotion_dict[emotion]:
                emotion_dict[emotion] = score

        result = [[emotion, score] for emotion, score in emotion_dict.items()]
        for emotion in comment_with_emotions:
            title, properties = emotion
            properties.sort(key=lambda x: x["score"], reverse=True)
            emotion[1] = properties[:6]
        return {"Result": result, "comment_with_emotions": comment_with_emotions}