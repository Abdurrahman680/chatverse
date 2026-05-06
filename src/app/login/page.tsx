"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bot, Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card neon-border">
        <div className="auth-header">
          <Bot size={40} className="neon-text" />
          <h1 className="neon-text">ChatVerse</h1>
          <p>Access the AI Dimension</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="input-group">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          New to the verse? <Link href="/register" className="neon-text">Join now</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #111 0%, #050505 100%);
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          background: var(--surface-color);
          border-radius: 20px;
          text-align: center;
        }
        .auth-header h1 { margin: 1rem 0 0.25rem; font-size: 1.75rem; }
        .auth-header p { color: var(--text-secondary); margin-bottom: 2rem; }
        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .input-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .input-group input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          flex: 1;
        }
        .auth-btn {
          padding: 0.75rem;
          background: var(--accent-lime);
          color: #000;
          font-weight: 600;
          border-radius: 10px;
          margin-top: 0.5rem;
          display: flex;
          justify-content: center;
        }
        .error-msg {
          color: #ef4444;
          font-size: 0.9rem;
          background: rgba(239, 68, 68, 0.1);
          padding: 0.5rem;
          border-radius: 6px;
        }
        .auth-footer { margin-top: 1.5rem; color: var(--text-secondary); font-size: 0.9rem; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
