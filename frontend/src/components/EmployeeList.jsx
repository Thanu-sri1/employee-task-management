export default function EmployeeList({ employees }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <ul>
          {employees.map((e) => (
            <li key={e.id}>
              <b>{e.name}</b> ({e.role}) - {e.email} | ID: {e.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

