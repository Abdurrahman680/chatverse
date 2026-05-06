"use client";

import Link from "next/link";
import { Bot, Github, ChevronDown, Zap, Shield, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <header className="navbar">
        <div className="logo">
          <Bot size={28} className="neon-text" strokeWidth={2} />
          <span className="neon-text">ChatVerse</span>
        </div>
        <div className="nav-links">
          <Link href="/login" className="login-link">Sign In</Link>
          <Link href="/register" className="register-btn">Get Started</Link>
        </div>
      </header>

      <main className="hero">
        <div className="hero-content">
          <div className="badge">
            NEXT GENERATION AI
          </div>
          <h1 className="hero-title">
            Enter the <span className="neon-text">ChatVerse</span>
          </h1>
          <p className="hero-subtitle">
            Experience the future of conversation. Powered by Gemini AI, 
            wrapped in a cyberpunk reality. Fast, secure, and infinitely intelligent.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="cta-primary">
              Initiate Connection
            </Link>
            <a href="https://github.com" target="_blank" className="cta-secondary">
              <Github size={20} />
              View Source
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow-circle"></div>
          <div className="floating-bot">
            <Bot size={120} className="neon-text" />
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown className="neon-text" size={32} />
        </div>
      </main>

      <section className="features">
        <div className="feature-card">
          <Zap className="neon-text" size={40} />
          <h3>Hyper-Fast</h3>
          <p>Real-time responses powered by GLM-4.5 Air for instant, fluid interactions.</p>
        </div>
        <div className="feature-card">
          <Shield className="neon-text" size={40} />
          <h3>Secure Neural Link</h3>
          <p>Your data is protected by state-of-the-art encryption and privacy protocols.</p>
        </div>
        <div className="feature-card">
          <Sparkles className="neon-text" size={40} />
          <h3>Infinite Intelligence</h3>
          <p>Harness the power of next-gen AI to solve complex problems and create content.</p>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');

        .landing-container {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 6rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 1.8rem;
          letter-spacing: -0.5px;
        }

        .neon-text {
          color: #C0FF33;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .login-link {
          font-weight: 500;
          color: #ffffff;
          font-size: 1.1rem;
        }

        .register-btn {
          padding: 0.5rem 1.25rem;
          border: 1px solid #C0FF33;
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6rem 6rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1;
        }

        .badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: #1a1a1a;
          color: #C0FF33;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 2.5rem;
        }

        .hero-title {
          font-size: 6rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 2rem;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: #888;
          line-height: 1.5;
          margin-bottom: 4rem;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .cta-primary {
          padding: 0.75rem 1.5rem;
          border: 1px solid #C0FF33;
          color: #ffffff;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .cta-secondary {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: #ffffff;
          font-size: 1.1rem;
        }

        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .glow-effect {
          position: absolute;
          width: 500px;
          height: 500px;
          background: #C0FF33;
          filter: blur(180px);
          opacity: 0.1;
        }

        .floating-bot {
          position: relative;
          z-index: 1;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          cursor: pointer;
          z-index: 10;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          padding: 8rem 6rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .feature-card {
          padding: 3rem;
          background: #0a0a0a;
          border: 1px solid rgba(192, 255, 51, 0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: #C0FF33;
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(192, 255, 51, 0.1);
        }

        .feature-card h3 {
          font-size: 1.8rem;
          margin: 1.5rem 0 1rem;
          font-weight: 700;
        }

        .feature-card p {
          color: #888;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        @media (max-width: 1200px) {
          .hero-title { font-size: 4.5rem; }
          .navbar, .hero, .features { padding: 2rem 3rem; }
          .scroll-indicator { display: none; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 1.5rem 2rem; }
          .nav-links { gap: 1.5rem; }
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 4rem 2rem;
            gap: 2rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-title { 
            font-size: 3.5rem; 
            margin-bottom: 1.5rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 1.5rem;
          }
          .cta-primary, .cta-secondary {
            width: 100%;
            justify-content: center;
          }
          .hero-visual {
            order: -1;
            margin-bottom: 2rem;
          }
          .features {
            padding: 4rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.8rem; }
          .logo span { display: none; } /* Hide text on very small screens to save space */
          .badge { font-size: 0.7rem; }
          .feature-card { padding: 2rem; }
        }
      `}</style>
    </div>
  );
}
