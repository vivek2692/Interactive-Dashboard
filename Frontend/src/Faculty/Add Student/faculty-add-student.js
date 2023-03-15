import React, { useState } from "react";
import { Users } from "../../Data/user-info";
import "../CSS/faculty-add-student.css";
import Form from "../../Admin/Form/multistepstudent";

function FacultyAddStudent() {
  const [name, setName] = useState("");
  const [enroll, setEnroll] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <div className="admin-add-student">
      <div className="student-form">
        <h2>Student Registration</h2>
        <Form />
      </div>
    </div>
  );
}

export default FacultyAddStudent;
