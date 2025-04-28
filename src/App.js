import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navibar from "./components/template/Navbar";
import "./global.css";
import Main from "./page";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navibar />
      <Main />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
