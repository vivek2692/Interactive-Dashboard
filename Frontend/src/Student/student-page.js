import React from "react";
import "./CSS/student.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentNavBar from "./NavBar/student-navbar";
import StudentTopBar from "./TopBar/student-topbar";
import StudentHome from "./Home/student-home";
import MyProfile from "./TopBar/student-info";
import CourseraForm from "./Coursera Certificates/student-coursera-form";
import StudentCompetitivePerformance from "./Competitive Exams/student-compe-performance";
import StudentExtracurricular from "./Extracurricular Achievements/student-extracurricular";

function Student() {
  return (
    <div className="student-page">
      <Router>
        <StudentNavBar />
        <StudentTopBar />
        <Routes>
          <Route path="/student/my-profile" element={<MyProfile />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/coursera-form" element={<CourseraForm />} />
          <Route
            path="/student/competitive-exam-achievement"
            element={<StudentCompetitivePerformance />}
          />
          <Route
            path="/student/extracurricular-achievement"
            element={<StudentExtracurricular />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Student;
