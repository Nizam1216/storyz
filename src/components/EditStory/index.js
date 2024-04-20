import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";

const EditStory = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    chapters: [],
    tag: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          `https://storyzserver-nizam.vercel.app/api/notes/readnote/${id}`,
          {},
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        setNote(response.data);
        setFormData({
          title: response.data.title,
          chapters: response.data.chapters.map((chapter) => ({
            name: chapter.name,
            story: chapter.story,
          })),
          tag: response.data.tag,
        });
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

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][field] = value;
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://storyzserver-nizam.vercel.app/api/notes/updatenote/${id}`,
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { name: "", story: "" }],
    });
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
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Title Of The Story</label>
          </div>
          {formData.chapters.map((chapter, index) => (
            <div key={index}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id={`chapterName${index}`}
                  value={chapter.name}
                  onChange={(e) =>
                    handleChapterChange(index, "name", e.target.value)
                  }
                />
                <label htmlFor={`chapterName${index}`}>Chapter Name</label>
              </div>
              <div className="form-floating my-3">
                <textarea
                  type="text"
                  className="form-control"
                  id={`chapterStory${index}`}
                  value={chapter.story}
                  onChange={(e) =>
                    handleChapterChange(index, "story", e.target.value)
                  }
                  style={{
                    height: "auto",
                    minHeight: "20rem",
                    whiteSpace: "pre-wrap",
                  }}
                />
                <label htmlFor={`chapterStory${index}`}>Story</label>
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary w-full my-3"
            type="button"
            onClick={handleAddChapter}
            disabled={loading}
          >
            Add More
          </button>
          <div className="form-floating my-3">
            <select
              className="form-select"
              id="floatingGenre"
              name="tag"
              value={formData.tag}
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
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
          <button
            className="w-100 btn btn-lg btn-primary my-3"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              "Update Story"
            )}{" "}
          </button>
        </form>
      )}
    </>
  );
};

export default EditStory;
