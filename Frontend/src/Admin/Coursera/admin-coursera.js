import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import "../CSS/admin-coursera.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function AdminCoursera() {
  const [student, setStudent] = useState(true);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [more, setMoreDetails] = useState(false);
  const [Id, setID] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:8000/api/admin/coursera?college=${college}&department=${department}`
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
  }, [college,department]);

  const handleSearch = async (e) => {
    const res = await axios.get(`http://localhost:8000/api/admin/search-coursera?enrollment_no=${e.target.value}`);
    setSearch(e.target.value);
    setUsers(res.data.data);
  };

  let srno = 1;
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="coursera-users">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>Coursera Details</h2>
          <div className="coursera-filter">
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
                {college && (
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
                )}
                {/* {department && (
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
            )} */}
                {department && (
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
                  placeholder="Search by Name or Enrollment no."
                  onChange={handleSearch}
                />
                {/* <button className="search">
              { <TfiSearch style={{ color: "white" }} /> }
            </button> */}
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
                                      <li style={{marginLeft: "70px"}}>
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
                );
              })}
            </table>
            {/* <MaterialReactTable columns={columns} data={Users} /> */}
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminCoursera;
