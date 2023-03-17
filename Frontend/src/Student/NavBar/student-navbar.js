import React, { useState, useEffect } from "react";
import { Link, Router, useNavigate, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { CgOrganisation } from "react-icons/cg";
import { BsTrophy } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";
import { TbCertificate } from "react-icons/tb";
import { BsCalendarEvent } from "react-icons/bs";

function StudentNavBar() {
  //const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const iconStyles = {
    color: "white",
    fontSize: "3.25vh",
    margin: "3px",
    cursor: "pointer",
  };

  return (
    <div className="student-nav">
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
          <Link to="/student/home">
            <span>
              <HiHome style={iconStyles} />
            </span>
            {openMenu && <span className="text">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/student/view-result">
            <span>
              <TbCertificate style={iconStyles} />
            </span>
            {openMenu && <span className="text">View Result</span>}
          </Link>
        </li>
        <li>
          <Link to="/student/coursera-form">
            <span>
              <SiCoursera style={iconStyles} />
            </span>
            {openMenu && <span className="text">Coursera Certificate</span>}
          </Link>
        </li>
        <li>
          <Link to="/student/upcoming-event">
            <span>
              <BsCalendarEvent style={iconStyles} />
            </span>
            {openMenu && <span className="text">Upcoming Events</span>}
          </Link>
        </li>
        <li>
          <Link to="/student/skills-hobbies">
            <span>
              <HiOutlineLightBulb style={iconStyles} />
            </span>
            {openMenu && <span className="text">Manage Skills & Hobbies</span>}
          </Link>
        </li>
        <li>
          <Link to="/student/competitive-exam-achievement">
            <span>
              <GiNotebook style={iconStyles} />
            </span>
            {openMenu && (
              <span className="text">Competitive Exam Achievements</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/student/extracurricular-achievement">
            <span>
              <BsTrophy style={iconStyles} />
            </span>
            {openMenu && (
              <span className="text">Extracurricular Achievements</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default StudentNavBar;

//coursera,courses
