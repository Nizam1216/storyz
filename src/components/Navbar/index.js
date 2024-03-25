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
          <Link className="navbar-brand" to="/dashboard">
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
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem("authToken") ? (
                  <Link className="nav-link" to="/my-stories">
                    My Stories
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
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
                >
                  Actions
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link className="dropdown-item" to="/add-new-story">
                        Write a story
                      </Link>
                    ) : (
                      <Link className="nav-link" to="/login">
                        Write a story
                      </Link>
                    )}
                  </li>
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link className="dropdown-item" to="/">
                        Update Profile
                      </Link>
                    ) : (
                      <Link className="nav-link" to="/login">
                        Update Profile
                      </Link>
                    )}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <Link className="dropdown-item" to="/">
                        Report a Bug
                      </Link>
                    ) : (
                      <Link className="nav-link" to="/login">
                        Report a Bug
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
