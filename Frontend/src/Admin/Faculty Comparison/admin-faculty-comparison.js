import React, { useState, useEffect } from "react";
import "../CSS/admin-faculty-comparison.css";
// import { Faculties } from "../Data/faculty-info";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import "../CSS/admin.css";
import axios from "axios";

function AdminFacultyComparison() {
  const [faculties, setFaculties] = useState([]);
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");

  useEffect(() => {
    const obj = {college: college, department: department};
    const fetchData = async() => {
      await axios.post("http://localhost:8000/api/admin/show-comparision",obj)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setFaculties(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    fetchData();
  },[])
  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-faculty-comparison-page">
          <div className="faculty-filter">
            <h2>Faculty Comparison</h2>
            <div>
              <span>
                College :{" "}
                <select onChange={(e) => setCollege(e.target.value)}>
                  <option value="" selected >
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
          </div>
          <div className="comparison-profiles">
            {faculties.map((faculty) => {
              return (
                <div className="profile-card">
                  <img
                    width={200}
                    src={
                      faculty.gender === "Male"
                        ? "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                        : "https://media.istockphoto.com/id/1331335536/pt/vetorial/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=teiINyrppo9qeWiCv6k2RnRC3KHfoQYTQKLam252N3Q="
                    }
                  />
                  <div>
                    <center>
                      <h3 color="black">{faculty.name}</h3>
                      <p style={{ color: "gray", fontSize: "14px" }}>
                        {faculty.qualification}
                      </p>
                    </center>
                  </div>

                  <table>
                    <tr>
                      <td>
                        <b>Students Certified : </b>
                      </td>
                      <td>{faculty.students.length}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Events Coordinated : </b>
                      </td>
                      <td>{faculty.counter}</td>
                    </tr>
                    {/* <tr>
                      <td>
                        <b>Years of Experience : </b>
                      </td>
                      <td>{10}</td>
                    </tr> */}
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminFacultyComparison;
