import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/faculty-placement-details.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function FacultyPlacement() {
  const dept = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [college, setCollege] = useState(clg);
  const [department, setDepartment] = useState(dept);
  const [placementYear, setPlacementYear] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // console.log("Year", placementYear);

  useEffect(() => {
    const fetchData = async() => {
      // const obj = {college: college, department: department, placement_year: placementYear};
      // console.log(obj);
      await axios.get(`http://localhost:8000/api/faculty/placement/all-placements?college=${college}&department=${department}&placement_year=${placementYear}`)
      .then((res) => {
        const data = res.data.data;
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    fetchData();
  },[department, placementYear]);

  const handleSearch = async(e) => {
    setSearch(e.target.value);
    let obj = {college: college, department: department}
    await axios.post(`http://localhost:8000/api/faculty/placement/search-placement?enrollment_no=${e.target.value}`,obj)
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
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="faculty-placement">
        <div className="header-add-btn">
          <h2 style={{ color: "rgb(143, 143, 145)" }}>Placement Details</h2>
          <button
            className="multistep-form-btn"
            style={{ backgroundColor: "#3b7197" }}
          >
            Add Placements
          </button>
        </div>
        <div className="placement-filter">
          <form action="">
            <div>
              <span>
                Department :{" "}
                <select onChange={(e) => setDepartment(e.target.value)}>
                  <option value="" selected>
                    --Select Department--
                  </option>
                  <option value="CP">CP</option>
                  <option value="IT">IT</option>
                  {college !== "MBIT" && <option value="ME">ME</option>}
                  {college !== "MBIT" && <option value="MC">MC</option>}
                  {college !== "MBIT" && <option value="CH">CH</option>}
                  {college !== "MBIT" && <option value="EC">EC</option>}
                  {college !== "MBIT" && <option value="EE">EE</option>}
                </select>
              </span>
              <span>
                Year :{" "}
                <select onChange={(e) => setPlacementYear(e.target.value)}>
                  <option value="" selected>
                    --Select Year--
                  </option>
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
                placeholder="Search by Enrollment no."
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
                      to={`/faculty/placement-details/student/${user.enrollment_no}`}
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
  );
}

export default FacultyPlacement;
