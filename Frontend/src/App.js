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
import ViewFaculty from "./Admin/Users/faculties-info";
import AdminFaculties from "./Admin/Users/admin-faculties";
import UpdateStudent from "./Admin/Users/update-student";
import UpdateFaculty from "./Admin/Users/update-faculty";
import AdminAddStudent from "./Admin/Add Student/admin-add-student";
import AdminAddFaculty from "./Admin/Add Faculty/admin-add-faculty";
import AdminPlacement from "./Admin/Placement-details/admin-placement-details";
import ViewPlacement from "./Admin/Placement-details/placement-info";
import AdminCoursera from "./Admin/Coursera/admin-coursera";
import AdminStudentResult from "./Admin/Student Result/admin-student-result";
import ErrorPage from "./Admin/Users/Error";

import FacultyAddStudent from "./Faculty/Add Student/faculty-add-student";
import FacultyCoursera from "./Faculty/Coursera details/faculty-coursera";
import FacultyCourseAssigner from "./Faculty/Course Assigner/faculty-course-assigner";
import FacultyCourseForm from "./Faculty/Course Assigner/faculty-course-form";
import FacultyStudentResult from "./Faculty/Student Result/faculty-student-result";
import FacultyHome from "./Faculty/Home/faculty-home";
import FacultyPlacement from "./Faculty/Placement Details/faculty-placement-details";
import FacultyViewPlacement from "./Faculty/Placement Details/placement-info";
import FacultyUsers from "./Faculty/Users/faculty-users";
import FacultyViewStudent from "./Faculty/Users/student-info";
import FacultyEventManagement from "./Faculty/Event Management/faculty-event-management";
import FacultyTalentHunt from "./Faculty/Talent Hunt/faculty-talent-hunt";

// import StudentNavBar from "./Student/NavBar/student-navbar";
// import StudentTopBar from "./Student/TopBar/student-topbar";
import StudentHome from "./Student/Home/student-home";
import MyProfile from "./Student/TopBar/student-info";
import CourseraForm from "./Student/Coursera Certificates/student-coursera-form";
import StudentCompetitivePerformance from "./Student/Competitive Exams/student-compe-performance";
import StudentExtracurricular from "./Student/Extracurricular Achievements/student-extracurricular";
import StudentViewResult from "./Student/View Result/student-view-result";
import StudentUpcomingEvent from "./Student/Upcoming Events/student-upcoming-event";
import AdminStudentBacklog from "./Admin/Student Backlog/admin-student-backlog";
import AdminStudentBacklogResult from "./Admin/Student Backlog/student-backlog-marks";
import AdminFacultyComparison from "./Admin/Faculty Comparison/admin-faculty-comparison";

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
          <Route path="/admin/students" element={<AdminUsers />} />
          <Route
            path="/admin/student-backlog"
            element={<AdminStudentBacklog />}
          />
          <Route
            path="/admin/student-backlog/add-marks"
            element={<AdminStudentBacklogResult />}
          />
          <Route path="/admin/faculties" element={<AdminFaculties />} />
          <Route path="/admin/students/info/:id" element={<ViewStudent />} />
          <Route path="/admin/faculties/info/:id" element={<ViewFaculty />} />
          <Route
            path="/admin/students/update-student/:id"
            element={<UpdateStudent />}
          />
          <Route
            path="/admin/faculties/update-faculty/:id"
            element={<UpdateFaculty />}
          />
          <Route
            path="/admin/students/add-student"
            element={<AdminAddStudent />}
          />
          <Route path="/admin/add-faculty" element={<AdminAddFaculty />} />
          <Route path="/admin/placement-details" element={<AdminPlacement />} />
          <Route
            path="/admin/students/add-student"
            element={<AdminAddStudent />}
          />
          <Route
            path="/admin/faculties/add-faculty"
            element={<AdminAddFaculty />}
          />
          <Route
            path="/admin/faculty-comparison"
            element={<AdminFacultyComparison />}
          />
          <Route path="/admin/placement-details" element={<AdminPlacement />} />
          <Route
            path="/admin/placement-details/student/:id"
            element={<ViewPlacement />}
          />
          <Route path="/admin/coursera-details" element={<AdminCoursera />} />
          <Route
            path="/admin/student-result"
            element={<AdminStudentResult />}
          />
          <Route path="/admin/users/student/*" element={<ErrorPage />} />
          <Route path="/faculty/home" element={<FacultyHome />} />
          <Route path="/faculty/students" element={<FacultyUsers />} />
          <Route
            path="/faculty/users/student/:id"
            element={<FacultyViewStudent />}
          />
          <Route path="/faculty/add-student" element={<FacultyAddStudent />} />
          <Route path="/faculty/courses" element={<FacultyCourseAssigner />} />
          <Route
            path="/faculty/placement-details"
            element={<FacultyPlacement />}
          />
          <Route
            path="/faculty/placement-details/student/:id"
            element={<FacultyViewPlacement />}
          />
          <Route
            path="/faculty/student-result"
            element={<FacultyStudentResult />}
          />
          <Route
            path="/faculty/courses/student/:id"
            element={<FacultyCourseForm />}
          />
          <Route
            path="/faculty/coursera-details"
            element={<FacultyCoursera />}
          />
          <Route
            path="/faculty/event-registration"
            element={<FacultyEventManagement />}
          />
          <Route path="/faculty/talent-hunt" element={<FacultyTalentHunt />} />
          {/* <Route path="/faculty/talent-hunt" element={<FacultyTalentHunt />} /> */}

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
          <Route path="/student/view-result" element={<StudentViewResult />} />
          <Route
            path="/student/upcoming-event"
            element={<StudentUpcomingEvent />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
