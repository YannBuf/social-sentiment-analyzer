from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from db.models import user_model
from schemas import  register_schemas
from db.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(data: register_schemas.RegisterRequest, db: Session = Depends(get_db)):
    # 检查用户名、邮箱和手机号是否唯一
    if db.query(user_model.User).filter(user_model.User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(user_model.User).filter(user_model.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(user_model.User).filter(user_model.User.phone == data.phone).first():
        raise HTTPException(status_code=400, detail="Phone number already registered")

    # 哈希密码
    hashed_password = bcrypt.hash(data.password)

    # 创建新用户
    new_user = user_model.User(
        username=data.username,
        email=data.email,
        phone=data.phone,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}
