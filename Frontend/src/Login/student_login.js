import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "./login_navbar";
import axios from "axios";

function StudentLogin() {
  const [enrollNo, setEnrollNo] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
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
      enrollment_no: enrollNo,
      password: studentPassword
    }

    axios.post("http://localhost:8000/api/student/login",obj)
    .then((res) => {
      const data = res;

      console.log(data.data);
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

    axios.post("http://localhost:8000/api/student/forgot-password",obj)
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
    axios.post("http://localhost:8000/api/student/validateOTP",obj)
    .then((res) => {
      const data = res;
      console.log(data);
      setIsOtpError(false);
      navigate("/student-login/new-password");
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
            <form>
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
                {/* <Link to="/student-login/new-password"> */}
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

export default StudentLogin;
