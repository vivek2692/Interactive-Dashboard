import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/faculty-placement-details.css";
//import MaterialReactTable from "material-react-table";

function FacultyPlacement() {
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  let srno = 1;
  return (
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
          {/* <div>
            <span>
              Role :{" "}
              <select onChange={() => setStudent(!student)}>
                <option value="student" selected>
                  Student
                </option>
                <option value="faculty">Faculty</option>
              </select>
            </span>
          </div> */}
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
            <span>
              Year :{" "}
              <select>
                <option value="" selected>
                  --Select Year--
                </option>
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
            <input type="text" placeholder="Search by Name or Enrollment no." />
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
          {Users.map((user) => {
            return (
              <tr key={srno++}>
                <td>{srno}</td>
                <td>{user.name}</td>
                <td>{user.enroll}</td>
                <td>{user.department}</td>
                <td>{user.college}</td>
                <td>{user.package}</td>
                <td>{user.company}</td>
                <td>{user.year}</td>
                <td id="table-actions">
                  <Link
                    to={`/faculty/placement-details/student/${user.enroll}`}
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
  );
}

export default FacultyPlacement;
