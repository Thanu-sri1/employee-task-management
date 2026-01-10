import { useState } from "react";
import { addEmployee } from "../api/api";

export default function EmployeeForm({ onAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await addEmployee({ name, email, role });
    onAdded(data);

    setName("");
    setEmail("");
    setRole("Employee");
  };

  return (
    <div style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
