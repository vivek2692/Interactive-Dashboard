import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "./login_navbar";

function NewPwdFaculty() {
  const [facultyPassword, setFacultyPassword] = useState("");
  const [confirmFacultyPassword, setConfirmFacultyPassword] = useState("");

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
          <Link to="/faculty-login">
            <button className="sendOtpBtn" type="submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default NewPwdFaculty;
