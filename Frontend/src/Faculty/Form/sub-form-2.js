import React, {useState} from "react";
import MultiStepProgressBar from "./progress-bar";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import { useForm } from 'react-step-builder';

function SubForm2(props) {

  const [images, setImages] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (event, fieldName) => {
    setImages({
      ...images,
      [fieldName]: event.target.files[0]
    });
    // props.setState({ fieldName: event.target.files[0] });
  };


  // const { register } = useForm();

  // const AadharCard = props.state.AadharCard[0];
  // const hsc_marksheet = props.state.hsc_marksheet[0];
  // const ssc_marksheet = props.state.ssc_marksheet[0];
  // const lc = props.state.lc[0];
  // const gujcet_marksheet = props.state.gujcet_marksheet[0];
  // const acpc_admission_letter = props.state.acpc_admission_letter[0];
  // const migration_certificate = props.state.migration_certificate[0];

  // const handleFileChange = (e) => {
  //   const thisName = e.target.name;
  //   // props.state.thisName = e.target.value
  //   // [...props.state, thisName: e.target.value]

  //   console.log("state",props.state);
  //   console.log(thisName, e.target.value);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.state);
    const data = new FormData();

    for(const key in props.state){
      if(key !== "files"){
        data.append(key,props.state[key]);
      }
    }

    for (const key in images) {
      data.append(key, images[key]);
    }

    console.log("data", data);
    await axios
      .post("http://localhost:8000/api/student/register", data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      )
      .then((res) => {
        const data = res.data;
        // console.log(data);
        alert("Student registered successfully!");
        navigate("/faculty/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sub-form">
      <MultiStepProgressBar index={2} />
      <form>
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
                value={props.getState("college")}
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
                value={props.getState("department")}
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
                value={props.getState("current_semester")}
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
                value={props.getState("board")}
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
                value={props.getState("category")}
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
                value={props.getState("state")}
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
                value={props.getState("address")}
                onChange={props.handleChange}
              ></textarea>
            </td>
          </tr>

          <tr>
            <td>Upload Aadhar Card : </td>
            <td>
              <input
                type="file"
                name="AadharCard"
                className="file-upload"
                // onChange={props.handleChange}
                // onChange={(e) => props.setState(e.target.files)}
                onChange={(event) => handleFileChange(event, 'AadharCard')}
                // {...register('AadharCard')}
              />
            </td>
          </tr>
          <tr>
            <td>Upload HSC Marksheet : </td>
            <td>
              <input
                type="file"
                name="hsc_marksheet"
                className="file-upload"
                // onChange={props.handleChange}
                // onChange={(e) => props.setState(e.target.files)}
                onChange={(event) => handleFileChange(event, 'hsc_marksheet')}
                // {...register('hsc_marksheet')}
              />
            </td>
          </tr>
          <tr>
            <td>Upload SSC Marksheet : </td>
            <td>
              <input
                type="file"
                name="ssc_marksheet"
                className="file-upload"
                // onChange={props.handleChange}
                // onChange={(e) => props.setState(e.target.files)}
                onChange={(event) => handleFileChange(event, 'ssc_marksheet')}
                // {...register('ssc_marksheet')}
              />
            </td>
          </tr>
          <tr>
            <td>Upload Leaving Certificate : </td>
            <td>
              <input
                type="file"
                name="lc"
                className="file-upload"
                // onChange={props.handleChange}
                // onChange={(e) => props.setState(e.target.files)}
                onChange={(event) => handleFileChange(event, 'lc')}
                // {...register('lc')}
              />
            </td>
          </tr>
          {props.state.admission_source === "ACPC" && (
            <tr>
              <td>Upload GUJCET Marksheet : </td>
              <td>
                <input
                  type="file"
                  name="gujcet_marksheet"
                  className="file-upload"
                  // onChange={props.handleChange}
                  // onChange={(e) => props.setState(e.target.files)}
                  onChange={(event) => handleFileChange(event, 'gujcet_marksheet')}
                  // {...register('gujcet_marksheet')}
                />
              </td>
            </tr>
          )}
          {props.state.admission_source === "ACPC" && (
            <tr>
              <td>Upload ACPC Admission letter : </td>
              <td>
                <input
                  type="file"
                  name="acpc_admission_letter"
                  className="file-upload"
                  // onChange={props.handleChange}
                  // onChange={(e) => props.setState(e.target.files)}
                  onChange={(event) => handleFileChange(event, 'acpc_admission_letter')}
                  // {...register('acpc_admission_letter')}
                />
              </td>
            </tr>
          )}
          {props.state.board !== "GSEB" &&
          props.state.board !== "" &&
          props.state.board !== null ? (
            <tr>
              <td>Upload Migration Certificate : </td>
              <td>
                <input
                  type="file"
                  name="migration_certificate"
                  className="file-upload"
                  // onChange={props.handleFileChange}
                  // onChange={(e) => props.setState(e.target.files)}
                  onChange={(event) => handleFileChange(event, 'migration_certificate')}
                  // {...register('migration_certificate')}
                />
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>
      </form>
      <div className="multistep-form-nav">
        <button className="multistep-form-btn" onClick={props.prev}>
          Previous
        </button>
        <button
          type="button"
          className="multistep-form-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SubForm2;
