import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://url-shortning.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.data) {
        // User login successful
        // const token = response.data.token;
        // You can save the token in local storage or a state management library for later use
        // For example, you can use Redux or React Context to store the token globally

        // Show a success message using toastify
        toast.success("User Login Successfully!");

        // Redirect the user to a different page after successful login
        navigate("/dashboard");
      } else if (
        response.data &&
        response.data.message === "User not found!!!"
      ) {
        // User not found
        toast.error("User not found!");
      } else if (
        response.data &&
        response.data.message ===
          "Account is inactive. Please activate your account by clicking on the activation link sent to your email."
      ) {
        // Account is inactive
        toast.warning("Account is inactive. Please activate your account.");
      }
    } catch (err) {
      // Error occurred during login
      console.error("Error logging in:", err);
      toast.error("Internal server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* <span className="back-btn">
        <i class="fa-solid fa-arrow-left"></i>
      </span> */}
      <h1 className="title-login">LOGIN</h1>
      <form onSubmit={handleLoginForm} className="login-form-container">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <br />
        <Link to="/forgotpassword">
          <button type="button" className="submit-btn">
            ForgotPassword
          </button>
        </Link>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
