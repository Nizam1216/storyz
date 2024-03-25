import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the URL parameters

const ReadMore = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [note, setNote] = useState(null); // State to store the single note

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
      }
    };

    fetchNote();
  }, [id]); // Include id in the dependency array to refetch the note when the ID changes

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
        {note && ( // Render the note only if it exists
          <div
            className="card my-0 shadow p-1 mb-5 bg-body-tertiary rounded"
            style={{ width: "38rem" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <p
                  className="mx-3"
                  style={{
                    height: "25px",

                    marginTop: "-15px",
                    marginRight: "-15px",
                  }}
                >
                  <i class="fa-regular fa-eye">views</i>: {note.views}
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

              <h5 className="card-title">{note.name}</h5>
              <p className="card-text">Written By : {note.userEmail}</p>
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: note.description }}
              ></p>

              {/* No need to use Link here, since we are already in the ReadMore component */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReadMore;
