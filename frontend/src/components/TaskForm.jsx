import { useState } from "react";
import { addTask } from "../api/api";

export default function TaskForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await addTask({
      title,
      description,
      employee_id: Number(employeeId),
    });

    setTitle("");
    setDescription("");
    setEmployeeId("");
    onAdded();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <h2>Add Task</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

