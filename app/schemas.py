from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ---------------- EMPLOYEE ----------------
class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    role: str = "Employee"


class EmployeeOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


# ---------------- TASK ----------------
class TaskCreate(BaseModel):
    title: str
    description: str = ""
    employee_id: int


class TaskUpdateStatus(BaseModel):
    status: str  # TODO | IN_PROGRESS | DONE


class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    status: str
    created_at: datetime
    employee_id: int

    class Config:
        from_attributes = True


# ---------------- ISSUE ----------------
class IssueCreate(BaseModel):
    title: str
    description: str = ""
    severity: str = "LOW"
    employee_id: int
    task_id: Optional[int] = None


class IssueUpdateStatus(BaseModel):
    status: str  # OPEN | RESOLVED


class IssueOut(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    status: str
    created_at: datetime
    employee_id: int
    task_id: Optional[int]

    class Config:
        from_attributes = True
