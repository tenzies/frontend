import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Game from "./Pages/Game";
// import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Game />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  );
}