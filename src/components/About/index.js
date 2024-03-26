import React from "react";
import Navbar from "../Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div
        className="container p2 flex flex-column justify-content-center align-items-center mt-5"
        style={{ fontFamily: "poppins" }}
      >
        <h5>
          Welcome to Storyz, where imagination meets reality. Our platform is
          dedicated to providing a creative space for writers and readers alike,
          fostering a community where stories come to life.
        </h5>
        <br />
        <p>
          At Storyz, we believe in the power of storytelling to inspire,
          connect, and entertain. Our mission is to empower writers to share
          their stories with the world and to provide readers with a diverse
          range of captivating narratives to explore.
        </p>
        <br />
        <p>
          Founded in [year], Storyz began as a passion project by a group of
          avid readers and writers who wanted to create a platform that
          celebrates storytelling in all its forms. What started as a small
          endeavor has now grown into a vibrant community of storytellers from
          around the globe.
        </p>
        <br />
        <p>
          On Storyz, writers can publish their stories, connect with fellow
          writers and readers, and receive feedback and support on their work.
          Readers can explore a wide variety of genres, discover new voices, and
          engage with their favorite authors.
        </p>
        <h3 className="btn-warning">Join Us:</h3>
        <p>
          Whether you're a writer looking to share your stories or a reader
          seeking new adventures, we invite you to join the Storyz community.
          Together, let's embark on a journey filled with imagination,
          inspiration, and endless storytelling possibilities.
        </p>
      </div>
    </>
  );
};

export default About;
