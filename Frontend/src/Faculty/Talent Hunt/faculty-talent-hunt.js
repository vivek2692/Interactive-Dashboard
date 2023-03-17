import React, { useState } from "react";
import "../CSS/faculty-talent-hunt.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";

function FacultyTalentHunt() {
  const [criteria, setCriteria] = useState("Skills");
  const [skillhobbyInp, setSkillHobbyInp] = useState("");
  const [search, setSearch] = useState(false);
  let srno = 1;
  return (
    <div className="faculty-page">
      {/* <Router> */}
      <FacultyNavBar />
      <FacultyTopBar />
      <div>
        <div className="faculty-talent-hunt-page">
          <div className="talent-hunt">
            <h2>Talent Hunt</h2>
            <div className="talent-hunt-body">
              <div className="input-filter">
                <div>
                  <span>
                    Criteria :{" "}
                    <select
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value)}
                    >
                      <option value="Skills">Skills</option>
                      <option value="Hobbies">Hobbies</option>
                    </select>
                  </span>
                </div>
                <div>
                  {criteria === "Skills" && (
                    <span>
                      Skill :{" "}
                      <input
                        type="text"
                        value={skillhobbyInp}
                        onChange={(e) => setSkillHobbyInp(e.target.value)}
                      />
                    </span>
                  )}
                  {criteria === "Hobbies" && (
                    <span>
                      Hobby :{" "}
                      <input
                        type="text"
                        value={skillhobbyInp}
                        onChange={(e) => setSkillHobbyInp(e.target.value)}
                      />
                    </span>
                  )}
                  <button className="searchBtn" onClick={() => setSearch(true)}>
                    Search
                  </button>
                </div>
              </div>
              {search && (
                <div className="eligible-student-table">
                  <table border={1}>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Enrollment no.</th>
                      <th>Contact no.</th>
                      <th>Skills</th>
                      <th>Hobbies</th>
                    </tr>
                    <tr>
                      <td>{srno++}</td>
                      <td>Shrut Dalwadi</td>
                      <td>12002040501070</td>
                      <td>9913097745</td>
                      <td>Documentation, Web Development</td>
                      <td>None</td>
                    </tr>
                    <tr>
                      <td>{srno++}</td>
                      <td>Vivek Chauhan</td>
                      <td>12002040501079</td>
                      <td>9913012345</td>
                      <td>Web Development</td>
                      <td>None</td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyTalentHunt;
