import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "./login_navbar";

function NewPwdStudent() {
  const [studentPassword, setStudentPassword] = useState("");
  const [confirmStudentPassword, setConfirmStudentPassword] = useState("");

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
          <Link to="/student-login">
            <button className="sendOtpBtn" type="submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default NewPwdStudent;
