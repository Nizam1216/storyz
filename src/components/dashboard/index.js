import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [populationArray, setPopulationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    const populatenotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://storyzserver.vercel.app/api/notes/populatenotes",
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
  }, []);

  useEffect(() => {
    // Filter stories based on search input
    const filtered = populationArray.filter(
      (item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.userEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStories(filtered);
  }, [searchInput, populationArray]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <form className="d-flex">
          <div
            className="input-group flex-nowrap mb-3"
            style={{ width: "100%" }}
          >
            <input
              type="search"
              className="form-control"
              placeholder="search by name or tag or email"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        </form>
        {isLoading ? (
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        ) : (
          <>
            {filteredStories.map((item) => (
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
                        alignItems: "cenetr",
                        marginTop: "-15px",
                        marginRight: "-15px",
                      }}
                    >
                      <i className="pi pi-eye mt-1"></i> {item.views}
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

                  <h5 className="card-title" style={{ fontFamily: "poppins" }}>
                    {item.name}
                  </h5>
                  <p className="card-text" style={{ fontFamily: "roboto" }}>
                    Written By :
                    <span style={{ fontFamily: "poppins", color: "grey" }}>
                      {item.userEmail}
                    </span>
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

                  <Link
                    to={`/read-story/${item._id}`}
                    className="btn btn-dark"
                    style={{ fontFamily: "poppins" }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
