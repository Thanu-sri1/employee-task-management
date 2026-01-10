from sqlalchemy.orm import Session
from . import models, schemas


# ---------- EMPLOYEE ----------
def create_employee(db: Session, emp: schemas.EmployeeCreate):
    employee = models.Employee(name=emp.name, email=emp.email, role=emp.role)
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def list_employees(db: Session):
    return db.query(models.Employee).all()


# ---------- TASK ----------
def create_task(db: Session, task: schemas.TaskCreate):
    employee = db.query(models.Employee).filter(models.Employee.id == task.employee_id).first()
    if not employee:
        raise ValueError("Employee not found")

    new_task = models.Task(
        title=task.title,
        description=task.description,
        employee_id=task.employee_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


def list_tasks(db: Session):
    return db.query(models.Task).all()


def update_task_status(db: Session, task_id: int, status: str):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise ValueError("Task not found")
    task.status = status
    db.commit()
    db.refresh(task)
    return task


# ---------- ISSUE ----------
def create_issue(db: Session, issue: schemas.IssueCreate):
    employee = db.query(models.Employee).filter(models.Employee.id == issue.employee_id).first()
    if not employee:
        raise ValueError("Employee not found")

    new_issue = models.Issue(
        title=issue.title,
        description=issue.description,
        severity=issue.severity,
        employee_id=issue.employee_id,
        task_id=issue.task_id
    )
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)
    return new_issue


def list_issues(db: Session):
    return db.query(models.Issue).all()


def update_issue_status(db: Session, issue_id: int, status: str):
    issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if not issue:
        raise ValueError("Issue not found")
    issue.status = status
    db.commit()
    db.refresh(issue)
    return issue
