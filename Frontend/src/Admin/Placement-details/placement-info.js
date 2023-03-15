import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { Users } from "../../Data/user-info";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import "../CSS/admin.css";
import axios from "axios";

function ViewPlacement() {
  const { id } = useParams();

  let key = 1;
  // const student = Users.find((user) => user.enroll === parseInt(id));
  const [year, setYear] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [Package, setPackage] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState();
  const [compState, setCompState] = useState("");
  const [student, setStudent] = useState([]);
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    const fetchStd = async () => {
      await axios
        .get(`http://localhost:8000/api/faculty/placement/placement-info/${id}`)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setStudent(data);
          setYear(data.placement_year);
          setCollege(data.college);
          setDepartment(data.department);
          setPackage(data.package);
          setCompany(data.company);
          setDuration(data.contract_duration);
          setCompState(data.company_state);
          setIsExist(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStd();
  }, []);

  const handleUpdate = async () => {
    // setIsExist(false);
    const obj = {
      placement_year: year,
      college: college,
      department: department,
      package: Package,
      company: company,
      contract_duration: duration,
      company_state: compState
    };
    await axios
      .patch(
        `http://localhost:8000/api/faculty/placement/update-students/${id}`,
        obj
      )
      .then((res) => {
        const data = res.data.data;
        setStudent(data);
        setYear(data.placement_year);
        setCollege(data.college);
        setDepartment(data.department);
        setPackage(data.package);
        setCompany(data.company);
        setDuration(data.contract_duration);
        setCompState(data.company_state);
        setIsExist(true);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        {isExist && (
          <div className="student-info-page">
            <div className="stud-dtl">
              {/* <div> */}
              <div className="info-container">
                <img
                  width={250}
                  src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                />
                <h3 color="black">{student.student_name}</h3>
                <p color="gray">{student.enrollment_no}</p>
              </div>
              <div className="info-container">
                <h2>Personal Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Name : </td>
                    <td>{student.student_name}</td>
                  </tr>
                  <tr>
                    <td>Email : </td>
                    <td>{student.student_email}</td>
                  </tr>
                  <tr>
                    <td>Mobile no. : </td>
                    <td>{student.mobile_number}</td>
                  </tr>
                  <tr>
                    <td>Gender : </td>
                    <td>{student.gender}</td>
                  </tr>
                  <tr>
                    <td>Enrollment no. : </td>
                    <td>{student.enrollment_no}</td>
                  </tr>
                  <tr>
                    <td>Address : </td>
                    <td>{student.student_address}</td>
                  </tr>
                  <tr>
                    <td>State : </td>
                    <td>{student.state}</td>
                  </tr>
                </table>
              </div>
              {/* </div> */}
              {/* <div> */}
              <div className="info-container" style={{ height: "70vh" }}>
                <h2>Placement Details</h2>
                <table className="info-table">
                  <tr>
                    <td>Placement Year : </td>
                    <td>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option value="">--Select Year--</option>
                        <option value={2024}>2024</option>
                        <option value={2023}>2023</option>
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                        <option value={2018}>2018</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>College : </td>
                    <td>
                      <select
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      >
                        <option value="">--Select College--</option>
                        <option value="GCET">GCET</option>
                        <option value="ADIT">ADIT</option>
                        <option value="MBIT">MBIT</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Department : </td>
                    <td>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="">--Select Department--</option>
                        <option value="CP">CP</option>
                        <option value="IT">IT</option>
                        <option value="ME">ME</option>
                        <option value="MC">MC</option>
                        <option value="CH">CH</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Package : </td>
                    <td>
                      <input
                        type="text"
                        value={Package}
                        onChange={(e) => setPackage(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Company : </td>
                    <td>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Contract Duration(in years) : </td>
                    <td>
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Company State : </td>
                    <td>
                      <select
                        name="states"
                        value={compState}
                        onChange={(e) => setCompState(e.target.value)}
                      >
                        <option value="">--Select State--</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Rajasthan">Rajasthan</option>
                      </select>
                    </td>
                  </tr>
                </table>
                <center>
                  <button
                    className="multistep-form-btn"
                    onClick={() => {
                      setCollege("");
                      setCompState("");
                      setCompany("");
                      setDepartment("");
                      setDuration("");
                      setPackage("");
                      setYear("");
                    }}
                  >
                    Clear
                  </button>
                  <button className="multistep-form-btn" onClick={handleUpdate}>
                    Save
                  </button>
                </center>
              </div>
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPlacement;
