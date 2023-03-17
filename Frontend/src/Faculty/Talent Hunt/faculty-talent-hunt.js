import React, { useState } from "react";
import "../CSS/faculty-talent-hunt.css";
import "../CSS/faculty.css";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function FacultyTalentHunt() {
  const [criteria, setCriteria] = useState("Skills");
  const [skillhobbyInp, setSkillHobbyInp] = useState("");
  const [search, setSearch] = useState(false);
  const [users, setUsers] = useState([]);

  const skills = skillhobbyInp.split(",");

  const handleClick = async () => {
    const obj = { skills: skills };

    await axios
      .post("http://localhost:8000/api/faculty/search-skill", obj)
      .then((res) => {
        const data = res.data;
        console.log(data.data);
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <button
                    className="searchBtn"
                    onClick={() => {
                      setSearch(true);
                      handleClick();
                    }}
                  >
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
                      {/* <th>Skills</th>
                      <th>Hobbies</th> */}
                    </tr>
                    {users.map((user) => {
                      return (
                        <>
<<<<<<< Updated upstream
                          <tr>{user.skill}</tr>
                          {user.students.map((std) => {
                            return (
                              <tr>
                                <td>{srno++}</td>
                                <td>{std.name}</td>
                                <td>{std.enrollment_no}</td>
                                <td>{std.contact_no}</td>
                                {/* <td>Documentation, Web Development</td>
=======
                        <tr><center>{user.skill}</center></tr>
                        {user.students.map((std) => {return <tr>
                          <td>{srno++}</td>
                          <td>{std.name}</td>
                          <td>{std.enrollment_no}</td>
                          <td>{std.contact_no}</td>
                          {/* <td>Documentation, Web Development</td>
>>>>>>> Stashed changes
                          <td>None</td> */}
                              </tr>
                            );
                          })}
                        </>
                      );
                    })}
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
