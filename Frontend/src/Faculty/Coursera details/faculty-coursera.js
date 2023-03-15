import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import "../CSS/faculty-coursera.css";
//import MaterialReactTable from "material-react-table";

function FacultyCoursera() {
  const [student, setStudent] = useState(true);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [more, setMoreDetails] = useState(false);
  const [Id, setID] = useState("");

  let srno = 1;
  return (
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
                <select>
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
            <input type="text" placeholder="Search by Name or Enrollment no." />
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
            <th>Semester</th>
            <th>Action</th>
          </tr>
          {Users.map((user) => {
            return (
              <>
                <tr key={srno++} style={{ backgroundColor: "#c2d9e8" }}>
                  <td>{srno}</td>
                  <td>
                    <center>{user.name}</center>
                  </td>
                  <td>
                    <center>{user.enroll}</center>
                  </td>
                  <td>
                    <center>{user.department}</center>
                  </td>
                  <td>
                    <center>{user.college}</center>
                  </td>
                  <td>
                    <center>{user.semester}</center>
                  </td>
                  <td id="table-actions">
                    <button
                      className="view"
                      onClick={() => {
                        setMoreDetails(!more);
                        setID(user.enroll);
                      }}
                    >
                      <center>
                        <span>More Details</span>
                        <span>
                          {more && user.enroll === Id ? (
                            <BiChevronUp style={{ marginLeft: "4px" }} />
                          ) : (
                            <BiChevronDown style={{ marginLeft: "4px" }} />
                          )}
                        </span>
                      </center>
                    </button>
                  </td>
                </tr>
                {more && user.enroll === Id && (
                  <tr style={{ backgroundColor: "#e9eef2" }}>
                    <td colSpan={7}>
                      <center>Hii</center>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </table>
        {/* <MaterialReactTable columns={columns} data={Users} /> */}
      </div>
    </div>
  );
}

export default FacultyCoursera;
