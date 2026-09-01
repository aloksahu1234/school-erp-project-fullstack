import AddStudent from "./AddStudent";
import AddFee from "./AddFee";
import StudentList from "./StudentList";
import FeeList from "./FeeList";
import type { User } from "../types";

type Props = {
  user: User;
  onLogout: () => void;
};

function AdminDashboard({ user, onLogout }: Props) {
  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user.name}</p>
        </div>

        <button onClick={onLogout}>Logout</button>
      </header>

      <AddStudent onStudentAdded={() => window.location.reload()} />
      <AddFee onFeeAdded={() => window.location.reload()} />
      <StudentList />
      <FeeList />
    </main>
  );
}

export default AdminDashboard;