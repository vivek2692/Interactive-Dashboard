import React, { useState, useEffect } from "react";
import { Link, Router, useNavigate, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiDashboard } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsFileSpreadsheet } from "react-icons/bs";

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
              <TfiDashboard style={iconStyles} />
            </span>
            {openMenu && <span className="text">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <span>
              <FiUsers style={iconStyles} />
            </span>
            {openMenu && <span className="text">Users</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/add-student">
            <span>
              <AiOutlineUserAdd style={iconStyles} />
            </span>
            {openMenu && <span className="text">Add Student</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/add-faculty">
            <span>
              <AiOutlineUserAdd style={iconStyles} />
            </span>
            {openMenu && <span className="text">Add Faculty</span>}
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
          <Link to="/admin/coursera">
            <span>
              <MdOutlineCoPresent style={iconStyles} />
            </span>
            {openMenu && <span className="text">Coursera</span>}
          </Link>
        </li>
        <li>
          <Link>
            <span>
              <BsFileSpreadsheet style={iconStyles} />
            </span>
            {openMenu && <span className="text">Student Result</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminNavBar;

//coursera,courses
