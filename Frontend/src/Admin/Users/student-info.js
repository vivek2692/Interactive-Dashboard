import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import "../CSS/admin-users.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

function ViewStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const [semester, setSemester] = useState(6);
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [enroll, setEnroll] = useState("");
  const [result, setResult] = useState([]);

  const obj = { enrollment_no: id };

  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .post("http://localhost:8000/api/student/getStudent", obj)
        .then(async (res) => {
          setStudent(res.data.data);
          setIsAvailable(true);
          const data = {
            enrollment_no: res.data.data.enrollment_no,
            department: res.data.data.department,
            college: res.data.data.college,
            current_semester: res.data.data.current_semester,
          };
          await axios
            .post("http://localhost:8000/api/student/view-result", data)
            .then((res) => {
              const data = res.data.data;
              console.log("result", data);
              setResult(data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStudent();
  }, [semester]);

  // useEffect(() => {
  // }, [semester]);

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
                  <h3 color="black">{student.name}</h3>
                  <p color="gray">{student.enrollment_no}</p>
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
              </div>
              <div>
                <div className="info-container">
                  <h2>Academic Details</h2>
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
                  <h2>Documents Uploaded</h2>
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
              <div>
                <div className="info-container student-result-table">
                  <h2>Student Result</h2>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "left",
                      display: "block",
                      height: "20px",
                      marginTop: "15px",
                    }}
                  >
                    <span>
                      Semester :{" "}
                      <select
                        onChange={(e) => {
                          setSemester(e.target.value);
                        }}
                      >
                        {/* <option value="">--select semester--</option> */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6" selected>
                          6
                        </option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </span>
                  </div>
                  <div className="user-table">
                    <table border={1}>
                      <tr>
                        <th>Sr. No.</th>
                        {/* <th>Code</th> */}
                        <th>Title</th>
                        {/* <th>Credits</th> */}
                        <th>Type</th>
                        <th>Mid Sem Marks</th>
                        <th>Internal Practical Marks</th>
                        <th>External Practical Marks</th>
                        <th>End Sem Marks</th>
                        <th>GP</th>
                        {/* <th>GP</th> */}
                      </tr>
                      {result.map((res) => {
                        {
                          return res.result.map((user) => {
                            // console.log(user);
                            return (
                              <tr key={srno++}>
                                <td>{srno}</td>
                                <td>{user.sub_name}</td>
                                <td>{user.type}</td>
                                <td>{user.mid_sem}</td>
                                <td>{user.internal_prac}</td>
                                <td>{user.viva_marks}</td>
                                <td>{user.final_exam}</td>
                                <td>{user.gradePoints}</td>
                              </tr>
                            );
                          });
                        }
                      })}
                    </table>
                    {/* <MaterialReactTable columns={columns} data={Users} /> */}
                  </div>
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

export default ViewStudent;
