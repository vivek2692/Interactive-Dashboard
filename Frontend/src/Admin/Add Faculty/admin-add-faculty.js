import React from "react";
import "../CSS/admin-add-faculty.css";
import "../CSS/admin.css";
import FacultyForm from "../Form/multistepfaculty";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";

function AdminAddFaculty() {
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-add-faculty">
          <div className="faculty-form">
            <h2>Faculty Registration</h2>
            <FacultyForm />
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminAddFaculty;
