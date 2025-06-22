from pydantic import BaseModel
from datetime import datetime

class PostCreate(BaseModel):
    user_id: int
    content: str
    category: str

class PostResponse(BaseModel):
    id: int
    author: str
    content: str
    category: str
    timestamp: datetime

    class Config:
        orm_mode = True


