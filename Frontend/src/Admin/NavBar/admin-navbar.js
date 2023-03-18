import React, { useState, useEffect } from "react";
import { Link, Router, useNavigate, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { TbCertificate } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { SiCoursera } from "react-icons/si";

function AdminNavBar() {
  //const navigate = useNavigate();

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
          <Link to="/admin/home">
            <span>
              <HiHome style={iconStyles} />
            </span>
            {openMenu && <span className="text">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/students">
            <span>
              <FiUsers style={iconStyles} />
            </span>
            {openMenu && <span className="text">Students Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/faculties">
            <span>
              <FiUsers style={iconStyles} />
            </span>
            {openMenu && <span className="text">Faculty Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/faculty-comparison">
            <span>
              <MdCompareArrows style={iconStyles} />
            </span>
            {openMenu && <span className="text">Faculty Comparison</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/courses">
            <span>
              <ImBooks style={iconStyles} />
            </span>
            {openMenu && <span className="text">Courses</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/placement-details">
            <span>
              <CgOrganisation style={iconStyles} />
            </span>
            {openMenu && <span className="text">Placement Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/coursera-details">
            <span>
              <SiCoursera style={iconStyles} />
            </span>
            {openMenu && <span className="text">Coursera Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/student-result">
            <span>
              <TbCertificate style={iconStyles} />
            </span>
            {openMenu && <span className="text">Result Filling</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/student-backlog">
            <span>
              <MdOutlinePendingActions style={iconStyles} />
            </span>
            {openMenu && <span className="text">Student Backlog Details</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminNavBar;

//coursera,courses
