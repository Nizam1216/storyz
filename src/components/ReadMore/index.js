import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

const ReadMore = () => {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [comment, setComment] = useState("");
  const toast = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          // Use GET method to fetch a single note by its ID
          `http://localhost:8080/api/notes/readnote/${id}`, // Use template literals to inject the ID into the URL
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
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      if (localStorage.getItem("email")) {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          `http://localhost:8080/api/notes/addcomment/${id}`,
          {
            text: comment,
            email: localStorage.getItem("email"), // Extract email from the authentication token
          },
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        // Refresh the note to display the updated comments
        const updatedNote = await axios.post(
          `https://storyzserver-l5ct.vercel.app/api/notes/readnote/${id}`,
          {},
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );

        setNote(updatedNote.data);
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
    }
  };

  const formattedDescription = note.description
    ?.split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
        {note ? (
          <>
            <div
              className="card mb-5 bg-body-tertiary rounded"
              style={{ width: "38rem" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-end">
                  <p
                    className="mx-3"
                    style={{
                      height: "25px",
                      display: "flex",
                      alignItems: "cenetr",
                      marginTop: "-14px",
                      marginRight: "-15px",
                    }}
                  >
                    <span className="mr-1">{note?.comments.length}</span>

                    <i className="pi pi-comments mt-1"></i>
                  </p>
                  <p
                    className=" bg-danger"
                    style={{
                      width: "fit-content",
                      height: "25px",
                      color: "white",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      borderRadius: "4px",
                      marginTop: "-15px",
                      marginRight: "-15px",
                    }}
                  >
                    {note.tag}
                  </p>
                </div>

                <h5 className="card-title" style={{ fontFamily: "poppins" }}>
                  {note.name}
                </h5>
                <p className="card-text" style={{ fontFamily: "roboto" }}>
                  Written By :{" "}
                  <span style={{ fontFamily: "poppins", color: "grey" }}>
                    {" "}
                    {note.userEmail}
                  </span>
                </p>
                <p className="card-text" style={{ fontFamily: "poppins" }}>
                  {formattedDescription}
                </p>
              </div>
            </div>
            <div
              className="car mb-5 bg-body-tertiary rounded"
              style={{ width: "38rem" }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: "poppins" }}>
                  Leave A comment
                </h5>
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
                      style={{ fontFamily: "poppins" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="car mb-5 bg-body-tertiary rounded"
              style={{ width: "38rem" }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: "poppins" }}>
                  All Comments({note?.comments.length})
                </h5>
                {note.comments?.map((comment) => (
                  <div key={comment._id}>
                    <div className="card mb-1">
                      <p style={{ fontFamily: "poppins", fontWeight: "200" }}>
                        @{comment.email}
                      </p>
                      <p
                        className="-mt-3 pl-2"
                        style={{ fontFamily: "poppins" }}
                      >
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Toast ref={toast} />
          </>
        ) : (
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        )}
      </div>
    </>
  );
};

export default ReadMore;
