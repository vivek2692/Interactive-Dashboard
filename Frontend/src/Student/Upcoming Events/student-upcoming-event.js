import React, { useState, useEffect } from "react";
import { Events } from "../../Data/event";
import "../CSS/student-upcoming-event.css";
import "../CSS/student.css";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function StudentUpcomingEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const obj = { college: college, department: department };
      axios.get("http://localhost:8000/api/faculty/fetch-event").then((res) => {
        const data = res;
        setEvents(data.data.data);
        console.log(data.data.data);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="student-page">
      {/* <Router> */}
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="student-upcoming-event-page">
          <div className="past-registered-events">
            <h2>Upcoming Events</h2>
          </div>
          {events.map((event) => {
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
                    <td>{event.skills.map((skill) => `${skill} `)}</td>
                  </tr>
                  <tr>
                    <td>Volunteering Form URL : </td>
                    <td>
                      {event.link ?
                      <a href={`${event.link}`} target="_blank">
                        {event.link}
                      </a> : "--"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Event Coordinator : </td>
                    <td>{event.cordinator}</td>
                  </tr>
                  <tr>
                    <td>Coordinator Contact no. : </td>
                    <td>{event.contact_no}</td>
                  </tr>
                  <tr>
                    <td>Coordinator Email : </td>
                    <td>{event.email}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StudentUpcomingEvent;
