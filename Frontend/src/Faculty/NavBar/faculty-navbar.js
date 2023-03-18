import React, { useState, useEffect } from "react";
import { Link, Router, useNavigate, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiDashboard } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { BsCalendarEvent } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import { ImBooks } from "react-icons/im";
import { SiCoursera } from "react-icons/si";
import { TbCertificate } from "react-icons/tb";
import { GiJusticeStar } from "react-icons/gi";
import { HiHome } from "react-icons/hi";

function FacultyNavBar() {
  //const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const iconStyles = {
    color: "white",
    fontSize: "3.25vh",
    margin: "3px",
    cursor: "pointer",
  };

  return (
    <div className="faculty-nav">
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
          <Link to="/faculty/home">
            <span>
              <HiHome style={iconStyles} />
            </span>
            {openMenu && <span className="text">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/students">
            <span>
              <FiUsers style={iconStyles} />
            </span>
            {openMenu && <span className="text">Students</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/courses">
            <span>
              <ImBooks style={iconStyles} />
            </span>
            {openMenu && <span className="text">Courses</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/placement-details">
            <span>
              <CgOrganisation style={iconStyles} />
            </span>
            {openMenu && <span className="text">Placement Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/coursera-details">
            <span>
              <SiCoursera style={iconStyles} />
            </span>
            {openMenu && <span className="text">Coursera Details</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/student-result">
            <span>
              <TbCertificate style={iconStyles} />
            </span>
            {openMenu && <span className="text">Student Result</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/event-registration">
            <span>
              <BsCalendarEvent style={iconStyles} />
            </span>
            {openMenu && <span className="text">Event Register</span>}
          </Link>
        </li>
        <li>
          <Link to="/faculty/talent-hunt">
            <span>
              <GiJusticeStar style={iconStyles} />
            </span>
            {openMenu && <span className="text">Talent Hunt</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FacultyNavBar;

//coursera,courses
