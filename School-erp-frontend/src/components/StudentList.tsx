import { useEffect, useState } from "react";
import api from "../services/api";
import type { Student } from "../types";

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [message, setMessage] = useState("Loading...");

  async function loadStudents() {
    try {
      const response = await api.get<Student[]>("/students");
      setStudents(response.data);
      setMessage("");
    } catch (error: any) {
      setMessage(
        error.response?.data?.msg || "Students load failed"
      );
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>

      {message && <p>{message}</p>}

      {students.map((student) => (
        <div className="student" key={student._id}>
          <h3>{student.name}</h3>
          <p>Roll No: {student.rollNo}</p>
          <p>
            Class: {student.class} | Section: {student.section}
          </p>
          <p>Guardian: {student.guardianName}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentList;