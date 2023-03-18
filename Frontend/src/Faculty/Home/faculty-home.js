import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";
import "../CSS/faculty.css";
import "../CSS/faculty-home.css"; //same classes as admin home
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function FacultyHome() {
  const dept = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [college, setCollege] = useState(clg);
  const [department, setDepartment] = useState(dept);
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  const handleClick = async () => {
    const obj = { users: today };
    await axios
      .post("http://localhost:8000/api/faculty/sendWish", obj)
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let srno1 = 1;
  let srno2 = 1;
  let srno3 = 1;

  useEffect(() => {
    const fetchData = async () => {
      const obj = { college: clg, department: dept };
      await axios
        .post("http://localhost:8000/api/faculty/birthday", obj)
        .then((res) => {
          const data = res.data.data;
          console.log("data", data);
          setToday(data.today);
          setTomorrow(data.tommorow);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const data1 = [
    ["Task", "Hours per Day"],
    ["CP", 11],
    ["IT", 12],
    ["ME", 8],
    ["MC", 15],
    ["CH", 7],
  ];

  const options1 = {
    title: "CP Department",
    chartArea: {
      height: "95%",
      width: "95%",
    },
    slices: {
      0: { color: "#00008B" },
      1: { color: "#0020C2" },
      2: { color: "#2B60DE" },
      3: { color: "#357EC7" },
      4: { color: "#6698FF" },
    },
    height: 400,
    width: 400,
  };

  const data2 = [
    ["Year", "Placements"],
    ["2014", 250],
    ["2015", 263],
    ["2016", 225],
    ["2017", 278],
  ];

  const options2 = {
    chart: {
      title: "College Placements",
    },
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
  };

  return (
    <div className="faculty-page">
      {/* <Router> */}
      <FacultyNavBar />
      <FacultyTopBar />
      <div>
        <div className="admin-home">
          <div className="uni-students">
            <h2>Institution Overview</h2>
            <div>
              <div style={{ margin: "30px", height: "100%" }}>
                <Chart chartType="PieChart" data={data1} options={options1} />
              </div>
              <div>
                <div>
                  <div className="org-info">
                    <p>Total Students : </p>
                  </div>
                  <div className="org-info">
                    <p>Total Programs Offered : </p>
                  </div>
                </div>
                <div>
                  <div className="org-info">
                    <p>Total Faculties : </p>
                  </div>
                  <div className="org-info">
                    <p>No. of Placements in last year : </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clg-students">
            <div>
              <h2>Year wise Distribution</h2>
            </div>
            <div className="clg-graphs">
              <div className="graph">
                <div>
                  <Chart chartType="PieChart" data={data1} options={options1} />
                </div>
              </div>
              <div className="clg-placement">
                <div>
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data2}
                    options={options2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="birthdays">
            <div className="header-add-btn">
              <h2 style={{ color: "rgb(143, 143, 145)" }}>Today's Birthdays</h2>
              {/* <Link to="/faculty/students/add-student"> */}
              <button className="send-mail" onClick={handleClick}>
                Send Mail
              </button>
              {/* </Link> */}
            </div>
            <div className="birthday-table">
              <table>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Enrollment no.</th>
                  <th>Date Of Birth</th>
                  <th>Semester</th>
                </tr>
                {today.map((sub) => {
                  return (
                    <tr>
                      <td>{srno1++}</td>
                      <td>{sub.name}</td>
                      <td>{sub.enrollment_no}</td>
                      <td>{sub.birthday}</td>
                      <td>{sub.current_semester}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <br />
            <div className="header-add-btn">
              <h2>1 Day To Go</h2>
            </div>
            <div className="birthday-table">
              <table>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Enrollment no.</th>
                  <th>Date Of Birth</th>
                  <th>Semester</th>
                </tr>
                {tomorrow.map((sub) => {
                  return (
                    <tr>
                      <td>{srno1++}</td>
                      <td>{sub.name}</td>
                      <td>{sub.enrollment_no}</td>
                      <td>{sub.birthday}</td>
                      <td>{sub.current_semester}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHome;
