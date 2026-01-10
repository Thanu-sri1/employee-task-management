from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    role = Column(String(50), default="Employee")

    tasks = relationship("Task", back_populates="employee", cascade="all, delete")
    issues = relationship("Issue", back_populates="employee", cascade="all, delete")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, default="")
    status = Column(String(30), default="TODO")  # TODO | IN_PROGRESS | DONE
    created_at = Column(DateTime, default=datetime.utcnow)

    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    employee = relationship("Employee", back_populates="tasks")

    issues = relationship("Issue", back_populates="task", cascade="all, delete")


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, default="")
    severity = Column(String(20), default="LOW")  # LOW | MEDIUM | HIGH
    status = Column(String(30), default="OPEN")  # OPEN | RESOLVED
    created_at = Column(DateTime, default=datetime.utcnow)

    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)

    employee = relationship("Employee", back_populates="issues")
    task = relationship("Task", back_populates="issues")
