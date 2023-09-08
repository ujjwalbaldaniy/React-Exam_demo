import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";
import StudentPage from "./Pages/StudentPage";
import { StudentPrivate, TeacherPrivate } from "./auth/PrivateRouting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateExam from "./Pages/CreateExam";
import VerifiedStudent from "./Pages/VerifiedStudent";
import TeacherDeshboard from "./Pages/TeacherDeshboard";
import TeacherProfile from "./Pages/TeacherProfile";
import ViewStudentDeatils from "./Pages/ViewStudentDetails";
import ResetPassword from "./Pages/ResetPassword";

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
            <Route path="/teacherDeshboard" element={<TeacherDeshboard />} />
            <Route path="/createExam" element={<CreateExam />} />
            <Route path="/verifiedStudent" element={<VerifiedStudent />} />
            <Route
              path="/verifiedStudent/:id"
              element={<ViewStudentDeatils />}
            />
            <Route path="/teacherProfile" element={<TeacherProfile />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Route>

          <Route path="/" element={<StudentPrivate />}>
            <Route path="/studentPage" element={<StudentPage />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
