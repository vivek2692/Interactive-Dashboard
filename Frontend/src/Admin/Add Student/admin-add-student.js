import React, { useState } from "react";
import { Users } from "../../Data/user-info";
import "../CSS/admin-add-student.css";
import "../CSS/admin.css";
import Form from "../Form/multistepstudent";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";

function AdminAddStudent() {
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-add-student">
          <div className="student-form">
            <h2>Student Registration</h2>
            <Form />
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminAddStudent;
