import React, { useState, useEffect } from "react";
import "../CSS/student-home.css";
import "../CSS/student.css";
import { Users } from "../Data/user-info";
import { Courses } from "../Data/courses";
import { FaUniversity } from "react-icons/fa";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function StudentHome() {
  const student = useSelector((state) => state.user.userInfo);
  // console.log(student)
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async() => {
      const obj = {enrollment_no: student.enrollment_no, college: student.college, department: student.department, current_semester: student.current_semester}
      await axios.post("http://localhost:8000/api/student/getStudentCourses",obj)
      .then((res) => {
        const data = res.data.data;
        setCourses(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    fetchCourse();
  },[])

  // let Users = [];
  // let Courses = [];
  const [college, setCollege] = useState(student.college);
  const [department, setDepartment] = useState(student.department);
  const [resultComponent, setResultComponent] = useState("Mid Semester");
  let srno1 = 1;
  let srno2 = 1;

  return (
    <div className="student-page">
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="student-home">
          <div className="student-home-details">
            <header className="student-header">
              <div>
                <h1>{student.name}</h1>
                <div>
                  <p>
                    <b>Enrollment number : </b>
                    {student.enrollment_no}
                  </p>
                  <p>
                    <b>Admission Year : </b>
                    {student.admission_year}
                  </p>
                </div>
              </div>
              <div style={{ position: "absolute", right: "44%" }}>
                <FaUniversity
                  style={{ color: "white", fontSize: "125px", padding: "15px" }}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ color: "white" }}>{student.college}</h2>
                <p>
                  <b>Program : </b>
                  {student.department}
                </p>
                <p>
                  <b>Semester : </b>
                  {student.current_semester}
                </p>
              </div>
            </header>
            <div className="student-academics-info">
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
                <div className="student-course-table">
                  <h2>Course Details</h2>
                  <div>
                    <table border={1}>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Credits</th>
                      </tr>
                      {courses.map((course) => {
                        return (
                          <tr>
                            <td>{srno1++}</td>
                            <td>{100+srno1-1}</td>
                            <td>{course}</td>
                            <td>{"subject"}</td>
                            <td>{3}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
                <div className="student-result-table">
                  <h2>Result</h2>
                  <div>
                    <span>
                      Result Component :{" "}
                      <select
                        onChange={(e) => setResultComponent(e.target.value)}
                      >
                        <option value="Mid Semester">Mid Semester</option>
                        <option value="Internal Practical">
                          Internal Practical
                        </option>
                      </select>
                    </span>
                  </div>
                  <table border={1}>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Marks</th>
                    </tr>
                    <tr>
                      <td>{srno2}</td>
                      <td>101</td>
                      <td>Advance Web Development</td>
                      <td>36</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
