import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SentiHome from "./components/Senti_Home";
import AboutProject from "./components/AboutProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/senti" element={<SentiHome />} />
        <Route path ="/about" element={<AboutProject/>}/>
      </Routes>
    </Router>
  );
}

export default App;