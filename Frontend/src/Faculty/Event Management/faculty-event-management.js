import React, { useState } from "react";
import "../CSS/faculty-event-management.css";
import { Events } from "../../Data/event";

function FacultyEventManagement() {
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  return (
    <div className="faculty-event-management-page">
      <div className="event-management">
        <h2>Upcoming Event Form</h2>
        <div className="event-form">
          <table>
            <tr>
              <td>Event name : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Event Description : </td>
              <td>
                <textarea cols="30" rows="4" />
              </td>
            </tr>
            <tr>
              <td>Volunteering Skills Required : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Volunteering Form URL : </td>
              <td>
                <input type="url" />
              </td>
            </tr>
            <tr>
              <td>Event Coordinator : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Coordinator Contact no. : </td>
              <td>
                <input type="number" />
              </td>
            </tr>
            <tr>
              <td>Coordinator Email : </td>
              <td>
                <input type="email" />
              </td>
            </tr>
          </table>
          <button className="multistep-form-btn">Submit</button>
        </div>
      </div>
      <div className="past-registered-events">
        <h2>Past Registered Events</h2>
      </div>
      {Events.map((event) => {
        return (
          <div className="event past-registered-events">
            <table>
              <tr>
                <td>Event name : </td>
                <td>{event.name}</td>
              </tr>
              <tr>
                <td>Event Description : </td>
                <td>{event.description}</td>
              </tr>
              <tr>
                <td>Volunteering Skills Required : </td>
                <td>{event.skills}</td>
              </tr>
              <tr>
                <td>Volunteering Form URL : </td>
                <td>
                  <a href={`${event.link}`} target="_blank">
                    {event.link}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Event Coordinator : </td>
                <td>{event.coordinator}</td>
              </tr>
              <tr>
                <td>Coordinator Contact no. : </td>
                <td>{event.contactno}</td>
              </tr>
              <tr>
                <td>Coordinator Email : </td>
                <td>{event.email}</td>
              </tr>
            </table>
            <button className="delete-event">Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default FacultyEventManagement;
