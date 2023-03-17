import React, { useState, useEffect } from "react";
import "../CSS/faculty-event-management.css";
import { Events } from "../../Data/event";
import FacultyNavBar from "../NavBar/faculty-navbar";
import FacultyTopBar from "../TopBar/faculty-topbar";
import "../CSS/faculty.css";
import { useSelector } from "react-redux";
import axios from "axios";

function FacultyEventManagement() {
  const name = useSelector((state) => state.user.userInfo.name);
  const dpt = useSelector((state) => state.user.userInfo.department);
  const clg = useSelector((state) => state.user.userInfo.college);
  const token = useSelector((state) => state.user.token);
  const fac = useSelector((state) => state.user.userInfo);

  const [college, setCollege] = useState(fac.college);
  const [department, setDepartment] = useState(fac.department);
  const [cordinator, setCordinator] = useState(fac.name);
  const [contact, setContact] = useState(fac.contact);
  const [email, setEmail] = useState(fac.email);
  // const [department, setDepartment] = useState(fac.department);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [sk, setSk] = useState("");
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState([]);

  const skills = sk.split(",");

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

  const handleClick = async () => {
    console.log("skills", skills);
    const obj = {
      name: eventName,
      skills: skills,
      department: department,
      college: college,
      cordinator: cordinator,
      contact_no: contact,
      description: desc,
      email: email,
      link: url,
    };

    await axios
      .post("http://localhost:8000/api/faculty/add-event", obj)
      .then((res) => {
        const data = res.data.data;
        setEvents(data);
        alert("Event Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (event) => {
    const obj = { name: event.name, cordinator: cordinator };
    console.log("obj", obj);
    await axios
      .post("http://localhost:8000/api/faculty/delete-event", obj)
      .then((res) => {
        const data = res.data.data;
        alert("Event Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="faculty-page">
      {/* <Router> */}
      <FacultyNavBar />
      <FacultyTopBar />
      <div>
        <div className="faculty-event-management-page">
          <div className="event-management">
            <h2>Upcoming Event Form</h2>
            <div className="event-form">
              <table>
                <tr>
                  <td>Event name : </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Event Description : </td>
                  <td>
                    <textarea
                      cols="30"
                      rows="4"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Volunteering Skills Required : </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setSk(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Volunteering Form URL : </td>
                  <td>
                    <input
                      type="url"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Event Coordinator : </td>
                  <td>
                    <input
                      type="text"
                      value={cordinator}
                      onChange={(e) => setCordinator(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Coordinator Contact no. : </td>
                  <td>
                    <input
                      type="number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Coordinator Email : </td>
                  <td>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                </tr>
              </table>
              <button className="multistep-form-btn" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
          <div className="past-registered-events">
            <h2>Past Registered Events</h2>
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
                      <a href={`${event.link}`} target="_blank">
                        {event.link}
                      </a>
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
                {name === event.cordinator && (
                  <button
                    className="delete-event"
                    onClick={async () => {
                      const obj = { name: event.name, cordinator: cordinator };
                      console.log("obj", obj);
                      await axios
                        .post(
                          "http://localhost:8000/api/faculty/delete-event",
                          obj
                        )
                        .then((res) => {
                          const data = res.data.data;
                          alert("Event Deleted");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FacultyEventManagement;
