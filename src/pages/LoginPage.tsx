import { useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import "./login.css";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  // ✅ ADD THESE STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // 🔴 IMPORTANT
      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ✅ SUCCESS
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="bgOverlay" />

      <motion.div
        className="left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="card">

          <h1 className="logo">COGNIFLIX</h1>
          <p className="subtitle">
            Context-Aware Streaming Experience
          </p>

          {/* EMAIL */}
          <div className="inputBox">
            <Mail size={18} />
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="inputBox">
            <Lock size={18} />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye
              size={18}
              className="eye"
              onClick={() => setShow(!show)}
            />
          </div>

          <div className="row">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>
            <span className="link">Forgot Password?</span>
          </div>

          {/* 🔴 BUTTON FIX */}
          <motion.button
            className="loginBtn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* 🔴 ERROR MESSAGE (NO DESIGN CHANGE) */}
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <div className="divider">OR</div>

          <button className="oauthBtn">Continue with Google</button>
          <button className="oauthBtn">Continue with GitHub</button>

          <p className="signup">
            New to Cogniflix? <span>Sign Up</span>
          </p>

        </div>
      </motion.div>

      <motion.div
        className="right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Why Cogniflix?</h2>
        <p className="rightSub">
          Experience streaming like never before
        </p>

        <div className="feature">
          <h4>Emotion-Based Recommendations</h4>
          <p>AI-powered content suggestions based on your mood</p>
        </div>

        <div className="feature">
          <h4>Regional Personalization</h4>
          <p>Content tailored to your culture & language</p>
        </div>

        <div className="feature">
          <h4>Time-Aware Content Ranking</h4>
          <p>Smart suggestions that adapt to time patterns</p>
        </div>
      </motion.div>
    </div>
  );
}