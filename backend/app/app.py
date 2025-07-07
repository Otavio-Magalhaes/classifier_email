from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import email_routes

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://email-classifier-acsz.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(email_routes.router, prefix="/api/v1")
