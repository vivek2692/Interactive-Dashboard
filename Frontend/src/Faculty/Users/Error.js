import React from "react";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";

function ErrorPage() {
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <h1>User Not Found!</h1>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default ErrorPage;
