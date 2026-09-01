import type { User } from "../types";

type Props = {
  user: User;
  onLogout: () => void;
};

function StudentDashboard({ user, onLogout }: Props) {
  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user.name}</p>
        </div>

        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="card">
        <h2>Student Modules</h2>
        <ul>
          <li>View profile</li>
          <li>Check fees</li>
          <li>Check attendance</li>
          <li>Check results</li>
        </ul>
      </div>
    </main>
  );
}

export default StudentDashboard;