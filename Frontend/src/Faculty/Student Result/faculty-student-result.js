import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/faculty-student-result.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function FacultyStudentResult() {
  const dpt = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [studentResults, setStudentResults] = useState([]);
  const [id, setId] = useState();
  const [batch, setBatch] = useState("2020");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [users, setUsers] = useState([]);

  function updateMarks(index, newMarks) {
    const updateResult = [...studentResults];
    updateResult[index].marks = Number(newMarks);
    setStudentResults(updateResult);
    console.log("final", studentResults);
  }

  let srno = 1;

  useEffect(() => {
    const obj = { college: clg, department: dpt, semester: semester };
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
      college: clg,
      department: dpt,
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
    const send = {
      subject: subject,
      obj: studentResults,
      batch: batch,
      semester: semester,
    };

    let url = "";

    if (exam === "Mid Sem") {
      url = "http://localhost:8000/api/faculty/mid-marks";
    } else if (exam === "Internal Practical") {
      url = "http://localhost:8000/api/faculty/internal-prac";
    } else if (exam === "External Practical") {
      url = "http://localhost:8000/api/faculty/viva-marks";
    }

    await axios
      .post(url, send)
      .then((res) => {
        const data = res.data.data;
        alert("Marks added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="faculty-result">
        <h2 style={{ color: "rgb(143, 143, 145)" }}>Student Result</h2>
        <div className="result-filter">
          <form action="">
            <div>
              <span>
                Batch :{" "}
                <select onChange={(e) => setBatch(e.target.value)}>
                  <option value="2020" selected>
                    2020
                  </option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </span>
              <span>
                Semester :{" "}
                <select onChange={(e) => setSemester(e.target.value)}>
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
                  <select onChange={(e) => setExam(e.target.value)}>
                    <option value="Mid Sem" selected>
                      Mid Sem
                    </option>
                    <option value="Internal Practical">
                      Internal Practical
                    </option>
                    <option value="External Practical">
                      External Practical
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
              {/* <th>Status</th> */}
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
                  {/* <td>
                    <button
                      className="view"
                      onClick={() => {
                        setId(sr.enrollment);
                      }}
                    ></button>
                  </td> */}
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
  );
}

export default FacultyStudentResult;
