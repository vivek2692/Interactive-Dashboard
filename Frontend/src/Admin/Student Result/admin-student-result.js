import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/admin-student-result.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

//import MaterialReactTable from "material-react-table";

function AdminStudentResult() {
  const [studentResults, setStudentResults] = useState([]);
  const [id, setId] = useState();
  const [batch, setBatch] = useState("2020");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("End Sem");
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  function updateMarks(index, newMarks) {
    const updateResult = [...studentResults];
    updateResult[index].marks = Number(newMarks);
    setStudentResults(updateResult);
    console.log(studentResults);
  }

  let srno = 1;

  useEffect(() => {
    const sem = Number(semester);
    const obj = { college: college, department: department, semester: sem };
    const fetchSub = async () => {
      await axios
        .post(`http://localhost:8000/api/faculty/getCourses`, obj)
        .then((res) => {
          const data = res.data.data;
          setCourses(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setCourses([]);
        });
    };
    fetchSub();
  }, [semester]);

  useEffect(() => {
    const obj = {
      batch: batch,
      college: college,
      department: department,
      current_semester: semester,
      subject: subject,
    };
    const fetchStudents = async () => {
      await axios
        .post(`http://localhost:8000/api/faculty/get-enrolled-students`, obj)
        .then((res) => {
          const data = res.data.data;
          setUsers(data);
          console.log("users", data);
        })
        .catch((err) => {
          console.log(err);
          // setCourses([]);
        });
    };
    fetchStudents();
  }, [subject]);

  useEffect(() => {
    var newResult = [];
    let enrollment = 0,
      marks = 0;
    users.map((user) => {
      const result = { enrollment: user.enrollment_no, marks };
      newResult.push(result);
    });

    setStudentResults(newResult);
    console.log(studentResults);
  }, [users]);

  const handleSubmit = async () => {
    const sem = Number(semester);
    const send = {
      college: college,
      department: department,
      subject: subject,
      obj: studentResults,
      batch: batch,
      semester: sem,
    };

    await axios
      .post("http://localhost:8000/api/admin/final-marks", send)
      .then((res) => {
        const data = res.data;
        console.log(data);
        alert("Marks added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="faculty-result">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>Student Result</h2>
          <div className="result-filter">
            <form action="">
              <div>
                <span>
                  College :{" "}
                  <select onChange={(e) => setCollege(e.target.value)}>
                    <option value="" selected>
                      --Select College--
                    </option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select>
                </span>
                <span>
                  Department :{" "}
                  <select onChange={(e) => setDepartment(e.target.value)}>
                    <option value="" selected>
                      --Select Department--
                    </option>
                    <option value="CP">CP</option>
                    <option value="IT">IT</option>
                    <option value="ME">ME</option>
                    <option value="MC">MC</option>
                    <option value="CH">CH</option>
                  </select>
                </span>
              </div>
              <div>
                <span>
                  Batch :{" "}
                  <select onChange={(e) => setBatch(e.target.value)}>
                    <option value="" selected>
                      --Select Batch--
                    </option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                  </select>
                </span>
                <span>
                  Semester :{" "}
                  <select onChange={(e) => setSemester(e.target.value)}>
                    <option value="" selected>
                      --Select Semester--
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  <span>
                    Subject :{" "}
                    <select onChange={(e) => setSubject(e.target.value)}>
                      {courses?.map((course) => {
                        return (
                          <option value={course.title}>{course.title}</option>
                        );
                      })}
                    </select>
                  </span>
                  <span>
                    Exam :{" "}
                    <select>
                      <option value="End Sem" selected>
                        End Sem
                      </option>
                    </select>
                  </span>
                </span>
              </div>
            </form>
          </div>
          <div className="result-table">
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Enrollment No.</th>
                <th>Marks</th>
              </tr>
              {studentResults.map((sr, index) => {
                //newResult[index].enrollment = user.enroll;
                return (
                  <tr key={srno++}>
                    <td>{srno}</td>
                    <td>{sr.enrollment}</td>
                    <td>
                      <input
                        type="text"
                        value={studentResults[index].marks}
                        onChange={(e) => updateMarks(index, e.target.value)}
                        style={{ width: "40px", margin: "0px" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>

            <center>
              <button className="multistep-form-btn">Clear</button>
              <button className="multistep-form-btn" onClick={handleSubmit}>
                Save
              </button>
            </center>
            {/* <MaterialReactTable columns={columns} data={Users} /> */}
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminStudentResult;
