import React from "react";
import { useParams } from "react-router";
import MultiStepProgressBar from "./progress-bar";
import { Users } from "../../Data/user-info";
import axios from "axios";


function StudentUpdateForm2(props) {
  // const { id } = useParams();
  // const student = Users.find((user) => user.enroll === parseInt(id));

  const handleSubmit = async() => {
    const data = props.state;
    await axios.patch(`http://localhost:8000/api/admin/update-student/${props.state.enrollment_no}`, data)
    .then((res) => {
      const data = res.data.data;
      alert("Student Updated Successfully");
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
            <td>Admission Year : </td>
            <td>
              <select
                name="admission_year"
                value={props.getState("admission_year", "")}
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
            <td>Admission Seat : </td>
            <td>
              <select
                name="admission_source"
                value={props.getState("admission_source", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Seat--
                </option>
                <option value="ACPC">ACPC</option>
                <option value="Management Quota">Management Quota</option>
                <option value="NRI">NRI</option>
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
            <td>Current Semester : </td>
            <td>
              <select
                name="current_semester"
                value={props.getState("current_semester", "")}
                onChange={props.handleChange}
              >
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>HSC Board : </td>
            <td>
              <select
                name="board"
                value={props.getState("board", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Board--
                </option>
                <option value="CBSE">CBSE</option>
                <option value="GSEB">GSEB</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Category : </td>
            <td>
              <select
                name="category"
                value={props.getState("category", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Category--
                </option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>State : </td>
            <td>
              <select
                name="state"
                value={props.getState("state", "")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select State--
                </option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Rajasthan">Rajasthan</option>
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

export default StudentUpdateForm2;
