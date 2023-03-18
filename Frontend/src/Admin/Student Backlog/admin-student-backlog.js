import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/admin-student-result.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

function AdminStudentBacklog() {
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [college, setCollege] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const obj = {
        current_semester: Number(semester),
        department: department,
        batch: batch,
        college: college,
      };
      await axios
        .post("http://localhost:8000/api/admin/show-backlog", obj)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setStudent(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [semester, department, batch, college]);

  let srno = 1;
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="faculty-result">
          <div className="header-add-btn">
            <h2 style={{ color: "rgb(143, 143, 145)" }}>
              Student Backlog Details
            </h2>
            <Link to="/admin/student-backlog/add-marks">
              <button
                className="multistep-form-btn"
                style={{ backgroundColor: "#3b7197" }}
              >
                Add Marks
              </button>
            </Link>
          </div>
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
                </span>
              </div>
            </form>
          </div>
          <div className="result-table">
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Enrollment no.</th>
                <th>College</th>
                <th>Department</th>
                <th>Backlog Semester</th>
                <th>Backlog Course</th>
              </tr>
              {student.map((std) => {
                return (
                  <tr>
                    <td>{srno++}</td>
                    <td>{std.name}</td>
                    <td>{std.enrollment_no}</td>
                    <td>{std.college}</td>
                    <td>{std.department}</td>
                    <td>{std.current_semester}</td>
                    {std.result.map((res) => {
                      return <td>{res.sub_name}</td>;
                    })}
                  </tr>
                );
              })}
            </table>

            <center>
              <button className="multistep-form-btn">Clear</button>
              <button className="multistep-form-btn">Save</button>
            </center>
            {/* <MaterialReactTable columns={columns} data={Users} /> */}
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminStudentBacklog;
