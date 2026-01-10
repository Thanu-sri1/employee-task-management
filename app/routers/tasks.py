from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..deps import get_db
from .. import schemas, crud

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/", response_model=schemas.TaskOut)
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_task(db, task)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/", response_model=list[schemas.TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    return crud.list_tasks(db)


@router.patch("/{task_id}/status", response_model=schemas.TaskOut)
def update_status(task_id: int, body: schemas.TaskUpdateStatus, db: Session = Depends(get_db)):
    allowed = ["TODO", "IN_PROGRESS", "DONE"]
    if body.status not in allowed:
        raise HTTPException(status_code=400, detail=f"Status must be one of {allowed}")

    try:
        return crud.update_task_status(db, task_id, body.status)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
