import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import StudentLogin from "./Login/student_login";
import FacultyLogin from "./Login/faculty_login";
import AdminLogin from "./Login/admin_login";
import NewPwdStudent from "./Login/new_pwd_student";
import NewPwdFaculty from "./Login/new_pwd_faculty";
import NewPwdAdmin from "./Login/new_pwd_admin";
import AdminHome from "./Admin/Home/admin-home";
import AdminUsers from "./Admin/Users/admin-users";
import ViewStudent from "./Admin/Users/student-info";
import AdminAddStudent from "./Admin/Add Student/admin-add-student";
import AdminAddFaculty from "./Admin/Add Faculty/admin-add-faculty";
import AdminPlacement from "./Admin/Placement-details/admin-placement-details";
import ViewPlacement from "./Admin/Placement-details/placement-info";
import AdminCoursera from "./Admin/Coursera/admin-coursera";
import ErrorPage from "./Admin/Users/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/admin-login/new-password" element={<NewPwdAdmin />} />
          <Route
            path="/faculty-login/new-password"
            element={<NewPwdFaculty />}
          />
          <Route
            path="/student-login/new-password"
            element={<NewPwdStudent />}
          />
          <Route path="/*" element={<StudentLogin />} />

          {/* Admin Routes */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/student/:id" element={<ViewStudent />} />
          <Route path="/admin/add-student" element={<AdminAddStudent />} />
          <Route path="/admin/add-faculty" element={<AdminAddFaculty />} />
          <Route
              path="/admin/placement-details"
              element={<AdminPlacement />}
            />
            <Route
              path="/admin/placement-details/student/:id"
              element={<ViewPlacement />}
            />
            <Route
              path="/admin/coursera"
              element={<AdminCoursera />}
            />
          <Route path="/admin/users/student/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
