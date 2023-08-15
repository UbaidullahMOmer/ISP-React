import React from "react";
import Home from "../Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "../component/Sidebar/Sidebar";

function ReactRoutes() {
  return (
   <Router>
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default ReactRoutes;
