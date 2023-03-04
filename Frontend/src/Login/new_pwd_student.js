import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "./login_navbar";
import axios from "axios";

function NewPwdStudent() {
  const [studentPassword, setStudentPassword] = useState("");
  const [confirmStudentPassword, setConfirmStudentPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async() => {
    if(studentPassword !== confirmStudentPassword){
      setIsError(true);
      setError("Passwords are not same")
    }
    else{
      setIsError(false);

      const email = localStorage.getItem("email");

      const obj = {
        email: email,
        password: studentPassword
      }

      axios.patch("http://localhost:8000/api/student/update-password",obj)
      .then((res) => {
        const data = res;
        navigate("/");
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
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmStudentPassword}
            onChange={(e) => setConfirmStudentPassword(e.target.value)}
            required
          />
          {isError && <p className="err-msg">{error}</p>}
          {/* <Link to="/student-login"> */}
            <button className="sendOtpBtn" type="button" onClick={handleSubmit}>
              Submit
            </button>
          {/* </Link> */}
        </form>
      </div>
    </section>
  );
}

export default NewPwdStudent;
