import React, { useState } from "react";
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

function FacultyHome() {
  const [college, setCollege] = useState("GCET");
  const [department, setDepartment] = useState("CP");

  const myData = [
    { angle: 10, color: "yellow", label: "MBIT" },
    { angle: 50, color: "cyan", label: "ADIT" },
    { angle: 60, color: "pink", label: "GCET" },
  ];

  return (
    <div className="admin-home">
      <div className="uni-students">
        <h2>Institution Overview</h2>
        <div>
          <div style={{ zIndex: "-1" }}>
            <div className="clg-graphs">
              {college === "GCET" && (
                <div className="graph">
                  <RadialChart
                    data={myData}
                    animation={{ duration: 400 }}
                    height={250}
                    width={250}
                  />
                  <center>
                    <h3>GCET</h3>
                  </center>
                </div>
              )}
              {college === "ADIT" && (
                <div className="graph">
                  <RadialChart
                    data={myData}
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
                    data={myData}
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
                <p>Total Students : </p>
              </div>
              <div className="org-info">
                <p>Total Fields Offered : </p>
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
          {department === "CP" && (
            <div className="graph">
              <RadialChart
                data={myData}
                animation={{ duration: 400 }}
                height={250}
                width={250}
              />
              <center>
                <h3>CP</h3>
              </center>
            </div>
          )}
          {department === "IT" && (
            <div className="graph">
              <RadialChart
                data={myData}
                animation={{ duration: 400 }}
                height={250}
                width={250}
              />
              <center>
                <h3>CP</h3>
              </center>
            </div>
          )}
          {department === "CSD" && (
            <div className="graph">
              <RadialChart
                data={myData}
                animation={{ duration: 400 }}
                height={250}
                width={250}
              />
              <center>
                <h3>CP</h3>
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
  );
}

export default FacultyHome;
