import { useState } from "react";
import axios from "axios";
import "../css/login.css";
import {  useNavigate } from 'react-router-dom';
import ShopNav from "./ShopnowNav";
import { Link } from "react-router-dom"; 
import Footer from "./Footer";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/login", {phone , password });
      console.log(res)
      if (res.data.token) {
      navigate("/shop");
      sessionStorage.setItem("token", res.data.token);
      setSuccess("Login successful! Redirecting...");
      }
    } catch (err) {
      console.log(err)
      setError(err.res?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div>
      <ShopNav />
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p>Enter your contact number to login.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="phone-input">
              <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pass" />
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button className="next" type="submit">Next</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p className="signup-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
