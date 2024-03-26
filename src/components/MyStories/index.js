import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import "./mystories.css";
const MyStories = () => {
  const [populationArray, setPopulationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const toast = useRef(null); // Ref for toast

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://storyzserver.vercel.app/api/notes/fetchallnotes",
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
        `https://storyzserver.vercel.app/api/notes/deletenote/${_id}`,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPopulationArray(populationArray.filter((item) => item._id !== _id));
      showToast("success", "Success", "Story Deleted Successfully");
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to Delete Story");
    }
  };

  // Function to show the toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
        {isLoading ? (
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        ) : (
          <>
            {populationArray.length < 1 ? (
              <>
                <h1>you haven't written any stories yet</h1>
                <Link to="/add-new-story">Write a Story</Link>
              </>
            ) : (
              populationArray.map((item) => (
                <div
                  className="card mb-2 shadow p-1 mb-5 bg-body-tertiary rounded"
                  style={{ width: "38rem" }}
                  key={item._id}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-end">
                      <p
                        className="mx-3"
                        style={{
                          height: "25px",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "-15px",
                          marginRight: "-15px",
                        }}
                      >
                        <i className="pi pi-eye mt-1"></i>
                        {item.views}
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
                          fontFamily: "poppins",
                        }}
                      >
                        {item.tag}
                      </p>
                    </div>

                    <h5
                      className="card-title"
                      style={{ fontFamily: "poppins" }}
                    >
                      {item.name}
                    </h5>
                    <p className="card-text" style={{ fontFamily: "roboto" }}>
                      Written By :{" "}
                      <span style={{ fontFamily: "poppins", color: "grey" }}>
                        {item.userEmail}
                      </span>{" "}
                    </p>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: "poppins",
                        fontWeight: "200",
                        color: "black",
                      }}
                    >
                      {item.description?.slice(0, 300)}
                    </p>
                    <div className="d-flex justify-content-between w-full">
                      <Link
                        to={`/read-story/${item._id}`}
                        className="btn btn-dark"
                        style={{ fontFamily: "poppins" }}
                      >
                        Read More
                      </Link>
                      <div className="d-flex">
                        <Link
                          to={`/edit-story/${item._id}`}
                          className="pi pi-pencil mx-3"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: "22px",
                          }}
                        ></Link>
                        <i
                          onClick={() => deleteNote(item._id)}
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          className="pi pi-trash"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* PrimeReact Toast component */}
      <Toast ref={toast} />
    </>
  );
};

export default MyStories;
