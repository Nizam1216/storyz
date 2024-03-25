import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://storyzserver-l5ct.vercel.app/api/auth/register",
        formData
      );
      console.log(response.data);
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/login");
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
      <form className="container  mt-5 pt-5" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput1"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput1">Name</label>
        </div>

        <div className="form-floating my-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput5"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput5">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword1"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword1">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary my-3" type="submit">
          Sign up
        </button>
        <h3>
          already have an account? <Link to="/login">sign in</Link>
        </h3>
      </form>
    </>
  );
};

export default Register;
