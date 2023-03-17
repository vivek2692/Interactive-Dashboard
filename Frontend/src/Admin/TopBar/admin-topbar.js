import React, { useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router";

function AdminTopBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo.name);
  const token = useSelector((state) => state.user.token);
  // console.log("redux",user);

  useEffect(() => {
    if(!token){
      navigate("/");
    }
  },[])

  const handleClick = () => {
    dispatch(logout());
    navigate('/');
  }

  // const data = localStorage.getItem("user");
  // console.log("topbar",data.data);

  const iconStyles = {
    color: "white",
    fontSize: "3.5vh",
    margin: "1vh",
    cursor: "pointer",
  };

  return (
    <div className="admin-topbar">
      <center>CVM University</center>
      <div style={{display: "flex", alignItems: "center"}}>
        <span>
          <IoIosNotificationsOutline style={iconStyles} />
        </span>
        <span style={{display: "flex", alignItems: "center", fontWeight: "500", color: "white", marginRight: "15px"}}>
          <CgProfile style={iconStyles} />
          {user? user : ''}
        </span>
        <span>
          <button className="top-bar-btn" style={{padding: "5px 9px", border: "3px solid white", background: "none", borderRadius: "10px", color: "white", fontWeight: "600"}} onClick = {handleClick}>Log Out</button>
        </span>
      </div>
    </div>
  );
}

export default AdminTopBar;
