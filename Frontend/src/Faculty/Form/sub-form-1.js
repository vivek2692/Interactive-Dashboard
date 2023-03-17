import React from "react";
import MultiStepProgressBar from "./progress-bar";

function SubForm1(props) {
  return (
    <div className="sub-form">
      <MultiStepProgressBar index={1} />
      <form action="">
        <table>
          <tr>
            <td>Name : </td>
            <td>
              <input
                type="text"
                name="name"
                value={props.getState("name", "")}
                onChange={props.handleChange}
                placeholder="Enter Full Name"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Email : </td>
            <td>
              <input
                type="email"
                name="email"
                value={props.getState("email", "")}
                onChange={props.handleChange}
                placeholder="Enter Email"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Contact no. : </td>
            <td>
              <input
                type="number"
                name="contact"
                value={props.getState("contact","")}
                onChange={props.handleChange}
                placeholder="Enter Mobile Number"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Enrollment no. :</td>
            <td>
              <input
                type="number"
                name="enrollment_no"
                value={props.getState("enrollment_no")}
                onChange={props.handleChange}
                placeholder="Enter Enrollment Number"
                required
              />
            </td>
          </tr>
          <tr>
          <td>Gender : </td>
            <td>
              <select
                name="gender"
                value={props.getState("gender","")}
                onChange={props.handleChange}
              >
                <option value="" selected>
                  --Select Gender--
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
        </table>
      </form>
      <div className="multistep-form-nav">
        <button
          className="multistep-form-btn"
          onClick={props.prev}
          disabled={true}
        >
          Previous
        </button>
        <button className="multistep-form-btn" onClick={props.next}>
        {/* <button className="multistep-form-btn" onClick={() => console.log(props.state)}> */}
          Next
        </button>
      </div>
    </div>
  );
}

export default SubForm1;
