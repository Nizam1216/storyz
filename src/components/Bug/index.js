import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Bug = () => {
  return (
    <>
      <Navbar />
      <div
        className="container p2 flex flex-column justify-content-center align-items-center mt-5"
        style={{ fontFamily: "poppins" }}
      >
        <p>
          Have questions, suggestions, or just want to say hello? <br />
          We'd love to hear from you! Feel free to contact us at:{" "}
          <Link href="https://nizamwork1216@gmail.com">
            nizamwork1216@gmail.com
          </Link>{" "}
        </p>
        <br /> <h5 className="flex text-align-center">or</h5>
        <br /> <p>connect with us on social media.</p>
      </div>
    </>
  );
};

export default Bug;
