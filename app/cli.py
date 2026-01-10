import requests

BASE_URL = "http://127.0.0.1:8000"

def menu():
    print("\n===== CLI MENU =====")
    print("1. Add Employee")
    print("2. List Employees")
    print("3. Add Task")
    print("4. List Tasks")
    print("5. Add Issue")
    print("6. List Issues")
    print("0. Exit")

while True:
    menu()
    ch = input("Enter choice: ")

    if ch == "1":
        name = input("Name: ")
        email = input("Email: ")
        role = input("Role: ")
        res = requests.post(f"{BASE_URL}/employees/", json={"name": name, "email": email, "role": role})
        print(res.json())

    elif ch == "2":
        res = requests.get(f"{BASE_URL}/employees/")
        print(res.json())

    elif ch == "3":
        title = input("Task Title: ")
        desc = input("Desc: ")
        emp_id = int(input("Employee ID: "))
        res = requests.post(f"{BASE_URL}/tasks/", json={"title": title, "description": desc, "employee_id": emp_id})
        print(res.json())

    elif ch == "4":
        res = requests.get(f"{BASE_URL}/tasks/")
        print(res.json())

    elif ch == "5":
        title = input("Issue title: ")
        desc = input("Desc: ")
        severity = input("Severity(LOW/MEDIUM/HIGH): ")
        emp_id = int(input("Employee ID: "))
        res = requests.post(f"{BASE_URL}/issues/", json={
            "title": title, "description": desc,
            "severity": severity, "employee_id": emp_id
        })
        print(res.json())

    elif ch == "6":
        res = requests.get(f"{BASE_URL}/issues/")
        print(res.json())

    elif ch == "0":
        break
    else:
        print("Invalid option")
