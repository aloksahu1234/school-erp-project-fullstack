import { useEffect, useState } from "react";
import api from "../services/api";
import type { Fee } from "../types";

function FeeList() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadFees() {
    setLoading(true);
    setMessage("");

    try {
      const response = await api.get<Fee[]>("/fees");
      setFees(response.data);
    } catch (error: any) {
      console.error("Fees load error:", error);
      setMessage(
        error.response?.data?.msg ||
          error.message ||
          "Fees load failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function markAsPaid(feeId: string) {
    try {
      await api.put(`/fees/${feeId}/pay`);
      await loadFees();
    } catch (error: any) {
      setMessage(
        error.response?.data?.msg ||
          error.message ||
          "Payment update failed"
      );
    }
  }

  async function markAsDue(feeId: string) {
    try {
      await api.put(`/fees/${feeId}/due`);
      await loadFees();
    } catch (error: any) {
      setMessage(
        error.response?.data?.msg ||
          error.message ||
          "Due status update failed"
      );
    }
  }

  useEffect(() => {
    loadFees();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2>Fees</h2>
        <p>Loading fees...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Fees</h2>

      {message && <p className="error">{message}</p>}

      {fees.length === 0 ? (
        <p>No fees found.</p>
      ) : (
        fees.map((fee) => {
          const studentName =
            typeof fee.student === "string"
              ? fee.student
              : fee.student.name;

          return (
            <div className="fee" key={fee._id}>
              <p>
                <strong>Student:</strong> {studentName}
              </p>

              <p>
                <strong>Type:</strong> {fee.feeType}
              </p>

              <p>
                <strong>Amount:</strong> ₹{fee.amount}
              </p>

              <p>
                <strong>Due Date:</strong> {fee.dueDate}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`badge ${fee.status}`}>
                  {fee.status.toUpperCase()}
                </span>
              </p>

              {fee.status === "pending" && (
                <>
                  <button onClick={() => markAsPaid(fee._id)}>
                    Mark Paid
                  </button>

                  <button
                    onClick={() => markAsDue(fee._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Mark Due
                  </button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default FeeList;