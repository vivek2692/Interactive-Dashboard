import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router";

function StudentTopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo.name);
  const college = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };

  const iconStyles = {
    color: "white",
    fontSize: "3.5vh",
    margin: "1vh",
    cursor: "pointer",
  };

  return (
    <div className="student-topbar">
      <center>CVM University</center>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>
          <IoIosNotificationsOutline style={iconStyles} />
        </span>
        <Link to="/student/my-profile">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              color: "white",
              fontWeight: "500",
            }}
          >
            <CgProfile style={iconStyles} />
            {user ? user : ""}
          </span>
        </Link>
        <span>
          <button
            className="top-bar-btn"
            style={{
              padding: "7px 10px",
              background: "none",
              border: "3px solid white",
              color: "white",
              borderRadius: "10px",
              fontWeight: "600",
            }}
            onClick={handleClick}
          >
            Log Out
          </button>
        </span>
      </div>
    </div>
  );
}

export default StudentTopBar;
