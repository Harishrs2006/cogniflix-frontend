import { useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./login.css";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    await loginUser(email, password);

    // cookie is already set by backend
    navigate("/dashboard");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <div className="bgOverlay" />

      <motion.div className="left">
        <div className="card">
          <h1 className="logo">COGNIFLIX</h1>
          <p className="subtitle">Context-Aware Streaming Experience</p>

          <div className="inputBox">
            <Mail size={18} />
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputBox">
            <Lock size={18} />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye className="eye" onClick={() => setShow(!show)} />
          </div>

          <div className="row">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <span
              className="link"
              onClick={() => alert("Feature not implemented")}
            >
              Forgot Password?
            </span>
          </div>

          <motion.button
            className="loginBtn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}

          <div className="divider">OR</div>

          <button className="oauthBtn">Continue with Google</button>
          <button className="oauthBtn">Continue with GitHub</button>

          <p className="signup">
            New to Cogniflix?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </motion.div>

      <motion.div className="right">
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