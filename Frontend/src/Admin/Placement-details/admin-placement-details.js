import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/admin-placement-details.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from 'axios';
//import MaterialReactTable from "material-react-table";

function AdminPlacement() {
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async() => {
      await axios.get(`http://localhost:8000/api/faculty/placement/all-placements?college=${college}&department=${department}&placement_year=${year}`)
      .then((res) => {
        const data = res.data.data;
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    fetchData();
  },[college, department, year]);

  const handleSearch = async(e) => {
    setSearch(e.target.value);
    await axios.get(`http://localhost:8000/api/faculty/placement/search?enrollment_no=${e.target.value}`)
    .then((res) => {
      const data = res.data.data;
      setUsers(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  let srno = 1;
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-placement">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>Placement Details</h2>
          <div className="placement-filter">
            <form>
              <div>
                <span>
                  College :{" "}
                  <select onChange={(e) => setCollege(e.target.value)}>
                    <option value="" disabled selected>
                      --Select College--
                    </option>
                    <option value="">ALL</option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select>
                </span>
                <span>
                  Department :{" "}
                  <select onChange={(e) => setDepartment(e.target.value)}>
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
                <span>
                  Year :{" "}
                  <select onChange={(e) => setYear(e.target.value)}>
                    <option value="" disabled selected>
                      --Select Year--
                    </option>
                    <option value="">ALL</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </span>
              </div>
            </form>
            <div>
              <center>
                <input
                  type="text"
                  placeholder="Search by Name or Enrollment no."
                  onChange={handleSearch}
                />
                <button className="search">
                  <TfiSearch style={{ color: "white" }} />
                </button>
              </center>
            </div>
          </div>
          <div className="placement-table">
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>College</th>
                <th>Package</th>
                <th>Company</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
              {users.map((user) => {
                return (
                  <tr key={srno++}>
                    <td>{srno}</td>
                    <td>{user.student_name}</td>
                    <td>{user.enrollment_no}</td>
                    <td>{user.department}</td>
                    <td>{user.college}</td>
                    <td>{user.package}</td>
                    <td>{user.company}</td>
                    <td>{user.placement_year}</td>
                    <td id="table-actions">
                      <Link
                        to={`/admin/placement-details/student/${user.enrollment_no}`}
                      >
                        <button className="view">
                          <center>Modify</center>
                        </button>
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

export default AdminPlacement;
