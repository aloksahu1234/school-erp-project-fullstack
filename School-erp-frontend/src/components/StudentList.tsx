import { useEffect, useState } from "react";
import api from "../services/api";
import type { Student } from "../types";

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadStudents() {
    setLoading(true);
    setMessage("");

    try {
      const response = await api.get<Student[]>("/students");
      setStudents(response.data);
    } catch (error: any) {
      setMessage(error.response?.data?.msg || "Students load failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2>Students</h2>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Students</h2>

      {message && <p className="error">{message}</p>}

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <div className="student" key={student._id}>
            <h3>{student.name}</h3>
            <p>Roll No: {student.rollNo}</p>
            <p>
              Class: {student.class} | Section: {student.section}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default StudentList;