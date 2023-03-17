import React from "react";
import "../CSS/faculty-add-student.css";
import "../CSS/faculty.css";
import Form from "../Form/multistepstudent";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";

function FacultyAddStudent() {
  return (
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="admin-add-student">
        <div className="student-form">
          <h2>Student Registration</h2>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default FacultyAddStudent;
