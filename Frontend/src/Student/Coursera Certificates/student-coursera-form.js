import React, { useState } from "react";
import "../CSS/student-coursera-form.css";
import "../CSS/student.css";
import StudentNavBar from "../NavBar/student-navbar";
import StudentTopBar from "../TopBar/student-topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function CourseraForm() {
  const [title, setTitle] = useState("");
  const student = useSelector((state) => state.user.userInfo);
  const [image, setImage] = useState({});

  const handleFileChange = (event, fieldName) => {
    setImage(event.target.files[0]);
    // props.setState({ fieldName: event.target.files[0] });
  };


  // const [course2, setCourse2] = useState("");
  // const [course3, setCourse3] = useState("");

  const handleUpload = async() => {
    const data = new FormData();

    // {name: student.name, fname: title, enrollment_no: student.enrollment_no, college: student.college, department: student.department, current_semester: student.current_semester, image: image}
    data.set("name", student.name);
    data.set("fname", title);
    data.set("enrollment_no", student.enrollment_no);
    data.set("college", student.college);
    data.set("department", student.department);
    data.set("current_semester", student.current_semester);
    data.set("image", image);

    console.log(data);

    await axios
      .post("http://localhost:8000/api/student/coursera", data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      )
      .then((res) => {
        const data = res.data;
        // console.log(data);
        alert("Certificate uploaded!");
        // navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="student-page">
      {/* <Router> */}
      <StudentNavBar />
      <StudentTopBar />
      <div>
        <div className="coursera-form-page">
          <div className="coursera-form">
            <h2>Coursera Certificates</h2>
            <div className="coursera-upload-certi">
              <table>
                <h3>Course </h3>
                {/* <tr>
                  <td>Academic Course : </td>
                  <td>
                    <select value={course1}>
                      <option value="" selected>
                        --Select Academic Course--
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Software Engineering">
                        Software Engineering
                      </option>
                      <option value="Artificial Intelligence and Machine Learning">
                        Artificial Intelligence and Machine Learning
                      </option>
                      <option value="Cyber Security">Cyber Security</option>
                    </select>
                  </td>
                </tr> */}
                <tr>
                  <td>Coursera Course Title : </td>
                  <td>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                  </td>
                </tr>
                <tr>
                  <td>Upload Coursera Certificate : </td>
                  <td>
                    <input type="file" name="image" className="file" onChange={handleFileChange} />
                  </td>
                </tr>
                <br />
                {/* <h3>Course 2</h3>
            <tr>
              <td>Academic Course : </td>
              <td>
                <select value={course2}>
                  <option value="" selected>
                    --Select Academic Course--
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Artificial Intelligence and Machine Learning">
                    Artificial Intelligence and Machine Learning
                  </option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Coursera Course Title : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Upload Coursera Certificate : </td>
              <td>
                <input type="file" className="file" />
              </td>
            </tr>
            <br />
            <h3>Course 3</h3>
            <tr>
              <td>Academic Course : </td>
              <td>
                <select value={course1}>
                  <option value="" selected>
                    --Select Academic Course--
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Artificial Intelligence and Machine Learning">
                    Artificial Intelligence and Machine Learning
                  </option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Coursera Course Title : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Upload Coursera Certificate : </td>
              <td>
                <input type="file" className="file" />
              </td>
            </tr> */}
              </table>

              <button className="multistep-form-btn" onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseraForm;
