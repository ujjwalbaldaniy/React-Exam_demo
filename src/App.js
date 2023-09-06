import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";
import TeacherPage from "./Pages/TeacherPage";
import StudentPage from "./Pages/StudentPage";
import { StudentPrivate, TeacherPrivate } from "./auth/PrivateRouting";
import Dropdown from "./Components/Dropdown";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TeacherPrivate />}>
            <Route path="/teacherPage" element={<TeacherPage />} />
          </Route>

          <Route path="/" element={<StudentPrivate />}>
            <Route path="/studentPage" element={<StudentPage />} />
          </Route>

          <Route path="/dropdown" element={<Dropdown />} />
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
