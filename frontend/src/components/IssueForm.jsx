import { useState } from "react";
import { addIssue } from "../api/api";

export default function IssueForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("LOW");
  const [employeeId, setEmployeeId] = useState("");
  const [taskId, setTaskId] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await addIssue({
      title,
      description,
      severity,
      employee_id: Number(employeeId),
      task_id: taskId ? Number(taskId) : null,
    });

    setTitle("");
    setDescription("");
    setSeverity("LOW");
    setEmployeeId("");
    setTaskId("");

    onAdded();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <h2>Add Issue</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <br /><br />

        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Task ID (optional)"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
}
