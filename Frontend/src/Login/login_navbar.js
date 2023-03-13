import React from "react";
import { Link } from "react-router-dom";

function LoginNav() {
  return (
    <nav id="login-nav">
      <ul>
        <li>
          <Link to="/">Student</Link>
        </li>
        <li>
          <Link to="/faculty-login">Faculty</Link>
        </li>
        <li>
          <Link to="/admin-login">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default LoginNav;
