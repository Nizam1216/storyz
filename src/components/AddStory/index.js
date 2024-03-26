import React, { useState, useRef } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";

const AddStory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tag: "",
  });
  const toast = useRef(null); // Ref for toast

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://storyzserver.vercel.app/api/notes/addnote",
        formData,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      showToast("success", "Success", response.data.message);
      setFormData({ name: "", description: "", tag: "" });
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to Add Story");
    }
  };

  // Function to show the toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input field is the description textarea
    if (name === "description") {
      // Replace new lines with '\n' and preserve extra spaces
      const formattedValue = value.replace(/\n\s*\n/g, "\n\n");
      console.log(formattedValue); // Log formatted value
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <form className="container mt-5 pt-5" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "poppins" }}>
          Add New Story
        </h1>
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="name"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Titile Of The Story</label>
        </div>
        <div className="form-floating">
          <textarea
            type="text"
            className="form-control"
            id="floatingTextarea"
            name="description"
            placeholder="Write your story here..."
            value={formData.description} // Use value instead of defaultValue
            onChange={handleChange}
            style={{
              height: "auto",
              minHeight: "20rem",
              whiteSpace: "pre-wrap",
            }}
          />

          <label htmlFor="floatingTextarea">Story</label>
        </div>
        <div className="form-floating my-3">
          <select
            className="form-select"
            id="floatingGenre"
            name="tag" // Set name attribute to tag
            onChange={handleChange}
            value={formData.tag}
            defaultValue="General" // Set value to formData.tag
          >
            <option value="General">General</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Horror">Horror</option>
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
          </select>
          <label htmlFor="floatingGenre">Genre</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary my-3" type="submit">
          Add Story
        </button>
      </form>
    </>
  );
};

export default AddStory;
