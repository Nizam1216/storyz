import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";

const EditStory = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  const toast = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tag: "",
  });
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          // Use GET method to fetch a single note by its ID
          `https://storyzserver-l5ct.vercel.app/api/notes/readnote/${id}`, // Use template literals to inject the ID into the URL
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        setNote(response.data); // Set the fetched note in the state
      } catch (error) {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to Show Story",
        });
      }
    };

    fetchNote();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://storyzserver-l5ct.vercel.app/api/notes/updatenote/${id}`,
        formData,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Story Updated successfully",
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to Updated Story",
      });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Toast ref={toast} />

      <Navbar />
      {!note ? (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <form className="container mt-1 pt-3" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Update Your Story here</h1>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              defaultValue={note?.name}
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
              defaultValue={note?.description}
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
              value={formData.tag} // Set value to formData.tag
            >
              <option defaultValue={note?.tag}>{note?.tag}</option>
              <option value="Genaral">Default</option>
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
            Update Story
          </button>
        </form>
      )}
    </>
  );
};

export default EditStory;
