import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import "../CSS/admin-users.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

function ViewFaculty() {
  const { id } = useParams();

  const [faculty, setFaculty] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);

  const obj = { faculty_id: id };

  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .post("http://localhost:8000/api/faculty/getFaculty", obj)
        .then((res) => {
          const data = res.data;
          setIsAvailable(true);
          setFaculty(data.data);
          // console.log(data.data.documents);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStudent();
  }, []);

  let key = 1;
  let srno = 1;
  // const student = Users.find((user) => user.enroll === parseInt(id));

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      {isAvailable ? (
        <div>
          <div className="student-info-page">
            <div className="stud-dtl">
              <div>
                <div className="info-container">
                  <img
                    width={250}
                    src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                  />
                  <h3 color="black">{faculty.name}</h3>
                  <p color="gray">{faculty.faculty_id}</p>
                </div>
                <div className="info-container">
                  <h2>Personal Details</h2>
                  <table className="info-table">
                    <tr>
                      <td>Name : </td>
                      <td>{faculty.name}</td>
                    </tr>
                    <tr>
                      <td>Email : </td>
                      <td>{faculty.email}</td>
                    </tr>
                    <tr>
                      <td>Mobile no. : </td>
                      <td>{faculty.contact}</td>
                    </tr>
                    <tr>
                      <td>Name Of Spouse/Father : </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Emergency Contact No. : </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Gender : </td>
                      <td>{faculty.gender}</td>
                    </tr>

                    <tr>
                      <td>Address : </td>
                      <td>{faculty.address}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div>
                <div className="info-container" style={{ height: "325px" }}>
                  <h2>Professional Details</h2>
                  <table className="info-table">
                    <tr>
                      <td>Joining Year : </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Faculty ID : </td>
                      <td>{faculty.faculty_id}</td>
                    </tr>
                    <tr>
                      <td>College : </td>
                      <td>{faculty.college}</td>
                    </tr>
                    <tr>
                      <td>Department : </td>
                      <td>{faculty.department}</td>
                    </tr>
                    <tr>
                      <td>Qualifications : </td>
                      <td>{faculty.qualification}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Please Wait...</h1>
      )}
    </div>
  );
}

export default ViewFaculty;
