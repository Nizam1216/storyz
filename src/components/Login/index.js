import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://storyzserver-l5ct.vercel.app/api/auth/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("authToken", response.data.authToken);
      alert("login Successfull");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <form className="container mt-5 pt-5" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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

        <button className="w-100 btn btn-lg btn-primary my-3" type="submit">
          Sign in
        </button>
        <h3>
          Don't have an account? <Link to="/">sign up</Link>
        </h3>
      </form>
    </>
  );
};

export default Login;
