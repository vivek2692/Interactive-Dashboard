import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
// import { Courses } from "../../Data/courses";
import { TfiSearch } from "react-icons/tfi";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import "../CSS/faculty-course-assigner.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function FacultyCourseAssigner() {
  const dpt = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [batch, setBatch] = useState("");
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [more, setMoreDetails] = useState(false);
  const [Id, setID] = useState("");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const obj = { department: dpt, semester: semester };
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

    const fetchStudents = async () => {
      await axios
        .post(
          `http://localhost:8000/api/admin/select-student?college=${clg}&department=${dpt}&semester=${semester}`
        )
        .then((res) => {
          const data = res.data.data;
          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSub();
    fetchStudents();
  }, [semester]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const res = await axios.get(
      `http://localhost:8000/api/student/searching?enrollment_no=${e.target.value}&college=${clg}&department=${dpt}`
    );
    setUsers(res.data.data);
  };

  let srno1 = 1;
  let srno2 = 1;
  return (
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="course-details">
        <div className="courses">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>Courses</h2>
          <div className="courses-filter">
            <form action="">
              <div>
                <span>
                  Batch :{" "}
                  <select onChange={(e) => setBatch(e.target.value)}>
                    <option value="" selected>
                      --Select Batch--
                    </option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </span>
                {batch && (
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
                )}
              </div>
            </form>
            <div>
              <center>
                <input
                  type="text"
                  placeholder="Search by Enrollment no."
                  onChange={handleSearch}
                />
                <button className="search">
                  <TfiSearch style={{ color: "white" }} />
                </button>
              </center>
            </div>
          </div>
          {batch && semester && (
            <div className="course-table">
              <h3 style={{ marginBottom: "10px", color: "rgb(143, 143, 145)" }}>
                Course Details
              </h3>
              <table border={1}>
                <tr>
                  <th>Sr. No.</th>
                  {/* <th>Code</th> */}
                  <th>Title</th>
                  <th>Credits</th>
                  <th>Type</th>
                  {/* <th>Action</th> */}
                </tr>
                {courses.map((course) => {
                  return (
                    <>
                      <tr key={srno2++}>
                        <td>{srno2}</td>
                        {/* <td>{course.code}</td> */}
                        <td>{course.title}</td>
                        <td>{course.credits}</td>
                        <td>{course.type}</td>
                        {/* <td id="table-actions">
                        <button className="view">
                          <center>Edit</center>
                        </button>
                      </td> */}
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          )}
        </div>
        {batch && semester && (
          <div className="std-course-table">
            <h3 style={{ marginBottom: "10px", color: "rgb(143, 143, 145)" }}>
              Assign Courses
            </h3>
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>College</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
              {users.map((user) => {
                return (
                  <>
                    <tr key={srno1++}>
                      <td>{srno1}</td>
                      <td>{user.name}</td>
                      <td>{user.enrollment_no}</td>
                      <td>{user.department}</td>
                      <td>{user.college}</td>
                      <td>{user.current_semester}</td>
                      <td id="table-actions">
                        <Link
                          to={`/faculty/courses/student/${user.enrollment_no}`}
                        >
                          <button className="view">
                            <center>Assign Courses</center>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
            {/* <MaterialReactTable columns={columns} data={Users} /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyCourseAssigner;
