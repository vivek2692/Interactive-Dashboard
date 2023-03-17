import React, { useState } from "react";
import "../CSS/student-coursera-form.css";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";
import "../CSS/student.css";


function StudentExtracurricular() {
  return (
    <div className="student-page">
      {/* <Router> */}
        <StudentNavBar />
        <StudentTopBar />
    <div>
    <div className="coursera-form-page">
      <div className="coursera-form">
        <h2>Extracurricular Achievements</h2>
        <div className="coursera-upload-certi">
          <table>
            <tr>
              <td>Event name : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Event Organizer : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Level of Event : </td>
              <td>
                <select>
                  <option value="" selected>
                    --Select Event Level--
                  </option>
                  <option value="College Level">College Level</option>
                  <option value="University Level">University Level</option>
                  <option value="State Level">State Level</option>
                  <option value="National Level">National Level</option>
                  <option value="International Level">
                    International Level
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Position : </td>
              <td>
                <select>
                  <option value="" selected>
                    --Select Position--
                  </option>
                  <option value="Winner">Winner</option>
                  <option value="Runner-up">Runner-up</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Event Description : </td>
              <td>
                <textarea cols="30" rows="4" />
              </td>
            </tr>
            <tr>
              <td>Certificate URL : </td>
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

export default StudentExtracurricular;
