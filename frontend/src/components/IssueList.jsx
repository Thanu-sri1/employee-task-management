import { updateIssueStatus } from "../api/api";

export default function IssueList({ issues, onUpdated }) {
  const changeStatus = async (id, status) => {
    await updateIssueStatus(id, status);
    onUpdated();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <h2>Issues</h2>

      {issues.length === 0 ? (
        <p>No issues found</p>
      ) : (
        <ul>
          {issues.map((i) => (
            <li key={i.id} style={{ marginBottom: 12 }}>
              <b>{i.title}</b> | Severity: <b>{i.severity}</b> | Status:{" "}
              <b>{i.status}</b>
              <br />
              Employee ID: {i.employee_id} | Task ID: {i.task_id ?? "None"} | Issue
              ID: {i.id}
              <br />
              <button onClick={() => changeStatus(i.id, "OPEN")}>OPEN</button>{" "}
              <button onClick={() => changeStatus(i.id, "RESOLVED")}>
                RESOLVED
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
