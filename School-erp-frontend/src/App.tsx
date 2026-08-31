import { useState } from "react";
import Login from "./components/Login";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import type { User } from "./types";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function handleLogin(token: string, loggedInUser: User) {
    localStorage.setItem("token", token);
    setUser(loggedInUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) {
    return (
      <main className="container">
        <Login onLogin={handleLogin} />
      </main>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>School ERP</h1>
          <p>
            Welcome, {user.name} ({user.role})
          </p>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      {user.role === "admin" && (
        <AddStudent onStudentAdded={() => window.location.reload()} />
      )}

      <StudentList />
    </main>
  );
}

export default App;