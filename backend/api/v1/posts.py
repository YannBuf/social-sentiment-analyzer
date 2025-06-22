from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import post_model, user_model
from schemas import post_schemas
from datetime import datetime
from typing import List, Optional

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/posts", response_model=post_schemas.PostResponse)
def create_post(post: post_schemas.PostCreate, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter_by(id=post.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_post = post_model.Post(user_id=post.user_id, content=post.content, category=post.category, created_at=datetime.utcnow())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return post_schemas.PostResponse(
        id=new_post.id,
        author=user.username,
        content=new_post.content,
        category=new_post.category,
        timestamp=new_post.created_at
    )

@router.get("/posts", response_model=List[post_schemas.PostResponse])
def get_posts(category: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(post_model.Post).join(user_model.User)
    if category and category != "All":
        query = query.filter(post_model.Post.category == category)
    if search:
        query = query.filter(post_model.Post.content.contains(search))
    posts = query.order_by(post_model.Post.created_at.desc()).all()
    return [
        post_schemas.PostResponse(
            id=post.id,
            author=post.author.username,
            content=post.content,
            category=post.category,
            timestamp=post.created_at
        )
        for post in posts
    ]