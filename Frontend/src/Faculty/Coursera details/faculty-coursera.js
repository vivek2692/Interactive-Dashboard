import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import "../CSS/faculty-coursera.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function FacultyCoursera() {
  const dept = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [student, setStudent] = useState(true);
  const [college, setCollege] = useState(clg);
  const [department, setDepartment] = useState(dept);
  const [semester, setSemester] = useState("");
  const [more, setMoreDetails] = useState(false);
  const [Id, setID] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // const sem = Number(semester);
      const obj = {college: clg, department: dept, semester: semester};
      await axios
        .post(
          `http://localhost:8000/api/faculty/coursera`,obj
        )
        .then((res) => {
          const data = res.data;
          // console.log(data);
          setUsers(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [semester]);

  const handleSearch = async (e) => {
    const res = await axios.get(
      `http://localhost:8000/api/admin/search-coursera?enrollment_no=${e.target.value}`
    );
    setSearch(e.target.value);
    setUsers(res.data.data);
  };

  let srno = 1;
  return (
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="coursera-users">
        <h2 style={{ color: "rgb(143, 143, 145)" }}>User Details</h2>
        <div className="coursera-filter">
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
        <div className="coursera-table">
          <table border={1}>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Enrollment No.</th>
              <th>Department</th>
              <th>College</th>
              {/* <th>Semester</th> */}
              <th>Action</th>
            </tr>
            {users.map((user) => {
              return (
                <>
                  <tr key={srno++} style={{ backgroundColor: "#c2d9e8" }}>
                    <td>{srno}</td>
                    <td>
                      <center>{user.name}</center>
                    </td>
                    <td>
                      <center>{user.enrollment_no}</center>
                    </td>
                    <td>
                      <center>{user.department}</center>
                    </td>
                    <td>
                      <center>{user.college}</center>
                    </td>
                    {/* <td>
                        <center>{user.semester}</center>
                      </td> */}
                    <td id="table-actions">
                      <button
                        className="view"
                        onClick={() => {
                          setMoreDetails(!more);
                          setID(user.enrollment_no);
                        }}
                      >
                        <center>
                          <span>More Details</span>
                          <span>
                            {more && user.enrollment_no === Id ? (
                              // {more ? (
                              <BiChevronUp style={{ marginLeft: "4px" }} />
                            ) : (
                              <BiChevronDown style={{ marginLeft: "4px" }} />
                            )}
                          </span>
                        </center>
                      </button>
                    </td>
                  </tr>
                  {more && user.enrollment_no === Id && (
                    // {more && (
                    <>
                      {user.courses.map((course) => {
                        // console.log(course);
                        return (
                          <>
                            <tr>
                              <h3>Semester {course.semester}</h3>
                            </tr>
                            <tr style={{ backgroundColor: "#e9eef2" }}>
                              <td colSpan={6}>
                                <ul>
                                  {course.certificates.map((c) => {
                                    return (
                                      <li style={{ marginLeft: "70px" }}>
                                        <a
                                          target="_blank"
                                          href={`http://localhost:8000/${c.image}`}
                                        >
                                          {c.name}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  )}
                </>
              )
            })}
          </table>
          {/* <MaterialReactTable columns={columns} data={Users} /> */}
        </div>
      </div>
    </div>
  );
}

export default FacultyCoursera;
