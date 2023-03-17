import React, { useState } from "react";
import "../CSS/student-coursera-form.css";
import "../CSS/student.css";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";


function StudentCompetitivePerformance() {
  return (
    <div className="student-page">
      {/* <Router> */}
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="coursera-form-page">
          <div className="coursera-form">
            <h2>Competitive Examination Achievements</h2>
            <div className="coursera-upload-certi">
              <table>
                <tr>
                  <td>Examination name : </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Examination Description : </td>
                  <td>
                    <textarea cols="30" rows="4" />
                  </td>
                </tr>
                <tr>
                  <td>Total Score : </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>Obtained Score : </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>Scorecard URL : </td>
                  <td>
                    <input type="url" />
                  </td>
                </tr>
              </table>

              <button className="multistep-form-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCompetitivePerformance;
