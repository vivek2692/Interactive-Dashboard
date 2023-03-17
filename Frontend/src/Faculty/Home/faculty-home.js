import React, { useState, useEffect } from "react";
import {
  RadialChart,
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  DiscreteColorLegend,
} from "react-vis";
import { VictoryPie, VictoryLabel, VictoryBar } from "victory";
//import ReactEcharts from "echarts-for-react";
//import { ResponsivePie } from "nivo/lib/components/charts/pie";
import "../CSS/faculty-home.css"; //same classes as admin home
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function FacultyHome() {
  const dpt = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);

  const [college, setCollege] = useState(clg);
  const [department, setDepartment] = useState(dpt);

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const obj = { college: college, department: department };
      axios.post("http://localhost:8000/api/faculty/stats", obj).then((res) => {
        const data = res;
        setStats(data.data.data);
        console.log(data.data.data);
      });
    };

    fetchStats();
  }, []);

  const myData = [
    { angle: stats.first_year, color: "blue", label: "1st" },
    { angle: stats.second_year + 4, color: "cyan", label: "2nd" },
    { angle: stats.third_year, color: "pink", label: "3rd" },
    { angle: stats.fourth_year + 6, color: "orange", label: "4th" },
  ];

  return (
    <div className="faculty-page">
      <FacultyNavBar />
      <FacultyTopBar />
      <div className="admin-home">
        <div className="uni-students">
          <h2>Institution Overview</h2>
          <div>
            <div style={{ zIndex: "-1" }}>
              <div className="clg-graphs">
                {college === "GCET" && (
                  <div className="graph">
                    <VictoryPie
                      data={[
                        { x: "CP", y: stats.cp },
                        { x: "IT", y: stats.it+3 },
                        { x: "EC", y: stats.ec+2 },
                        { x: "EE", y: stats.ee },
                        { x: "ME", y: stats.me },
                        { x: "CH", y: stats.ch+1 },
                        { x: "CL", y: stats.cl },
                      ]}
                      labelComponent={<VictoryLabel dy={30} />}
                      colorScale={["blue", "cyan", "pink", "yellow", "black", "green", "orange"]}
                      labels={({ datum }) => `${datum.x}:${datum.y}`}
                      height={350}
                      width={430}
                    />
                    <center>
                      <h3>GCET</h3>
                    </center>
                  </div>
                )}
                {college === "ADIT" && (
                  <div className="graph">
                    <RadialChart
                      data={[
                        { x: "CP", y: stats.cp },
                        { x: "IT", y: stats.it+3 },
                        { x: "EC", y: stats.ec+2 },
                        { x: "EE", y: stats.ee },
                        { x: "ME", y: stats.me },
                        { x: "CH", y: stats.ch+1 },
                        { x: "CL", y: stats.cl },
                      ]}
                      animation={{ duration: 400 }}
                      height={250}
                      width={250}
                    />
                    <center>
                      <h3>ADIT</h3>
                    </center>
                  </div>
                )}
                {college === "MBIT" && (
                  <div className="graph">
                    <RadialChart
                      data={[
                        { x: "CP", y: stats.cp },
                        { x: "IT", y: stats.it+3 },
                      ]}
                      animation={{ duration: 400 }}
                      height={250}
                      width={250}
                    />
                    <center>
                      <h3>MBIT</h3>
                    </center>
                  </div>
                )}
              </div>
            </div>

            {/* <div id="clg-dropdown">
            <span>
              College :{" "}
              <select onChange={(e) => setCollege(e.target.value)}>
                <option value="GCET" selected>
                  GCET
                </option>
                <option value="ADIT">ADIT</option>
                <option value="MBIT">MBIT</option>
              </select>
            </span>
          </div> */}
            <div>
              <div>
                <div className="org-info">
                  <p>Total Students : {stats.total_students}</p>
                </div>
                <div className="org-info">
                  <p>Total Fields Offered : {college === "MBIT" ? 2 : 7}</p>
                </div>
              </div>
              <div>
                <div className="org-info">
                  <p>Total Faculties : {stats.total_faculties} </p>
                </div>
                <div className="org-info">
                  <p>No. of Placements in last year : 100</p>
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
            {department === "CP" && (
              <div className="graph">
                <RadialChart
                  data={myData}
                  animation={{ duration: 400 }}
                  showLabels={true}
                    height={250}
                    width={250}
                    labelsStyle={{
                      fill: "black",
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    }}
                />
                <center>
                  <h3>CP</h3>
                  <table>
                    <tr>
                      <td>1st year students : </td>
                      <td>{stats.first_year}</td>
                    </tr>
                    <tr>
                      <td>2nd year students : </td>
                      <td>{stats.second_year}</td>
                    </tr>
                    <tr>
                      <td>3rd year students : </td>
                      <td>{stats.third_year}</td>
                    </tr>
                    <tr>
                      <td>4th year students : </td>
                      <td>{stats.fourth_year}</td>
                    </tr>
                    <tr>
                      <td>Total Faculties : </td>
                      <td>{stats.dept_faculties}</td>
                    </tr>
                  </table>
                </center>
              </div>
            )}
            {department === "IT" && (
              <div className="graph">
                <RadialChart
                  data={myData}
                  animation={{ duration: 400 }}
                  showLabels={true}
                    height={250}
                    width={250}
                    labelsStyle={{
                      fill: "black",
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    }}
                />
                <center>
                  <h3>IT</h3>
                  <table>
                    <tr>
                      <td>1st year students : </td>
                      <td>{stats.first_year}</td>
                    </tr>
                    <tr>
                      <td>2nd year students : </td>
                      <td>{stats.second_year}</td>
                    </tr>
                    <tr>
                      <td>3rd year students : </td>
                      <td>{stats.third_year}</td>
                    </tr>
                    <tr>
                      <td>4th year students : </td>
                      <td>{stats.fourth_year}</td>
                    </tr>
                    <tr>
                      <td>Total Faculties : </td>
                      <td>{stats.dept_faculties}</td>
                    </tr>
                  </table>
                </center>
              </div>
            )}
            {department === "EC" && (
              <div className="graph">
                <RadialChart
                  data={myData}
                  animation={{ duration: 400 }}
                  showLabels={true}
                    height={250}
                    width={250}
                    labelsStyle={{
                      fill: "black",
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    }}
                />
                <center>
                  <h3>EC</h3>
                  <table>
                    <tr>
                      <td>1st year students : </td>
                      <td>{stats.first_year}</td>
                    </tr>
                    <tr>
                      <td>2nd year students : </td>
                      <td>{stats.second_year}</td>
                    </tr>
                    <tr>
                      <td>3rd year students : </td>
                      <td>{stats.third_year}</td>
                    </tr>
                    <tr>
                      <td>4th year students : </td>
                      <td>{stats.fourth_year}</td>
                    </tr>
                    <tr>
                      <td>Total Faculties : </td>
                      <td>{stats.dept_faculties}</td>
                    </tr>
                  </table>
                </center>
              </div>
            )}
          </div>
        </div>
        <div className="placement-dtl">
          <h2>Placement Details</h2>
          <div>
            <div className="clg-placements">
              <XYPlot xType="ordinal" stackBy="y" width={400} height={400}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                  color="#12939A"
                  data={[
                    { x: "2018", y: "85" },
                    { x: "2019", y: "75" },
                    { x: "2020", y: "95" },
                    { x: "2021", y: "110" },
                  ]}
                />
              </XYPlot>
              <h3>GCET</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHome;
