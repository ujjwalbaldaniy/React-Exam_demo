import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";
import { StudentPrivate, TeacherPrivate } from "./auth/PrivateRouting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateExam from "./Pages/CreateExam";
import VerifiedStudent from "./Pages/VerifiedStudent";
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherProfile from "./Pages/TeacherProfile";
import ViewStudentDeatils from "./Pages/ViewStudentDetails";
import ResetPassword from "./Pages/ResetPassword";
import EditExam from "./Pages/EditExam";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentGiveExam from "./Pages/StudentGiveExam";
import StudentProfile from "./Pages/StudentProfile";
import StudentNameChange from "./Pages/StudentNameChange";
import StudentResult from "./Pages/StudentResult";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TeacherPrivate />}>
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
            <Route path="/createExam" element={<CreateExam />} />
            <Route path="/verifiedStudent" element={<VerifiedStudent />} />
            <Route path="/editExam/:editExamId" element={<EditExam />} />
            <Route path="/teacherProfile" element={<TeacherProfile />} />
            <Route path="/verifiedStudent/:id" element={<ViewStudentDeatils />}/>
          </Route>

          <Route path="/" element={<StudentPrivate />}>
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/studentDashboard/:id" element={<StudentGiveExam />} />
            <Route path="/studentProfile" element={<StudentProfile />} />
            <Route path="/studentNameChange" element={<StudentNameChange />} />
            <Route path="/studentResult" element={<StudentResult />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
