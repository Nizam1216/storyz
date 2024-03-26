import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light"
        data-bs-theme="primary"
        style={{ color: "white", position: "sticky", top: "0", zIndex: 10 }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand -mt-2"
            to="/dashboard"
            style={{ fontFamily: "poppins", color: "black", fontSize: "22px" }}
          >
            Storyz
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon pi pi-bars mt-2"
              style={{ fontSize: "18px" }}
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                  style={{ fontFamily: "poppins", color: "black" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem("authToken") ? (
                  <Link
                    className="nav-link"
                    to="/my-stories"
                    style={{ fontFamily: "poppins", color: "black" }}
                  >
                    My Stories
                  </Link>
                ) : (
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ fontFamily: "poppins", color: "black" }}
                  >
                    My Stories
                  </Link>
                )}
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/dashboard"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontFamily: "poppins", color: "black" }}
                >
                  Actions
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link
                        className="dropdown-item"
                        to="/add-new-story"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        Write a story
                      </Link>
                    ) : (
                      <Link
                        className="nav-link"
                        to="/login"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        Write a story
                      </Link>
                    )}
                  </li>
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link
                        className="dropdown-item"
                        to="/about"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        About Storyz
                      </Link>
                    ) : (
                      <Link
                        className="nav-link"
                        to="/login"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        About Storyz
                      </Link>
                    )}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link
                        className="dropdown-item"
                        to="/report a bug"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        Report a Bug
                      </Link>
                    ) : (
                      <Link
                        className="nav-link"
                        to="/login"
                        style={{ fontFamily: "poppins", color: "black" }}
                      >
                        login
                      </Link>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            {!localStorage.getItem("authToken") ? (
              <div>
                <Link className="btn btn-primary mx-2" to="/login">
                  Log in
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Sign up
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("email");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
