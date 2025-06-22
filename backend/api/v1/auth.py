from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from db.database import SessionLocal
from db.models import user_model
from schemas import user_schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login", response_model=user_schemas.LoginResponse)
def login(data: user_schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(
        (user_model.User.username == data.identifier) |
        (user_model.User.email == data.identifier) |
        (user_model.User.phone == data.identifier)
    ).first()

    if not user or not bcrypt.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"username": user.username}
