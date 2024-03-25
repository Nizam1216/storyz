import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Barchart from "../src/components/BarCharts";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import MyStories from "./components/MyStories";
import AddStory from "./components/AddStory";
import EditStory from "./components/EditStory";
import ReadMore from "./components/ReadMore";
// import { useEffect, useState } from "react";
const App = () => {
  // const [first, setfirst] = useState(0);
  //if we dont give empty array it will run on every rerender
  //if we empty array it we rerender only on first render.
  //if we give any specific value in a array then it will rerender only when that value given in an array changes.
  // useEffect(() => {
  //   alert("value increased by 1");
  // }, [first]);

  return (
    <>
      {/* <h1>${first}</h1>
      <br />
      <button onClick={() => setfirst(first + 1)}>increase by 1</button> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-stories" element={<MyStories />} />
          <Route path="/add-new-story" element={<AddStory />} />
          <Route path="/edit-story/:id" element={<EditStory />} />
          <Route path="/read-story/:id" element={<ReadMore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
