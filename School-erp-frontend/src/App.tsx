import { useEffect, useState } from "react";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import type { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  function handleLogin(token: string, loggedInUser: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {user.role === "admin" && (
        <AdminDashboard user={user} onLogout={logout} />
      )}

      {user.role === "teacher" && (
        <TeacherDashboard user={user} onLogout={logout} />
      )}

      {user.role === "student" && (
        <StudentDashboard user={user} onLogout={logout} />
      )}
    </>
  );
}

export default App;