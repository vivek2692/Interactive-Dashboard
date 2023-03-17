import React from "react";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function StudentTopBar() {
  const iconStyles = {
    color: "white",
    fontSize: "3.5vh",
    margin: "1vh",
    cursor: "pointer",
  };

  return (
    <div className="student-topbar">
      <center>CVM University</center>
      <div>
        <span>
          <IoIosNotificationsOutline style={iconStyles} />
        </span>
        <Link to="/student/my-profile">
          <span>
            <CgProfile style={iconStyles} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default StudentTopBar;
