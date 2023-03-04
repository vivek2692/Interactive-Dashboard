import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "./login_navbar";
import axios from "axios";

function NewPwdFaculty() {
  const [facultyPassword, setFacultyPassword] = useState("");
  const [confirmFacultyPassword, setConfirmFacultyPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async() => {
    if(facultyPassword !== confirmFacultyPassword){
      setIsError(true);
      setError("Passwords are not same")
    }
    else{
      setIsError(false);

      const email = localStorage.getItem("email");

      const obj = {
        email: email,
        password: facultyPassword
      }

      axios.patch("http://localhost:8000/api/faculty/update-password",obj)
      .then((res) => {
        const data = res;
        navigate("/faculty-login");
        alert(data.data.msg)
      })
      .catch((err) => {
        setIsError(true);
        setError(err.response.data.msg)
      })
    }
  }

  return (
    <section className="login-container">
      <LoginNav />
      <div className="login">
        <h2 style={{ fontFamily: "Calibri, sans-serif, Helvetica" }}>
          Change Password
        </h2>
        <hr />
        <br />
        <form>
          <input
            type="password"
            placeholder="New Password"
            value={facultyPassword}
            onChange={(e) => setFacultyPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmFacultyPassword}
            onChange={(e) => setConfirmFacultyPassword(e.target.value)}
            required
          />
          {isError && <p className="err-msg">{error}</p>}
          {/* <Link to="/faculty-login"> */}
            <button className="sendOtpBtn" type="button" onClick={handleSubmit}>
              Submit
            </button>
          {/* </Link> */}
        </form>
      </div>
    </section>
  );
}

export default NewPwdFaculty;
