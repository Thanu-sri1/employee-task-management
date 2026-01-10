import { updateTaskStatus } from "../api/api";

export default function TaskList({ tasks, onUpdated }) {
  const changeStatus = async (taskId, status) => {
    await updateTaskStatus(taskId, status);
    onUpdated();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: 12 }}>
              <b>{t.title}</b> | <b>{t.status}</b>
              <br />
              Employee ID: {t.employee_id} | Task ID: {t.id}
              <br />
              <button onClick={() => changeStatus(t.id, "TODO")}>TODO</button>{" "}
              <button onClick={() => changeStatus(t.id, "IN_PROGRESS")}>
                IN_PROGRESS
              </button>{" "}
              <button onClick={() => changeStatus(t.id, "DONE")}>DONE</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
