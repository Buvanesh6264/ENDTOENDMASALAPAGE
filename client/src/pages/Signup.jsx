import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../css/signup.css";
import ShopNav from "./ShopnowNav";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const validateInputs = () => {
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInputs()) return;

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        phone,
        password,
      });

      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div>
      <ShopNav />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <p>Create your account</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
