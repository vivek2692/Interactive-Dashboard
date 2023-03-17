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
import "../CSS/admin-home.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import "../CSS/admin.css";
import axios from "axios";

function AdminHome() {
  const [college, setCollege] = useState("ALL");
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      axios.get("http://localhost:8000/api/admin/stats").then((res) => {
        const data = res;
        setStats(data.data.data);
        console.log(data.data.data);
      });
    };

    fetchStats();
  }, []);

  const allData = [
    { angle: stats.all_first_year, color: "black", label: "1st" },
    { angle: stats.all_second_year, color: "cyan", label: "2nd" },
    { angle: stats.all_third_year, color: "pink", label: "3rd" },
    { angle: stats.all_fourth_year, color: "green", label: "4th" },
  ];

  const allDeptData = [
    { angle: stats.all_cp, color: "black", label: "CP" },
    { angle: stats.all_it, color: "cyan", label: "IT" },
    { angle: stats.all_ec, color: "pink", label: "EC" },
    { angle: stats.all_ee, color: "blue", label: "EE" },
    { angle: stats.all_me, color: "red", label: "ME" },
    { angle: stats.all_mc, color: "green", label: "MC" },
    { angle: stats.all_ch, color: "orange", label: "CH" },
  ];

  const gcetDeptData = [
    { angle: stats.gcet_cp, color: "black", label: "CP" },
    { angle: stats.gcet_it, color: "cyan", label: "IT" },
    { angle: stats.gcet_ec, color: "pink", label: "EC" },
    { angle: stats.gcet_ee, color: "blue", label: "EE" },
    { angle: stats.gcet_me, color: "red", label: "ME" },
    { angle: stats.gcet_mc, color: "green", label: "MC" },
    { angle: stats.gcet_ch, color: "orange", label: "CH" },
  ];

  const aditDeptData = [
    { angle: stats.adit_cp, color: "black", label: "CP" },
    { angle: stats.adit_it, color: "cyan", label: "IT" },
    { angle: stats.adit_ec, color: "pink", label: "EC" },
    { angle: stats.adit_ee, color: "blue", label: "EE" },
    { angle: stats.adit_me, color: "red", label: "ME" },
    { angle: stats.adit_mc, color: "green", label: "MC" },
    { angle: stats.adit_ch, color: "orange", label: "CH" },
  ];

  const mbitDeptData = [
    { angle: stats.mbit_cp, color: "black", label: "CP" },
    { angle: stats.mbit_it, color: "cyan", label: "IT" },
  ];

  const gcetData = [
    { angle: stats.gcet_first_year, color: "black", label: "1st" },
    { angle: stats.gcet_second_year, color: "cyan", label: "2nd" },
    { angle: stats.gcet_third_year, color: "pink", label: "3rd" },
    { angle: stats.gcet_fourth_year, color: "green", label: "4th" },
  ];

  const aditData = [
    { angle: stats.adit_first_year, color: "black", label: "1st" },
    { angle: stats.adit_second_year, color: "cyan", label: "2nd" },
    { angle: stats.adit_third_year, color: "pink", label: "3rd" },
    { angle: stats.adit_fourth_year, color: "green", label: "4th" },
  ];

  const mbitData = [
    { angle: stats.mbit_first_year, color: "black", label: "1st" },
    { angle: stats.mbit_second_year, color: "cyan", label: "2nd" },
    { angle: stats.mbit_third_year, color: "pink", label: "3rd" },
    { angle: stats.mbit_fourth_year, color: "green", label: "4th" },
  ];

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-home">
          <div className="uni-students">
            <h2>Organization Overview</h2>
            <div>
              <div style={{ zIndex: "-1" }}>
                <VictoryPie
                  data={[
                    { x: "GCET", y: stats.gcet_students },
                    { x: "ADIT", y: stats.adit_students },
                    { x: "MBIT", y: stats.mbit_students },
                  ]}
                  labelComponent={<VictoryLabel dy={30} />}
                  colorScale={["#60b2f0", "#c2d9e8", "#027d8d"]}
                  labels={({ datum }) => `${datum.x}:${datum.y}`}
                  height={350}
                  width={430}
                />
              </div>
              {/* <div>
            <RadialChart
              data={myData}
              height={250}
              width={250}
              colorType="literal"
            />
            <DiscreteColorLegend
              items={["MBIT", "ADIT", "GCET"]}
              orientation="vertical"
            />
          </div> */}
              <div id="clg-dropdown">
                <span>
                  College :{" "}
                  <select onChange={(e) => setCollege(e.target.value)}>
                    <option value="ALL" selected>
                      ALL
                    </option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select>
                </span>
              </div>
              <div>
                <div>
                  <div className="org-info">
                    <p>Total Students : {stats.total_students}</p>
                  </div>
                  <div className="org-info">
                    <p>Total Fields Offered : {stats.total_departments}</p>
                  </div>
                </div>
                <div>
                  <div className="org-info">
                    <p>Total Faculties : {stats.total_faculties}</p>
                  </div>
                  <div className="org-info">
                    <p>No. of Placements in last year : {stats.placement}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clg-students">
            <div>
              <h2>Department wise Distribution</h2>
            </div>
            <div className="clg-graphs">
              {college === "ALL" && (
                <>
                  <div className="graph">
                    <RadialChart
                      data={allDeptData}
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
                      <h3>ALL</h3>
                    </center>
                    <table>
                      <tr>
                        <td>CP Department : </td>
                        <td>{stats.all_cp}</td>
                      </tr>
                      <tr>
                        <td>IT Department : </td>
                        <td>{stats.all_it}</td>
                      </tr>
                      <tr>
                        <td>EC Department : </td>
                        <td>{stats.all_ec}</td>
                      </tr>
                      <tr>
                        <td>EE Department : </td>
                        <td>{stats.all_ee}</td>
                      </tr>
                      <tr>
                        <td>ME Department : </td>
                        <td>{stats.all_me}</td>
                      </tr>
                      <tr>
                        <td>MC Department : </td>
                        <td>{stats.all_mc}</td>
                      </tr>
                      <tr>
                        <td>CH Department : </td>
                        <td>{stats.all_ch}</td>
                      </tr>
                    </table>
                  </div>

                  <div className="graph">
                    <RadialChart
                      data={allData}
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
                      <h3>ALL</h3>
                    </center>
                    <table>
                      <tr>
                        <td>1st year students : </td>
                        <td>{stats.all_first_year}</td>
                      </tr>
                      <tr>
                        <td>2nd year students : </td>
                        <td>{stats.all_second_year}</td>
                      </tr>
                      <tr>
                        <td>3rd year students : </td>
                        <td>{stats.all_third_year}</td>
                      </tr>
                      <tr>
                        <td>4th year students : </td>
                        <td>{stats.all_fourth_year}</td>
                      </tr>
                      <tr>
                        <td>Total Faculties : </td>
                        <td>{stats.total_faculties}</td>
                      </tr>
                      <tr>
                        <td>Total Departments : </td>
                        <td>7</td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
              {college === "GCET" && (
                <>
                  <div className="graph">
                    <RadialChart
                      data={gcetDeptData}
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
                      <h3>GCET</h3>
                    </center>
                    <table>
                      <tr>
                        <td>CP Department : </td>
                        <td>{stats.gcet_cp}</td>
                      </tr>
                      <tr>
                        <td>IT Department : </td>
                        <td>{stats.gcet_it}</td>
                      </tr>
                      <tr>
                        <td>EC Department : </td>
                        <td>{stats.gcet_ec}</td>
                      </tr>
                      <tr>
                        <td>EE Department : </td>
                        <td>{stats.gcet_ee}</td>
                      </tr>
                      <tr>
                        <td>ME Department : </td>
                        <td>{stats.gcet_me}</td>
                      </tr>
                      <tr>
                        <td>MC Department : </td>
                        <td>{stats.gcet_mc}</td>
                      </tr>
                      <tr>
                        <td>CH Department : </td>
                        <td>{stats.gcet_ch}</td>
                      </tr>
                    </table>
                  </div>

                  <div className="graph">
                    <RadialChart
                      data={gcetData}
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
                      <h3>GCET</h3>
                    </center>
                    <table>
                      <tr>
                        <td>1st year students : </td>
                        <td>{stats.gcet_first_year}</td>
                      </tr>
                      <tr>
                        <td>2nd year students : </td>
                        <td>{stats.gcet_second_year}</td>
                      </tr>
                      <tr>
                        <td>3rd year students : </td>
                        <td>{stats.gcet_third_year}</td>
                      </tr>
                      <tr>
                        <td>4th year students : </td>
                        <td>{stats.gcet_fourth_year}</td>
                      </tr>
                      <tr>
                        <td>Total Faculties : </td>
                        <td>{stats.gcet_faculties}</td>
                      </tr>
                      <tr>
                        <td>Total Departments : </td>
                        <td>7</td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
              {college === "ADIT" && (
                <>
                  <div className="graph">
                    <RadialChart
                      data={aditDeptData}
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
                      <h3>ADIT</h3>
                    </center>
                    <table>
                      <tr>
                        <td>CP Department : </td>
                        <td>{stats.adit_cp}</td>
                      </tr>
                      <tr>
                        <td>IT Department : </td>
                        <td>{stats.adit_it}</td>
                      </tr>
                      <tr>
                        <td>EC Department : </td>
                        <td>{stats.adit_ec}</td>
                      </tr>
                      <tr>
                        <td>EE Department : </td>
                        <td>{stats.adit_ee}</td>
                      </tr>
                      <tr>
                        <td>ME Department : </td>
                        <td>{stats.adit_me}</td>
                      </tr>
                      <tr>
                        <td>MC Department : </td>
                        <td>{stats.adit_mc}</td>
                      </tr>
                      <tr>
                        <td>CH Department : </td>
                        <td>{stats.adit_ch}</td>
                      </tr>
                    </table>
                  </div>

                  <div className="graph">
                    <RadialChart
                      data={aditData}
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
                      <h3>ADIT</h3>
                    </center>
                    <table>
                      <tr>
                        <td>1st year students : </td>
                        <td>{stats.adit_first_year}</td>
                      </tr>
                      <tr>
                        <td>2nd year students : </td>
                        <td>{stats.adit_second_year}</td>
                      </tr>
                      <tr>
                        <td>3rd year students : </td>
                        <td>{stats.adit_third_year}</td>
                      </tr>
                      <tr>
                        <td>4th year students : </td>
                        <td>{stats.adit_fourth_year}</td>
                      </tr>
                      <tr>
                        <td>Total Faculties : </td>
                        <td>{stats.adit_faculties}</td>
                      </tr>
                      <tr>
                        <td>Total Departments : </td>
                        <td>7</td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
              {college === "MBIT" && (
                <>
                  <div className="graph">
                    <RadialChart
                      data={mbitDeptData}
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
                      <h3>MBIT</h3>
                    </center>
                    <table>
                      <tr>
                        <td>CP Department : </td>
                        <td>{stats.mbit_cp}</td>
                      </tr>
                      <tr>
                        <td>IT Department : </td>
                        <td>{stats.mbit_it}</td>
                      </tr>
                    </table>
                  </div>

                  <div className="graph">
                    <RadialChart
                      data={mbitData}
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
                      <h3>MBIT</h3>
                    </center>
                    <table>
                      <tr>
                        <td>1st year students : </td>
                        <td>{stats.mbit_first_year}</td>
                      </tr>
                      <tr>
                        <td>2nd year students : </td>
                        <td>{stats.mbit_second_year}</td>
                      </tr>
                      <tr>
                        <td>3rd year students : </td>
                        <td>{stats.mbit_third_year}</td>
                      </tr>
                      <tr>
                        <td>4th year students : </td>
                        <td>{stats.mbit_fourth_year}</td>
                      </tr>
                      <tr>
                        <td>Total Faculties : </td>
                        <td>{stats.mbit_faculties}</td>
                      </tr>
                      <tr>
                        <td>Total Departments : </td>
                        <td>2</td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="placement-dtl">
            <h2>Placement Details</h2>
            <div>
              {college === "ALL" && (
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
                        { x: "2021", y: "110" },
                      ]}
                    />
                  </XYPlot>
                  <h3>GCET</h3>
                </div>
              )}

              {college === "GCET" && (
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
              )}

              {college === "ADIT" && (
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
                  <h3>ADIT</h3>
                </div>
              )}

              {college === "MBIT" && (
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
                  <h3>MBIT</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminHome;
