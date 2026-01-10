from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..deps import get_db
from .. import schemas, crud

router = APIRouter(prefix="/issues", tags=["Issues"])


@router.post("/", response_model=schemas.IssueOut)
def add_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_issue(db, issue)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/", response_model=list[schemas.IssueOut])
def list_issues(db: Session = Depends(get_db)):
    return crud.list_issues(db)


@router.patch("/{issue_id}/status", response_model=schemas.IssueOut)
def update_status(issue_id: int, body: schemas.IssueUpdateStatus, db: Session = Depends(get_db)):
    allowed = ["OPEN", "RESOLVED"]
    if body.status not in allowed:
        raise HTTPException(status_code=400, detail=f"Status must be one of {allowed}")

    try:
        return crud.update_issue_status(db, issue_id, body.status)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


