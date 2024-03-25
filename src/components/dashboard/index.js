import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [populationArray, setPopulationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const populatenotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://storyzserver-l5ct.vercel.app/api/notes/populatenotes",
          {},
          {
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
          }
        );
        setPopulationArray(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    populatenotes();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
        {isLoading ? ( // Conditional rendering for loading state
          <h1>Loading...</h1>
        ) : (
          populationArray.map((item) => (
            <div
              className="card my-0 shadow p-1 mb-5 bg-body-tertiary rounded"
              style={{ width: "38rem" }}
              key={item._id}
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
                <p className="card-text">{item.description?.slice(0, 300)}</p>

                <Link to={`/read-story/${item._id}`} className="btn btn-dark">
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;
