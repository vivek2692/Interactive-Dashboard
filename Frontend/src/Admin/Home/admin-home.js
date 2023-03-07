import React from "react";
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

function AdminHome() {
  const myData = [
    { angle: 10, color: "yellow", label: "MBIT" },
    { angle: 50, color: "cyan", label: "ADIT" },
    { angle: 60, color: "pink", label: "GCET" },
  ];

  return (
    <div className="admin-home">
      <div className="uni-students">
        <h2>Organization Overview</h2>
        <div>
          <div style={{ zIndex: "-1" }}>
            <VictoryPie
              data={[
                { x: "GCET", y: 10 },
                { x: "ADIT", y: 130 },
                { x: "MBIT", y: 90 },
              ]}
              labelComponent={<VictoryLabel dy={30} />}
              colorScale={["#60b2f0", "#c2d9e8", "#027d8d"]}
              //labels={({ datum }) => `${datum.x}:${datum.y}`}
              height={350}
              width={350}
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
          <h2>Department wise Distribution</h2>
        </div>
        <div className="clg-graphs">
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
            <table>
              <tr>
                <td>1st year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>2nd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>3rd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>4th year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Faculties : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Departments : </td>
                <td>50</td>
              </tr>
            </table>
          </div>
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
            <table>
              <tr>
                <td>1st year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>2nd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>3rd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>4th year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Faculties : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Departments : </td>
                <td>50</td>
              </tr>
            </table>
          </div>
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
            <table>
              <tr>
                <td>1st year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>2nd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>3rd year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>4th year students : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Faculties : </td>
                <td>50</td>
              </tr>
              <tr>
                <td>Total Departments : </td>
                <td>50</td>
              </tr>
            </table>
          </div>
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
          <hr />
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
          <hr />
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
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
