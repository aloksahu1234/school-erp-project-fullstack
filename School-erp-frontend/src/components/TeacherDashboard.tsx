import type { User } from "../types";

type Props = {
  user: User;
  onLogout: () => void;
};

function TeacherDashboard({ user, onLogout }: Props) {
  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>Welcome, {user.name}</p>
        </div>

        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="card">
        <h2>Teacher Modules</h2>
        <ul>
          <li>View students</li>
          <li>Mark attendance</li>
          <li>View class information</li>
        </ul>
      </div>
    </main>
  );
}

export default TeacherDashboard;