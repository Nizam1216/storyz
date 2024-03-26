import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { Toast } from "primereact/toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      localStorage.setItem("authToken", response.data.authToken);
      localStorage.setItem("email", response.data.email);
      navigate("/dashboard");

      // Show success toast for login
      showToast("success", "Success", "Login successful");
    } catch (error) {
      console.log(error);
      // Show error toast for incorrect details
      showToast("error", "Error", "Incorrect email or password");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to show the toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  return (
    <>
      <Navbar />
      <form className="container mt-5 pt-5" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "poppins" }}>
          Please sign in
        </h1>
        <div className="form-floating my-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary my-3"
          type="submit"
          style={{ fontFamily: "poppins" }}
        >
          Sign in
        </button>
        <h3 style={{ fontFamily: "poppins" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ fontFamily: "poppins" }}>
            sign up
          </Link>
        </h3>
      </form>

      {/* PrimeReact Toast component */}
      <Toast ref={toast} />
    </>
  );
};

export default Login;
