import React, { useState, PureComponent, useEffect } from "react";
import { Chart } from "react-google-charts";
import "../CSS/admin-home.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";

function AdminHome() {
  const [college, setCollege] = useState("ALL");
  const [college1, setCollege1] = useState("ALL");
  const [department, setDepartment] = useState("CP");

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/api/admin/stats")
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const data1 = [
    ["College", "No. of Students"],
    ["GCET", data.gcet_students],
    ["ADIT", data.adit_students],
    ["MBIT", data.mbit_students],
  ];

  const options1 = {
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
      5: { color: "#050a30" },
      6: { color: "#41729f" },
      7: { color: "#d4f1f4" },
    },
    height: 350,
    width: 350,
  };

  const data2 = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.total_placements],
  ];

  const all_data = [
    ["Department", "No. of Students"],
    ["CP", data.all_cp],
    ["IT", data.all_it],
    ["EC", data.all_ec],
    ["EE", data.all_ee],
    ["ME", data.all_me],
    ["MC", data.all_mc],
    ["CH", data.all_ch],
  ];
  const gcet_data = [
    ["Department", "No. of Students"],
    ["CP", data.gcet_cp],
    ["IT", data.gcet_it],
    ["EC", data.gcet_ec],
    ["EE", data.gcet_ee],
    ["ME", data.gcet_me],
    ["MC", data.gcet_mc],
    ["CH", data.gcet_ch],
  ];
  const mbit_data = [
    ["Department", "No. of Students"],
    ["CP", data.mbit_cp],
    ["IT", data.mbit_it],
  ];
  const adit_data = [
    ["Department", "No. of Students"],
    ["CP", data.adit_cp],
    ["IT", data.adit_it],
    ["EC", data.adit_ec],
    ["EE", data.adit_ee],
    ["ME", data.adit_me],
    ["MC", data.adit_mc],
    ["CH", data.adit_ch],
  ];

  const gcet_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.gcet_placement],
  ];
  const mbit_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.mbit_placement],
  ];
  const adit_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.adit_placement],
  ];

  const cp_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.cp_placement],
  ];
  const it_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.it_placement],
  ];
  const ec_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.ec_placement],
  ];
  const ee_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.ee_placement],
  ];
  const me_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.me_placement],
  ];
  const mc_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.mc_placement],
  ];
  const ch_placement_data = [
    ["Year", "Placements"],
    ["2020", 0],
    ["2021", 0],
    ["2022", 0],
    ["2023", data.ch_placement],
  ];

  const options2 = {
    title: "College Placements",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
  };

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
              <div style={{ margin: "30px" }}>
                <Chart chartType="PieChart" data={data1} options={options1} />
                {/* <VictoryPie
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
            /> */}
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
                    <p>Total Students : {data.total_students}</p>
                  </div>
                  <div className="org-info">
                    <p>Total Programs Offered : {data.total_departments}</p>
                  </div>
                </div>
                <div>
                  <div className="org-info">
                    <p>Total Faculties : {data.total_faculties}</p>
                  </div>
                  <div className="org-info">
                    <p>No. of Placements : {data.total_placements}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clg-students">
            <h2>College Wise Distribution</h2>
            <div className="clg-graphs">
              <div className="graph">
                <div className="clg-dropdown">
                  <span>
                    College :{" "}
                    <select onChange={(e) => setCollege(e.target.value)}>
                      <option value="ALL" selected>
                        All
                      </option>
                      <option value="GCET">GCET</option>
                      <option value="ADIT">ADIT</option>
                      <option value="MBIT">MBIT</option>
                    </select>
                  </span>
                </div>
                {college === "ALL" && (
                  <div>
                    <Chart
                      chartType="PieChart"
                      data={all_data}
                      options={options1}
                    />
                  </div>
                )}
                {college === "GCET" && (
                  <div>
                    <Chart
                      chartType="PieChart"
                      data={gcet_data}
                      options={options1}
                    />
                  </div>
                )}
                {college === "MBIT" && (
                  <div>
                    <Chart
                      chartType="PieChart"
                      data={mbit_data}
                      options={options1}
                    />
                  </div>
                )}
                {college === "ADIT" && (
                  <div>
                    <Chart
                      chartType="PieChart"
                      data={adit_data}
                      options={options1}
                    />
                  </div>
                )}
              </div>
              <div className="stats">
                <div>
                  <div className="org-info2">
                    <p>PhD Faculties : {data.total_phd}</p>
                  </div>
                  <div className="org-info2">
                    <p>PhD Pursuing Faculties : {data.total_pur_phd}</p>
                  </div>
                </div>
                <div>
                  <div className="org-info2">
                    <p>Master's Faculties : {data.total_mtech}</p>
                  </div>
                  <div className="org-info2">
                    <p>Total Faculties : {data.total_faculties}</p>
                  </div>
                </div>
                <div>
                  <div className="org-info2">
                    <p>Male Students : {data.male_students}</p>
                  </div>
                  <div className="org-info2">
                    <p>Female Students : {data.female_students}</p>
                  </div>
                </div>
              </div>
              <div className="graph">
                <div className="clg-dropdown">
                  <span>
                    Department :{" "}
                    <select onChange={(e) => setDepartment(e.target.value)}>
                      <option value="All" selected>
                        All
                      </option>
                      <option value="CP">CP</option>
                      <option value="IT">IT</option>
                      <option value="CSD">CSD</option>
                      <option value="ME">ME</option>
                    </select>
                  </span>
                </div>
                <div>
                  <Chart chartType="PieChart" data={data1} options={options1} />
                </div>
              </div>
            </div>
          </div>
          <div className="placement-dtl" style={{ height: "600px" }}>
            <h2>Placement Details</h2>
            <div className="placement-graphs">
              <div className="clg-placement">
                <div className="clg-dropdown">
                  <span>
                    College :{" "}
                    <select onChange={(e) => setCollege1(e.target.value)}>
                      <option value="All" selected>
                        All
                      </option>
                      <option value="GCET">GCET</option>
                      <option value="ADIT">ADIT</option>
                      <option value="MBIT">MBIT</option>
                    </select>
                  </span>
                </div>
                <div>
                  {college1 === "ALL" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={data2}
                      options={options2}
                    />
                  )}
                  {college1 === "GCET" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={gcet_placement_data}
                      options={options2}
                    />
                  )}
                  {college1 === "MBIT" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={mbit_placement_data}
                      options={options2}
                    />
                  )}
                  {college1 === "ADIT" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={adit_placement_data}
                      options={options2}
                    />
                  )}
                </div>
              </div>
              <div className="clg-placement">
                <div className="clg-dropdown">
                  <span>
                    Department :{" "}
                    <select onChange={(e) => setDepartment(e.target.value)}>
                      <option value="CP" selected>
                        CP
                      </option>
                      <option value="IT">IT</option>
                      <option value="EC">EC</option>
                      <option value="ME">ME</option>
                      <option value="MC">MC</option>
                      <option value="EE">EE</option>
                      <option value="CH">CH</option>
                    </select>
                  </span>
                </div>
                <div>
                  {department === "CP" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={cp_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "IT" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={it_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "EC" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={ec_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "EE" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={ee_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "ME" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={me_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "MC" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={mc_placement_data}
                      options={options2}
                    />
                  )}
                  {department === "Ch" && (
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={ch_placement_data}
                      options={options2}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default AdminHome;
