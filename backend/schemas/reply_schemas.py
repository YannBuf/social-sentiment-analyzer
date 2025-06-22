from pydantic import BaseModel
from datetime import datetime

class ReplyCreate(BaseModel):
    user_id: int
    comment_id: int
    content: str

class ReplyResponse(BaseModel):
    id: int
    author: str
    content: str
    timestamp: datetime

    class Config:
        orm_mode = True