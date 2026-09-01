import { useEffect, useState } from "react";
import api from "../services/api";
import type { Student } from "../types";

type Props = {
  onFeeAdded: () => void;
};

function AddFee({ onFeeAdded }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState("");
  const [feeType, setFeeType] = useState("tuition");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get<Student[]>("/students");
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadStudents();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post("/fees", {
        student,
        feeType,
        amount: Number(amount),
        dueDate,
      });

      setMessage("Fee created successfully");
      onFeeAdded();
    } catch (error: any) {
      setMessage(error.response?.data?.msg || "Fee create failed");
    }
  }

  return (
    <div className="card">
      <h2>Add Fee</h2>

      <form onSubmit={handleSubmit}>
        <select value={student} onChange={(e) => setStudent(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} - {s.rollNo}
            </option>
          ))}
        </select>

        <select value={feeType} onChange={(e) => setFeeType(e.target.value)}>
          <option value="tuition">Tuition</option>
          <option value="admission">Admission</option>
          <option value="transport">Transport</option>
          <option value="exam">Exam</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button type="submit">Create Fee</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddFee;