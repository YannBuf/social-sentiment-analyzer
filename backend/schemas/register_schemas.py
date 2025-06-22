from pydantic import BaseModel
from pydantic import EmailStr
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    phone: str
    password: str
