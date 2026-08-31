import { useState } from "react";
import api from "../services/api";

type AddStudentProps = {
  onStudentAdded: () => void;
};

function AddStudent({ onStudentAdded }: AddStudentProps) {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    class: "",
    section: "",
    guardianName: "",
    guardianPhone: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      await api.post("/students", form);

      setMessage("Student added successfully");

      setForm({
        name: "",
        rollNo: "",
        class: "",
        section: "",
        guardianName: "",
        guardianPhone: "",
      });

      onStudentAdded();
    } catch (error: any) {
      setMessage(
        error.response?.data?.msg || "Student add failed"
      );
    }
  }

  return (
    <div className="card">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Student name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="rollNo"
          placeholder="Roll number"
          value={form.rollNo}
          onChange={handleChange}
          required
        />

        <input
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
          required
        />

        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
          required
        />

        <input
          name="guardianName"
          placeholder="Guardian name"
          value={form.guardianName}
          onChange={handleChange}
          required
        />

        <input
          name="guardianPhone"
          placeholder="Guardian phone"
          value={form.guardianPhone}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStudent;