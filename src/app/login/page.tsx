"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import "./login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/dash");
    } catch (error: any) {
      setError(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="image-section">
          <img src="assets/svg/undraw.svg" alt="Login Illustration" />
        </div>
        <div className="form-section">
          <h1>Login</h1>
          <form id="login" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>

            {/* Link to Register Page */}
            <p className="register-link">
              Don't have an account?
              <a
                href="/register"
                className="register-link-text text-sky-500 mx-1"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
