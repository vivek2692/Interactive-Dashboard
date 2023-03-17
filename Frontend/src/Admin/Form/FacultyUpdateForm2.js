import React from "react";
import { useParams } from "react-router";
import MultiStepProgressBar from "./progress-bar";
import { Users } from "../../Data/user-info";
import axios from "axios";

function FacultyUpdateForm2(props) {

  const handleSubmit = async() => {
    const data = props.state;
    await axios.patch(`http://localhost:8000/api/admin/update-faculty/${props.state.faculty_id}`, data)
    .then((res) => {
      const data = res.data.data;
      alert("Faculty Updated Successfully");
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="sub-form">
      <MultiStepProgressBar index={2} />
      <form action="">
        <table>
          <tr>
            <td>Joining Year : </td>
            <td>
              <select
                name="year"
                value={props.getState("year", "")|| "2020"}
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
                name="designation"
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
                <option value="Faculty">Faculty</option>
                <option value="Marks Filling">Marks filling</option>
                <option value="Course Assigner">Course Assigner</option>
                <option value="Coursera Coordinator">
                  Coursera Coordinator
                </option>
                <option value="Admission Staff">Admission Staff</option>
                <option value="Placement Coordinator">
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
        <button type="submit" className="multistep-form-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FacultyUpdateForm2;
