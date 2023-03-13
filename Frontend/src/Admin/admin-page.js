import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminNavBar from "./NavBar/admin-navbar";
import AdminTopBar from "./TopBar/admin-topbar";
import AdminHome from "./Home/admin-home";
import "./CSS/admin.css";
import AdminUsers from "./Users/admin-users";
import AdminAddStudent from "./Add Student/admin-add-student";
import AdminAddFaculty from "./Add Faculty/admin-add-faculty";
import ViewStudent from "./Users/student-info";
import ErrorPage from "./Users/Error";

function Admin() {
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <Routes>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/student/:id" element={<ViewStudent />} />
          <Route path="/admin/add-student" element={<AdminAddStudent />} />
          <Route path="/admin/add-faculty" element={<AdminAddFaculty />} />
          <Route path="/admin/users/student/*" element={<ErrorPage />} />
        </Routes>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default Admin;
