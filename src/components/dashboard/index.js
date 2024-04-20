import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import image from "../../images/purple.jpg";
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
          "https://storyzserver-nizam.vercel.app/api/notes/populatenotes",
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
        console.log(populationArray);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    populatenotes();
  }, [populationArray]);

  useEffect(() => {
    // Filter stories based on search input
    const filtered = populationArray.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.userEmail?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.tag?.toLowerCase().includes(searchInput.toLowerCase())
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
          <i
            className="pi pi-spin pi-spinner d-flex justify-content-center align-items-center"
            style={{ fontSize: "2rem", height: "50vh" }}
          ></i>
        ) : (
          <>
            {[...Array(Math.ceil(filteredStories.length / 3))]?.map(
              (_, rowIndex) => (
                <div className="flex gap-3" key={rowIndex}>
                  {filteredStories
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((story) => (
                      <div
                        className="flex flex-column"
                        style={{ width: "30%" }}
                        key={story._id}
                      >
                        <Link
                          to={`/read-story/${story._id}`}
                          style={{
                            fontFamily: "poppins",
                            width: "100%",
                            textDecoration: "none",
                          }}
                        >
                          <div
                            className="card shadow p-1 mb-5 bg-body-tertiary rounded m-0 p-0 something"
                            style={{
                              width: "100%",
                              backgroundImage: story.image
                                ? `url(${story.image})`
                                : `url(${image})`,

                              backgroundSize: "cover",
                            }}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center p-0 m-0">
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
                                    className="pi pi-eye  "
                                    style={{
                                      fontSize: "6px",
                                      color: "white",
                                      marginRight: "2px",
                                    }}
                                  ></i>{" "}
                                  {story.views}
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
                                  {story.tag}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to={`/read-story/${story._id}`}
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
                            {story.title?.slice(0, 14) +
                              (story.title?.length > 14 ? "..." : "")}
                          </p>
                        </Link>
                      </div>
                    ))}
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
