import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminNavBar from "./NavBar/admin-navbar";
import AdminTopBar from "./TopBar/admin-topbar";
import AdminHome from "./Home/admin-home";
import "./CSS/admin.css";

function Admin() {
  return (
    <div className="admin-page">
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<AdminHome />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default Admin;
