import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "./Components/login_navbar";

function StudentLogin() {
  const [enrollNo, setEnrollNo] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [forgotPwd, setForgotPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <section className="login-container">
      <LoginNav />
      {forgotPwd ? (
        <>
          <div className="forgotpwd">
            <form action="">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="sendOtpBtn"
                type="button"
                onClick={() => setSendOtp(true)}
              >
                Send OTP
              </button>
            </form>
          </div>
          {sendOtp && (
            <div className="forgotpwd">
              <form action="">
                <input
                  type="text"
                  placeholder="One Time Password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Link to="/student-login/new-password">
                  <button className="sendOtpBtn" type="submit">
                    Submit OTP
                  </button>
                </Link>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="login">
          <h2 style={{ fontFamily: "Calibri, sans-serif, Helvetica" }}>
            Student Login
          </h2>
          <hr />
          <br />
          <form action="">
            <input
              type="text"
              placeholder="Enrollment number"
              value={enrollNo}
              onChange={(e) => setEnrollNo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              required
            />
            <span>
              <button className="loginBtn" type="submit">
                Login
              </button>
              <span
                onClick={() => setForgotPwd(true)}
                style={{ fontSize: "2vh" }}
              >
                Forgot Password?
              </span>
            </span>
          </form>
        </div>
      )}
    </section>
  );
}

export default StudentLogin;
