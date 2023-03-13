import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { Users } from "../../Data/user-info";
import "../CSS/admin-users.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

function ViewStudent() {
  const { id } = useParams();
  // let key = 1;
  // const student = Users.find((user) => user.enroll === parseInt(id));

  const [student, setStudent] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);

  const obj = { enrollment_no: id };

  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .post("http://localhost:8000/api/student/getStudent", obj)
        .then((res) => {
          const data = res.data;
          setIsAvailable(true);
          setStudent(data.data);
          // console.log(data.data.documents);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStudent();
  }, []);

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      {isAvailable ? 
        <div>
          <div className="student-info-page">
            <div className="stud-dtl">
              <div className="info-container">
                <img
                  width={250}
                  className="profile_img"
                  src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                />
                <h3 color="black">{student.name}</h3>
                <p color="gray">{student.enrollment_no}</p>
              </div>
              <div className="info-container">
                <h2 className="info-title">Personal Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Name : </td>
                    <td>{student.name}</td>
                  </tr>
                  <tr>
                    <td>Email : </td>
                    <td>{student.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile no. : </td>
                    <td>{student.contact}</td>
                  </tr>
                  <tr>
                    <td>Gender : </td>
                    <td>{student.gender}</td>
                  </tr>
                  <tr>
                    <td>Enrollment no. : </td>
                    <td>{student.enrollment_no}</td>
                  </tr>
                  <tr>
                    <td>Address : </td>
                    <td>{student.address}</td>
                  </tr>
                  <tr>
                    <td>State : </td>
                    <td>{student.state}</td>
                  </tr>
                </table>
              </div>
              <div className="info-container">
                <h2 className="info-title">Academic Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Admission Year : </td>
                    <td>{student.admission_year}</td>
                  </tr>
                  <tr>
                    <td>Admission Quota : </td>
                    <td>{student.admission_source}</td>
                  </tr>
                  <tr>
                    <td>College : </td>
                    <td>{student.college}</td>
                  </tr>
                  <tr>
                    <td>Department : </td>
                    <td>{student.department}</td>
                  </tr>
                  <tr>
                    <td>Current Semester : </td>
                    <td>{student.current_semester}</td>
                  </tr>
                </table>
              </div>
              <div className="info-container">
                <h2 className="info-title">Documents Uploaded</h2>
                <br />
                <ul>
                  {student &&
                    student.documents.map((document) => {
                      let str = "";
                      if (document.name === "AadharCard") {
                        str = "Aadhar Card";
                      } else if (document.name === "hsc_marksheet") {
                        str = "HSC Marksheet";
                      } else if (document.name === "ssc_marksheet") {
                        str = "SSC Marksheet";
                      } else if (document.name === "lc") {
                        str = "Leaving Certificate";
                      } else if (document.name === "gujcet_marksheet") {
                        str = "Gujcet Marksheet";
                      } else if (document.name === "acpc_admission_letter") {
                        str = "ACPC Admission Letter";
                      } else if (document.name === "migration_certificate") {
                        str = "Migration Certificate";
                      }

                      return (
                        <>
                          <li>
                            <a
                              target="_blank"
                              href={`http://localhost:8000/${document.image}`}
                            >
                              {str}
                            </a>
                          </li>
                          <br />
                        </>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        :
        <h1>Please Wait...</h1>
      }
    </div>
  );
}

export default ViewStudent;
