import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import "./mystories.css";
import image from "../../images/purple.jpg";

const MyStories = () => {
  const [populationArray, setPopulationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://storyzserver-nizam.vercel.app/api/notes/fetchallnotes",
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
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchAllNotes();
  }, []);

  const deleteNote = async (_id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(
        `https://storyzserver-nizam.vercel.app/api/notes/deletenote/${_id}`,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );
      setPopulationArray(populationArray.filter((item) => item._id !== _id));
      showToast("success", "Success", "Story Deleted Successfully");
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to Delete Story");
    }
  };

  const showToast = (severity, summary, detail) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {isLoading ? (
          <i
            className="pi pi-spin pi-spinner d-flex justify-content-center align-items-center"
            style={{ fontSize: "2rem", height: "50vh" }}
          ></i>
        ) : (
          <>
            {populationArray.length < 1 ? (
              <>
                <h1>you haven't written any stories yet</h1>
                <Link to="/add-new-story">Write a Story</Link>
              </>
            ) : (
              <div className="flex flex-wrap gap-3">
                {populationArray.map((item) => (
                  <div
                    className="flex flex-column"
                    style={{ width: "30%" }}
                    key={item._id}
                  >
                    <Link
                      to={`/read-story/${item._id}`}
                      style={{
                        fontFamily: "poppins",
                        width: "100%",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className="card mb-2 shadow p-1 mb-5 rounded something "
                        style={{
                          width: "100%",
                          backgroundImage: item.image
                            ? `url(${item.image})`
                            : `url(${image})`,

                          backgroundSize: "cover",
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <p
                              className="-ml-1"
                              style={{
                                height: "10px",
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-3px",
                                marginRight: "-3px",
                                fontSize: "8px",
                                color: "white",
                              }}
                            >
                              <i
                                className="pi pi-eye mt-0"
                                style={{
                                  fontSize: "6px",
                                  color: "white",
                                  marginRight: "2px",
                                }}
                              ></i>{" "}
                              {item.views}
                            </p>
                            <p
                              className=" bg-danger"
                              style={{
                                width: "fit-content",
                                height: "10px",
                                color: "white",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                borderRadius: "4px",
                                marginTop: "-3px",
                                marginRight: "-3px",
                                fontFamily: "poppins",
                                fontSize: "6px",
                              }}
                            >
                              {item.tag}
                            </p>
                          </div>

                          <div className="d-flex flex-row justify-content-between gap-2  mt-5 pt-5 align-items-center dvv">
                            <Link
                              to={`/edit-story/${item._id}`}
                              className="pi pi-pencil mr-4 -ml-0 vhng "
                              style={{
                                textDecoration: "none",
                                color: "green",

                                borderRadius: "5px",
                              }}
                            ></Link>
                            <i
                              onClick={() => deleteNote(item._id)}
                              style={{
                                cursor: "pointer",
                                color: "red",

                                borderRadius: "5px",
                              }}
                              className="pi pi-trash vhng"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to={`/read-story/${item._id}`}
                      style={{
                        fontFamily: "poppins",
                        width: "100%",
                        textDecoration: "none",
                        color: "rgb(53, 46, 46)",
                      }}
                    >
                      <p
                        className="cardname_title"
                        style={{
                          fontSize: "10px",
                          marginTop: "-25%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {item.title?.slice(0, 14) +
                          (item.title?.length > 14 ? "..." : "")}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Toast ref={toast} />
    </>
  );
};

export default MyStories;
