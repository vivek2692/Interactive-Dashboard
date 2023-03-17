import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "./student-topbar";
import "../CSS/student.css";

function MyProfile() {
  const { id } = useParams();
  let key = 1;
  let srno = 1;
  const student = Users[0];

  return (
    <div className="student-page">
      {/* <Router> */}
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="student-info-page">
          <div className="stud-dtl">
            <div>
              <div className="info-container">
                <img
                  width={250}
                  src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                />
                <h3 color="black">{student.name}</h3>
                <p color="gray">{student.enroll}</p>
              </div>
              <div className="info-container">
                <h2>Personal Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Name : </td>
                    <td>{student.name}</td>
                  </tr>
                  <tr>
                    <td>Email : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Mobile no. : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Gender : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Enrollment no. : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Address : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>State : </td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div>
              <div className="info-container">
                <h2>Academic Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Admission Year : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Admission Quota : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>College : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Department : </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Current Year : </td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className="info-container">
                <h2>Documents Uploaded</h2>
                <br />
                <ul>
                  <li>
                    <a href="#">Aadhar Card</a>
                  </li>
                  <br />
                  <li>
                    <a href="#">HSC Marksheet</a>
                  </li>
                  <br />
                  <li>
                    <a href="#">Leaving Certificate</a>
                  </li>
                  <br />
                  <li>
                    <a href="#">Migration Certificate</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
