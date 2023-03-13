import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/admin-users.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function AdminUsers() {
  const [student, setStudent] = useState(true);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const fetchData = async () => {
    let url;
    if (student !== true) {
      url = "http://localhost:8000/api/admin/all-students";
    } else{
      url = "http://localhost:8000/api/admin/all-faculties";
    }
    axios
      .get(url)
      .then((res) => {
        const temp = res;
        setData(temp.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStudentData = async() => {
    axios
      .get("http://localhost:8000/api/admin/all-students")
      .then((res) => {
        const temp = res;
        setData(temp.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {fetchStudentData()},[]);

  useEffect(() => {
    if (college !== "" || department !== "" || semester !== "") {
      handleFilter();
    } else {
      fetchData();
    }
  }, [college, department, semester]);

  const handleFilter = async () => {
    let url;

    if (student === true) {
      url = `http://localhost:8000/api/admin/select-student?college=${college}&department=${department}&semester=${semester}`;
    } else {
      url = `http://localhost:8000/api/admin/select-faculty?college=${college}&department=${department}`;
    }

    axios
      .post(url)
      .then((res) => {
        setData(res.data.data);
        // console.log('change department',res.data.data,department);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = async (e) => {
    let url;
    if (student) {
      url = `http://localhost:8000/api/student/search?enrollment_no=${e.target.value}`;
    } else {
      url = `http://localhost:8000/api/faculty/search?faculty_id=${e.target.value}`;
    }

    setSearch(e.target.value);
    const res = await axios.get(url);
    setData(res.data.data);
  };

  const handleChange = () => {
    setStudent(!student);
    fetchData();
    if (student === false) {
      setSemester("");
    }
  };

  let srno = 1;
  // console.log(data)
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-users">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>User Details</h2>
          <div className="user-filter">
            <form action="">
              <div>
                <span>
                  Role :{" "}
                  <select onChange={handleChange}>
                    <option value="student" selected>
                      Student
                    </option>
                    <option value="faculty">Faculty</option>
                  </select>
                </span>
              </div>
              <div>
                <span>
                  College :{" "}
                  <select
                    onChange={(e) => {
                      setCollege(e.target.value);
                      // handleCollege();
                    }}
                  >
                    <option value="" disabled selected>
                      --Select College--
                    </option>
                    <option value="">ALL</option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select>
                </span>
                {college && (
                  <span>
                    Department :{" "}
                    <select
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        // handleFilter();
                      }}
                    >
                      <option value="" disabled selected>
                        --Select Department--
                      </option>
                      <option value="">ALL</option>
                      <option value="CP">CP</option>
                      <option value="IT">IT</option>
                      <option value="ME">ME</option>
                      <option value="MC">MC</option>
                      <option value="CH">CH</option>
                    </select>
                  </span>
                )}
                {student && department && (
                  <span>
                    Semester :{" "}
                    <select
                      onChange={(e) => {
                        setSemester(e.target.value);
                        // handleFilter();
                      }}
                    >
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
                  placeholder={
                    student === true
                      ? "Search Enrollment No."
                      : "Search Faculty Id"
                  }
                  value={search}
                  onChange={handleSearch}
                />
                <button className="search">
                  <TfiSearch style={{ color: "white" }} />
                </button>
              </center>
            </div>
          </div>
          <div className="user-table">
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                {student === true ? (
                  <th>Enrollment No.</th>
                ) : (
                  <th>Faculty ID</th>
                )}
                <th>Department</th>
                <th>College</th>
                {student && <th>Semester</th>}
                {!student && <th>Designation</th>}
                <th>Profile</th>
              </tr>
              {data.map((user) => {
                return (
                  <tr key={srno++}>
                    <td>{srno}</td>
                    <td>{user.name}</td>
                    {student === true ? (
                      <td>{user.enrollment_no}</td>
                    ) : (
                      <td>{user.faculty_id}</td>
                    )}
                    <td>{user.department}</td>
                    <td>{user.college}</td>
                    {student && <td>{user.current_semester}</td>}
                    {!student && <td>{user.position}</td>}
                    <td id="table-actions">
                      <Link to={`/admin/users/student/${user.enrollment_no}`}>
                        <button className="view">View</button>
                      </Link>
                    </td>
                  </tr>
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

export default AdminUsers;
