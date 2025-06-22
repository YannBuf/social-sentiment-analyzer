from pydantic import BaseModel

class ReplyCreate(BaseModel):
    user_id: int
    comment_id: int
    content: str
