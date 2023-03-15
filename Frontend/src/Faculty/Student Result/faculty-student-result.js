// import React, { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Users } from "../../Data/user-info";
// import { TfiSearch } from "react-icons/tfi";
// import "../CSS/faculty-student-result.css";
// //import MaterialReactTable from "material-react-table";

// function FacultyStudentResult() {
//   const [studentResults, setStudentResults] = useState([]);
//   var newResult = [];
//   let enrollment = 0,
//     marks = 0;
//   for (let i = 0; i < Users.length; i++) {
//     const result = { enrollment, marks };
//     newResult.push(result);
//   }
//   setStudentResults(newResult);

//   function updateMarks(index, newMarks) {
//     const updateResult = [...studentResults];
//     updateResult[index].marks = newMarks;
//     setStudentResults(updateResult);
//   }

//   let srno = 1;
//   return (
//     <div className="faculty-result">
//       <h2 style={{ color: "rgb(143, 143, 145)" }}>Student Result</h2>
//       <div className="result-filter">
//         <form action="">
//           <div>
//             <span>
//               Batch :{" "}
//               <select>
//                 <option value="2020">2020</option>
//                 <option value="2021">2021</option>
//                 <option value="2022">2022</option>
//               </select>
//             </span>
//             <span>
//               Semester :{" "}
//               <select>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 <option value="6">6</option>
//                 <option value="7">7</option>
//                 <option value="8">8</option>
//               </select>
//               <span>
//                 Subject :{" "}
//                 <select>
//                   <option value="Advanced Web Development">
//                     Advanced Web Development
//                   </option>
//                   <option value="Software Engineering">
//                     Software Engineering
//                   </option>
//                   <option value="Artificial Intelligence and Machine Learning">
//                     Artificial Intelligence and Machine Learning
//                   </option>
//                   <option value="Microprocessor">Microprocessor</option>
//                   <option value="Fuzzy Logic">Fuzzy Logic</option>
//                 </select>
//               </span>
//               <span>
//                 Exam :{" "}
//                 <select>
//                   <option value="Mid Sem">Mid Sem</option>
//                   <option value="Internal Practical">Internal Practical</option>
//                   <option value="External Practical">External Practical</option>
//                 </select>
//               </span>
//             </span>
//           </div>
//         </form>
//       </div>
//       <div className="result-table">
//         <table border={1}>
//           <tr>
//             <th>Sr. No.</th>
//             <th>Enrollment No.</th>
//             <th>Marks</th>
//           </tr>
//           {Users.map((user, index) => {
//             newResult[index].enrollment = user.enroll;
//             return (
//               <tr key={srno++}>
//                 <td>{srno}</td>
//                 <td>{user.enroll}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={studentResults[index].marks}
//                     onChange={(e) => updateMarks(index, e.target.value)}
//                     style={{ width: "40px", margin: "0px" }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </table>

//         <center>
//           <button className="multistep-form-btn">Clear</button>
//           <button className="multistep-form-btn">Save</button>
//         </center>
//         {/* <MaterialReactTable columns={columns} data={Users} /> */}
//       </div>
//     </div>
//   );
// }

// export default FacultyStudentResult;
