from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    identifier: str
    password: str

class LoginResponse(BaseModel):
    username: str
