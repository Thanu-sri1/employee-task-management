const BASE_URL = "http://127.0.0.1:8000";

// ✅ EMPLOYEES
export async function getEmployees() {
  const res = await fetch(`${BASE_URL}/employees/`);
  return res.json();
}

export async function addEmployee(payload) {
  const res = await fetch(`${BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ✅ TASKS
export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks/`);
  return res.json();
}

export async function addTask(payload) {
  const res = await fetch(`${BASE_URL}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateTaskStatus(taskId, status) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

// ✅ ISSUES
export async function getIssues() {
  const res = await fetch(`${BASE_URL}/issues/`);
  return res.json();
}

export async function addIssue(payload) {
  const res = await fetch(`${BASE_URL}/issues/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateIssueStatus(issueId, status) {
  const res = await fetch(`${BASE_URL}/issues/${issueId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
