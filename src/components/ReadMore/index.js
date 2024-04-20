import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "../MyStories/mystories.css";
const ReadMore = () => {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [chapterIndex, setChapterIndex] = useState(0); // State to track the current chapter index
  const [comment, setComment] = useState("");
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchNote();
  }, [id, comment]);
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (localStorage.getItem("email")) {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          `https://storyzserver-nizam.vercel.app/api/notes/addcomment/${id}`,
          {
            text: comment,
            email: localStorage.getItem("email"),
          },
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        // const updatedNote = await axios.post(
        //   `https://storyzserver.vercel.app/api/notes/readnote/${id}`,
        //   {},
        //   {
        //     headers: {
        //       "auth-token": authToken,
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // setNote(updatedNote.data);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Comment added successfully",
        });
        setComment("");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Please login to add comment",
        });
      }
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add comment",
      });
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex(chapterIndex - 1);
    }
  };

  const goToNextChapter = () => {
    if (chapterIndex < note.chapters.length - 1) {
      setChapterIndex(chapterIndex + 1);
    }
  };
  const handleChapterClick = (index) => {
    setChapterIndex(index);
    setVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className="new">
        <div className="card flex justify-content-center mt-2">
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h2>All Chapters</h2>
            {note &&
              note.chapters.map((chapter, index) => (
                <p key={index} onClick={() => handleChapterClick(index)}>
                  {index + 1}. {chapter.name}
                </p>
              ))}
          </Sidebar>
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
      </div>
      <div className="container mt-5 anc">
        {note ? (
          <>
            <div
              className="card mb-5 bg-body-tertiary rounded sm"
              style={{ width: "100%", height: "auto" }}
            >
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">Written By: {note.userEmail}</p>
                <h6
                  className="card-subtitle mb-2 text-muted"
                  style={{ fontFamily: "poppins" }}
                >
                  {note.chapters[chapterIndex].name}
                </h6>
                <p className="card-text" style={{ fontFamily: "poppins" }}>
                  {note.chapters[chapterIndex].story}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={goToPreviousChapter}
                    disabled={chapterIndex === 0}
                  >
                    Previous Chapter
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={goToNextChapter}
                    disabled={chapterIndex === note.chapters.length - 1}
                  >
                    Next Chapter
                  </button>
                </div>
              </div>
            </div>

            <div
              className="card mb-5 bg-body-tertiary rounded sm"
              style={{ width: "100%", height: "auto" }}
            >
              <div className="card-body">
                <h5 className="card-title">Leave a Comment</h5>
                <form onSubmit={handleSubmitComment}>
                  <div className="form-floating">
                    <textarea
                      type="text"
                      className="form-control"
                      id="floatingTextarea"
                      name="description"
                      placeholder="Write your comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{
                        height: "auto",
                        minHeight: "12rem",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                    <label htmlFor="floatingTextarea">Comment here...</label>
                    <button
                      className="btn btn-dark my-2 w-full"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <i className="pi pi-spin pi-spinner"></i>
                      ) : (
                        "Add Comment"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="card mb-5 bg-body-tertiary rounded"
              style={{ width: "100%", height: "auto" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  All Comments ({note.comments.length})
                </h5>
                {note.comments.map((comment) => (
                  <div className="new" key={comment._id}>
                    <div
                      className="card mb-1"
                      style={{ height: "100px !important" }}
                    >
                      <p style={{ fontWeight: "200" }}>_{comment.email}</p>
                      <p className="-mt-3 pl-2">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <i
            className="pi pi-spin pi-spinner d-flex justify-content-center align-items-center"
            style={{ fontSize: "2rem" }}
          ></i>
        )}
        <Toast ref={toast} />
      </div>
    </>
  );
};

export default ReadMore;
