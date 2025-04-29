import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navibar from "./components/template/Navbar";
import "./global.css";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navibar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
