import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import StudentUpdateForm from "../Form/updatemultistepstudent";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import "../CSS/admin.css";

function UpdateStudent() {
  const { id } = useParams();
  let key = 1;
  let srno = 1;
  const student = Users.find((user) => user.enroll === parseInt(id));

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-add-student">
          <div className="student-form">
            <h2>Student Update</h2>
            <StudentUpdateForm />
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default UpdateStudent;
