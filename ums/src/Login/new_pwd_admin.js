import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "./login_navbar";

function NewPwdAdmin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");

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
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmAdminPassword}
            onChange={(e) => setConfirmAdminPassword(e.target.value)}
            required
          />
          <Link to="/admin-login">
            <button className="sendOtpBtn" type="submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default NewPwdAdmin;
