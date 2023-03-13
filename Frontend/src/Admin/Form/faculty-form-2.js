import React from "react";
import MultiStepProgressBar from "./progress-bar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function FacultyForm2(props) {

  const navigate = useNavigate();

  const handleSubmit = async() => {
    await axios.post("http://localhost:8000/api/faculty/register", props.state)
    .then((res) => {
      const data = res.data;
      console.log(data);
      alert("Faculty added successfully");
      navigate("/admin/users");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="sub-form">
      <MultiStepProgressBar index={2} />
      <form>
        <table>
          <tr>
            <td>Joining Year : </td>
            <td>
              <select
                name="year"
                value={props.getState("year", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Year--
                </option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>College : </td>
            <td>
              <select
                name="college"
                value={props.getState("college", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select College--
                </option>
                <option value="GCET">GCET</option>
                <option value="ADIT">ADIT</option>
                <option value="MBIT">MBIT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Department :</td>
            <td>
              <select
                name="department"
                value={props.getState("department", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Department--
                </option>
                <option value="CP">CP</option>
                <option value="IT">IT</option>
                <option value="ME">ME</option>
                <option value="MC">MC</option>
                <option value="CH">CH</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Designation : </td>
            <td>
              <select
                name="position"
                value={props.getState("position", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Seat--
                </option>
                <option value="HOD">Head of Department</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Qualification : </td>
            <td>
              <select
                name="qualification"
                value={props.getState("qualification", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Qualification--
                </option>
                <option value="Ph.D.">Ph.D.</option>
                <option value="M.Tech.">M.Tech.</option>
                <option value="B.Tech.">B.Tech.</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Role : </td>
            <td>
              <select
                name="role"
                value={props.getState("role", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Role--
                </option>
                <option value="faculty">Faculty</option>
                <option value="marks-filling">Marks filling</option>
                <option value="course-assigner">Course Assigner</option>
                <option value="coursera-coordinator">
                  Coursera Coordinator
                </option>
                <option value="admission-staff">Admission Staff</option>
                <option value="placement-coordinator">
                  Placement Coordinator
                </option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Address : </td>
            <td>
              <textarea
                name="address"
                cols="30"
                rows="3"
                value={props.getState("address", "")}
                onChange={props.handleChange}
              ></textarea>
            </td>
          </tr>
        </table>
      </form>
      <div className="multistep-form-nav">
        <button className="multistep-form-btn" onClick={props.prev}>
          Previous
        </button>
        <button type="button" className="multistep-form-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FacultyForm2;
