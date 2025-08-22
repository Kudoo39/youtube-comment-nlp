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
    print("Received comment data:", comment.comment_data)}