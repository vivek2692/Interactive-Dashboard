import React, { useState } from "react";
import { Link, Router } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiDashboard } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsFileSpreadsheet } from "react-icons/bs";

function AdminNavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const iconStyles = {
    color: "white",
    fontSize: "3.25vh",
    margin: "3px",
    cursor: "pointer",
  };

  return (
    <div className="admin-nav">
      <div className="menu">
        <center>
          <GiHamburgerMenu
            style={iconStyles}
            onClick={() => setOpenMenu(!openMenu)}
          />
        </center>
        <hr />
      </div>
      <ul>
        <li>
          <span>
            <TfiDashboard style={iconStyles} />
          </span>
          {openMenu && <span className="text">Home</span>}
        </li>
        <li>
          <span>
            <FiUsers style={iconStyles} />
          </span>
          {openMenu && <span className="text">Users</span>}
        </li>
        <li>
          <span>
            <AiOutlineUserAdd style={iconStyles} />
          </span>
          {openMenu && <span className="text">Add Student</span>}
        </li>
        <li>
          <span>
            <AiOutlineUserAdd style={iconStyles} />
          </span>
          {openMenu && <span className="text">Add Faculty</span>}
        </li>
        <li>
          <span>
            <CgOrganisation style={iconStyles} />
          </span>
          {openMenu && <span className="text">Placement Details</span>}
        </li>
        <li>
          <span>
            <MdOutlineCoPresent style={iconStyles} />
          </span>
          {openMenu && <span className="text">Student Attendance</span>}
        </li>
        <li>
          <span>
            <BsFileSpreadsheet style={iconStyles} />
          </span>
          {openMenu && <span className="text">Student Result</span>}
        </li>
      </ul>
    </div>
  );
}

export default AdminNavBar;

//coursera,courses
