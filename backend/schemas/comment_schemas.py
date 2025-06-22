from pydantic import BaseModel
from typing import List
from datetime import datetime

class CommentCreate(BaseModel):
    user_id: int
    post_id: int
    content: str

class CommentResponse(BaseModel):
    id: int
    author: str
    content: str
    likes: int
    timestamp: datetime
    replies: List[str] = []

    class Config:
        orm_mode = True
