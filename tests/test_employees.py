from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_create_employee():
    random_email = f"abhi_{uuid.uuid4().hex[:6]}@test.com"

    res = client.post("/employees/", json={
        "name": "Abhi",
        "email": random_email,
        "role": "Developer"
    })

    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Abhi"
    assert data["email"] == random_email



