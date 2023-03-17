import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import MultiStepProgressBar from "./progress-bar";
import { Users } from "../../Data/user-info";
import axios from "axios";

function StudentUpdateForm1(props) {
  const { id } = useParams();
  // const student = Users.find((user) => user.enroll === parseInt(id));
  // props.setState("name", student.name);
  // props.setState("enroll", student.enroll);
  // props.setState("year", student.year);
  // props.setState("college", student.college);
  // props.setState("department", student.department);

  const [student, setStudent] = useState({});

  const obj = { enrollment_no: id };

  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .post("http://localhost:8000/api/student/getStudent", obj)
        .then((res) => {
          const data = res.data;
          // setIsAvailable(true);
          setStudent(data.data);
          // console.log(data.data.documents);
          // props.state = data.data;
          console.log("data", data.data);
          props.state.name = student.name;
          props.state.email = student.email;
          props.state.contact = student.contact;
          props.state.enrollment_no = student.enrollment_no;
          props.state.gender = student.gender;
          props.state.admission_year = student.admission_year;
          props.state.admission_source = student.admission_source;
          props.state.department = student.department;
          props.state.college = student.college;
          props.state.current_semester = student.current_semester;
          props.state.board = student.board;
          props.state.category = student.category;
          props.state.state = student.state;
          props.state.address = student.address;
          console.log("state",props.state);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchStudent();
  }, []);

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
                value={props.getState("name")}
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
                value={props.getState("contact", "")}
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
                value={props.getState("enrollment_no", "")}
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
                value={props.getState("gender", "")}
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
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentUpdateForm1;
