from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import chat_with_chatgpt
from api.v1 import reddit_search
from api.v1 import auth
from api.v1 import register
from api.v1 import post



# Initial App
app = FastAPI()

# Allow all front end access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4.Router
app.include_router(chat_with_chatgpt.router)
app.include_router(reddit_search.router)
app.include_router(auth.router)
app.include_router(register.router)
app.include_router(post.router)