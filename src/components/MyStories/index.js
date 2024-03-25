import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mystories.css";
const MyStories = () => {
  const [populationArray, setPopulationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://storyzserver-l5ct.vercel.app/api/notes/fetchallnotes",
          {},
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setPopulationArray(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error.message);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchAllNotes();
  }, []); // Empty dependency array to run the effect only once on mount

  const deleteNote = async (_id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.delete(
        // Use GET method to fetch a single note by its ID
        `https://storyzserver-l5ct.vercel.app/api/notes/deletenote/${_id}`, // Use template literals to inject the ID into the URL
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPopulationArray(populationArray.filter((item) => item._id !== _id));
      alert("Story Deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
        {isLoading ? ( // Conditional rendering for loading state
          <h1>Loading...</h1>
        ) : (
          <>
            {populationArray.length < 1 ? (
              <>
                {" "}
                <h1>you have'nt wrote any stories yet</h1>
                <Link to="/add-new-story">Write a Story</Link>
              </>
            ) : (
              populationArray.map((item) => (
                <div
                  className="card my-0 shadow p-1 mb-5 bg-body-tertiary rounded"
                  style={{ width: "38rem" }}
                  key={item._id} // Move key prop here
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
                        <i class="fa-regular fa-eye">views</i>: {item.views}
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
                        {item.tag}
                      </p>
                    </div>

                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Written By : {item.userEmail}</p>
                    <p className="card-text">
                      {item.description?.slice(0, 300)}
                    </p>
                    <div className="d-flex justify-content-between w-full">
                      <Link
                        to={`/read-story/${item._id}`}
                        className="btn btn-dark"
                      >
                        Read More
                      </Link>
                      <div className="d-flex">
                        <Link
                          to={`/edit-story/${item._id}`}
                          className="btn btn-dark mx-2"
                        >
                          Update Story
                        </Link>
                        <button
                          onClick={() => deleteNote(item._id)}
                          className="btn btn-dark"
                        >
                          Deltete Story
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyStories;
