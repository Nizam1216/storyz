import React, { useState, useRef } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Toast } from "primereact/toast";

const AddStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    chapters: [{ name: "", story: "" }],
    image: null,
  });
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const formDataToSend = {
        title: formData.title,
        tag: formData.tag,
        chapters: formData.chapters, // Ensure chapters are sent correctly
        image: formData.image,
      };
      const response = await axios.post(
        "https://storyzserver-nizam.vercel.app/api/notes/addnote",
        formDataToSend,
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      showToast("success", "Success", response.data.message);
      setFormData({
        title: "",
        tag: "",
        chapters: [{ name: "", story: "" }],
        image: null,
      });
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to Add Story");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "name" || name === "story") {
      const updatedChapters = [...formData.chapters];
      updatedChapters[index][name] = value;
      setFormData({ ...formData, chapters: updatedChapters });
    } else if (name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { name: "", story: "" }],
    });
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
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
            name="title"
            placeholder="Title of The Story"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Title Of The Story</label>
        </div>
        <div className="form-floating my-3">
          <input
            type="file"
            className="form-control"
            id="imageInput"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
          <label htmlFor="imageInput">Upload Cover Image</label>
        </div>
        {formData.chapters.map((chapter, index) => (
          <div key={index}>
            <div className="form-floating my-3">
              <input
                type="text"
                className="form-control"
                id={`floatingTitle${index}`}
                name="name"
                placeholder="Chapter Title"
                value={chapter.name}
                onChange={(e) => handleChange(e, index)}
              />
              <label htmlFor={`floatingTitle${index}`}>Chapter Title</label>
            </div>
            <div className="form-floating">
              <textarea
                type="text"
                className="form-control"
                id={`floatingContent${index}`}
                name="story"
                placeholder="Write your story here..."
                value={chapter.story}
                onChange={(e) => handleChange(e, index)}
                style={{
                  height: "auto",
                  minHeight: "20rem",
                  whiteSpace: "pre-wrap",
                }}
              />
              <label htmlFor={`floatingContent${index}`}>Chapter Content</label>
            </div>
          </div>
        ))}
        <button
          className="w-100 btn btn-lg btn-primary my-3"
          type="button"
          onClick={addChapter}
        >
          Add Chapter
        </button>
        <div className="form-floating my-3">
          <select
            className="form-select"
            id="floatingGenre"
            name="tag"
            onChange={handleChange}
            value={formData.tag}
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
