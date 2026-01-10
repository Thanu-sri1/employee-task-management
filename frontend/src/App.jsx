import { useEffect, useMemo, useState } from "react";
import { getEmployees, getTasks, getIssues } from "./api/api";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import IssueForm from "./components/IssueForm";
import IssueList from "./components/IssueList";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setEmployees(await getEmployees());
      setTasks(await getTasks());
      setIssues(await getIssues());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Summary counts
  const summary = useMemo(() => {
    const doneTasks = tasks.filter((t) => t.status === "DONE").length;
    const openIssues = issues.filter((i) => i.status === "OPEN").length;

    return {
      employees: employees.length,
      tasks: tasks.length,
      doneTasks,
      issues: issues.length,
      openIssues,
    };
  }, [employees, tasks, issues]);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "system-ui, Arial",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* ✅ HEADER */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          border: "1px solid #ddd",
          marginBottom: 18,
        }}
      >
        <h1 style={{ margin: 0 }}>Employee Task & Issue Management ✅</h1>

        <p style={{ margin: "6px 0 0 0", color: "#555" }}>
          Manage employees, assign tasks, and track issues in one dashboard.
        </p>

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <button onClick={load} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>

          <button onClick={() => setShowEmployees((p) => !p)}>
            {showEmployees ? "Hide Employees" : "View Employees"}
          </button>


          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 8,
              textDecoration: "none",
              color: "black",
            }}
          >
            Open Swagger
          </a>
        </div>
      </div>

      {/* ✅ SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(3, 1fr)",
          marginBottom: 20,
        }}
      >
        <SummaryCard title="Employees" value={summary.employees} note="Total employees" />
        <SummaryCard
          title="Tasks"
          value={`${summary.tasks}`}
          note={`Done: ${summary.doneTasks}`}
        />
        <SummaryCard
          title="Issues"
          value={`${summary.issues}`}
          note={`Open: ${summary.openIssues}`}
        />
      </div>

      {/* ✅ MAIN GRID */}
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <EmployeeForm onAdded={load} />
        {showEmployees ? (
          <EmployeeList employees={employees} />
        ) : (
          <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 12 }}>
            <h2>Employees</h2>
            <p>Click “View Employees” to see the list.</p>
          </div>
        )}



        <TaskForm onAdded={load} />
        <TaskList tasks={tasks} onUpdated={load} />

        <IssueForm onAdded={load} />
        <IssueList issues={issues} onUpdated={load} />
      </div>

      {/* ✅ FOOTER */}
      <p style={{ marginTop: 30, color: "#777", fontSize: 12 }}>
        Built with React + FastAPI • Local URLs: Frontend(5173) Backend(8000)
      </p>
    </div>
  );
}

// ✅ Small reusable summary card component
function SummaryCard({ title, value, note }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 13, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{note}</div>
    </div>
  );
}
