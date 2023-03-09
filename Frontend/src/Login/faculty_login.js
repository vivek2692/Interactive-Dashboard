import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "./login_navbar";
import axios from "axios";

function FacultyLogin() {
  const [uname, setUname] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [forgotPwd, setForgotPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [isOtpError, setIsOtpError] = useState(false);
  const [errorOtp, setErrorOtp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async() => {
    const obj = {
      email: uname,
      password: facultyPassword
    }

    axios.post("http://localhost:8000/api/faculty/login",obj)
    .then((res) => {
      const data = res;
      console.log(data.data);
      setIsError(false)
    })
    .catch((err) => {
      console.log("error",err.response.data.msg)
      setIsError(true);
      setError(err.response.data.msg)
    })
  }

  const handleEmail = async() => {
    const obj = {
      email: email
    }

    axios.post("http://localhost:8000/api/faculty/forgot-password",obj)
    .then((res) => {
      const data = res;

      console.log(data);
      setSendOtp(true);
      setIsEmailError(false);
      localStorage.setItem("email",obj.email);
    })
    .catch((err) => {
      setIsEmailError(true);
      setErrorEmail(err.response.data.msg)
    })
  }

  const handleOTP = async() => {

    const mainOTP = Number(otp);

    const obj = {
      email: email,
      otp:mainOTP,
    }
    axios.post("http://localhost:8000/api/faculty/validateOTP",obj)
    .then((res) => {
      const data = res;
      console.log(data);
      setIsOtpError(false);
      navigate("/faculty-login/new-password");
    })
    .catch((err) => {
      setIsOtpError(true);
      setErrorOtp(err.response.data.msg)
    })
  }

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
              {isEmailError && <p className="err-msg">{errorEmail}</p>}
              <button
                className="sendOtpBtn"
                type="button"
                onClick={handleEmail}
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
                {isOtpError && <p className="err-msg">{errorOtp}</p>}
                {/* <Link to="/faculty-login/new-password"> */}
                  <button className="sendOtpBtn" type="button" onClick={handleOTP}>
                    Submit OTP
                  </button>
                {/* </Link> */}
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="login">
          <h2 style={{ fontFamily: "Calibri, sans-serif, Helvetica" }}>
            Faculty Login
          </h2>
          <hr />
          <br />
          <form action="">
            <input
              type="email"
              placeholder="Email"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={facultyPassword}
              onChange={(e) => setFacultyPassword(e.target.value)}
              required
            />
            {isError && <p className="err-msg">{error}</p>}
            <span>
              <button className="loginBtn" type="button" onClick={handleSubmit}>
                Login
              </button>
              <span
                onClick={() => setForgotPwd(true)}
                style={{ fontSize: "2vh", cursor: "pointer" }}
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

export default FacultyLogin;
