from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 允许所有前端访问（开发阶段用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    keyword: str

@app.post("/analyze")
async def analyze_sentiment(data: AnalyzeRequest):
    return {
        "keyword": data.keyword,
        "sentiment": "neutral",
        "summary": "This is a mock analysis result."
    }
