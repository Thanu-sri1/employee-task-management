from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import employees, tasks, issues

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Task & Issue Management System")

# CORS (Frontend connect avvadaniki)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers include
app.include_router(employees.router)
app.include_router(tasks.router)
app.include_router(issues.router)

@app.get("/")
def root():
    return {"message": "Backend running successfully ✅"}
