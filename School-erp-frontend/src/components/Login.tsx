import { useState } from "react";
import api from "../services/api";
import type { User } from "../types";

type LoginProps = {
  onLogin: (token: string, user: User) => void;
};

type LoginResponse = {
  token: string;
  user: User;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onLogin(response.data.token, response.data.user);
    } catch (error: any) {
      setMessage(
        error.response?.data?.msg || "Login failed"
      );
    }
  }

  return (
    <div className="card">
      <h2>School ERP Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="error">{message}</p>}
    </div>
  );
}

export default Login;