import React, { useState } from "react";
import "../CSS/student-view-result.css";
import { Users } from "../Data/user-info";
import { Courses } from "../Data/courses";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";
import "../CSS/student.css";
import { useSelector } from "react-redux";
import axios from "axios";

function StudentViewResult() {

  const student = useSelector((state) => state.user.userInfo);

  const [college, setCollege] = useState(student.college);
  const [department, setDepartment] = useState(student.department);
  let srno1 = 1;
  let srno2 = 1;

  return (
    <div className="student-page">
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="view-result-page">
          <div className="view-result">
            <h2>Result</h2>
            <div className="sem-filter">
              <span>
                College :{" "}
                <select onChange={(e) => setCollege(e.target.value)}>
                  <option value={student.college} selected>
                    {student.college}
                  </option>
                </select>
              </span>
              <span>
                Department :{" "}
                <select onChange={(e) => setDepartment(e.target.value)}>
                  <option value={student.department} selected>
                    {student.department}
                  </option>
                </select>
              </span>
              <span>
                Semester :{" "}
                <select>
                  <option value="1" selected>
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </span>
            </div>
            <hr />
            <div className="academics-tables">
              <div className="result-basic-table">
                <h2>Student Details</h2>
                <div>
                  <table border={1}>
                    <tr>
                      <th>Student Name : </th>
                      <td>{student.name}</td>
                    </tr>
                    <tr>
                      <th>Student Enrollment no. :</th>
                      <td>{student.enrollment_no}</td>
                    </tr>
                    <tr>
                      <th>Semester :</th>
                      <td>{student.current_semester}</td>
                    </tr>
                    <tr>
                      <th>Department :</th>
                      <td>{student.department}</td>
                    </tr>
                    <tr>
                      <th>College :</th>
                      <td>{student.college}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="student-result-table">
                <h2>Result</h2>

                <table border={1}>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Grade Label</th>
                    <th>Grade Points</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>101</td>
                    <td>Advance Web Development</td>
                    <td>AA</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>103</td>
                    <td>Software Engineering</td>
                    <td>AB</td>
                    <td>8</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentViewResult;
