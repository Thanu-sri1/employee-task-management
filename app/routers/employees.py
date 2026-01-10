from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..deps import get_db
from .. import schemas, crud

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", response_model=schemas.EmployeeOut)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_employee(db, emp)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[schemas.EmployeeOut])
def list_employees(db: Session = Depends(get_db)):
    return crud.list_employees(db)

