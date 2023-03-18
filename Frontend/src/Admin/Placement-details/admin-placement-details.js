import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/admin-placement-details.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function AdminPlacement() {
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(value)) {
        return prevSelectedCheckboxes.filter((val) => val !== value);
      } else {
        return [...prevSelectedCheckboxes, value];
      }
    });
  };
  const [selectedCheckboxes2, setSelectedCheckboxes2] = useState([]);

  const handleCheckboxChange2 = (event) => {
    const { value } = event.target;
    setSelectedCheckboxes2((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(value)) {
        return prevSelectedCheckboxes.filter((val) => val !== value);
      } else {
        return [...prevSelectedCheckboxes, value];
      }
    });
  };

  useEffect(() => {
    if (Number(from) > Number(to)) {
      let temp = from;
      setTo(from);
      setFrom(temp);
    }
    const obj = {
      department: selectedCheckboxes,
      college: selectedCheckboxes2,
      from: Number(from),
      to: Number(to),
    };
    const fetchData = async () => {
      await axios
        .post(`http://localhost:8000/api/admin/show-placement`, obj)
        .then((res) => {
          const data = res.data.data;
          setUsers(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [selectedCheckboxes, selectedCheckboxes2, from, to]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    await axios
      .get(
        `http://localhost:8000/api/faculty/placement/search?enrollment_no=${e.target.value}`
      )
      .then((res) => {
        const data = res.data.data;
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  College :
                  <span>
                    GCET :{" "}
                    <input
                      type="checkbox"
                      value="GCET"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes2.includes("GCET")}
                      onChange={handleCheckboxChange2}
                    />
                  </span>
                  <span>
                    MBIT :{" "}
                    <input
                      type="checkbox"
                      value="MBIT"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes2.includes("MBIT")}
                      onChange={handleCheckboxChange2}
                    />
                  </span>
                  <span>
                    ADIT :{" "}
                    <input
                      type="checkbox"
                      value="ADIT"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes2.includes("ADIT")}
                      onChange={handleCheckboxChange2}
                    />
                  </span>
                  {/* <select
                    multiple={2}
                    onChange={(e) => setCollege(e.target.value)}
                  >
                    <option value="" disabled selected>
                      --Select College--
                    </option>
                    <option value="">ALL</option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select> */}
                </span>
              </div>
              <div>
                <span>
                  Department :
                  {/* <select onChange={(e) => setDepartment(e.target.value)}>
                    <option value="" disabled selected>
                      --Select Department--
                    </option>
                    <option value="">ALL</option>
                    <option value="CP">CP</option>
                    <option value="IT">IT</option>
                    <option value="ME">ME</option>
                    <option value="MC">MC</option>
                    <option value="CH">CH</option>
                  </select> */}
                  <span>
                    CP :{" "}
                    <input
                      type="checkbox"
                      value="CP"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("CP")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    IT :{" "}
                    <input
                      type="checkbox"
                      value="IT"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("IT")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    EC :{" "}
                    <input
                      type="checkbox"
                      value="EC"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("EC")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    EE :{" "}
                    <input
                      type="checkbox"
                      value="EE"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("EE")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    ME :{" "}
                    <input
                      type="checkbox"
                      value="ME"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("ME")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    MC :{" "}
                    <input
                      type="checkbox"
                      value="MC"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("MC")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  <span>
                    CH :{" "}
                    <input
                      type="checkbox"
                      value="CH"
                      style={{
                        width: "24px",
                        position: "relative",
                        top: "10px",
                      }}
                      checked={selectedCheckboxes.includes("CH")}
                      onChange={handleCheckboxChange}
                    />
                  </span>
                </span>
              </div>
              <div>
                <span>
                  Year :
                  {/* <select onChange={(e) => setYear(e.target.value)}>
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
                  </select> */}
                  <span>
                    From{" "}
                    <select onChange={(e) => setFrom(e.target.value)}>
                      <option>--Select Year--</option>
                      <option value={2018}>2018</option>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                      <option value={2023}>2023</option>
                    </select>
                  </span>
                  <span>
                    To{" "}
                    <select onChange={(e) => setTo(e.target.value)}>
                      <option>--Select Year--</option>
                      <option value={2018}>{2018}</option>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                      <option value={2023}>2023</option>
                    </select>
                  </span>
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
