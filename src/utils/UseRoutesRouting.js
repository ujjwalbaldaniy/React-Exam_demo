import React from "react";
import { StudentPrivate, TeacherPrivate } from "../auth/PrivateRouting";
import TeacherDashboard from "../Pages/TeacherDashboard";
import CreateExam from "../Pages/CreateExam";
import VerifiedStudent from "../Pages/VerifiedStudent";
import ViewStudentDeatils from "../Pages/ViewStudentDetails";
import EditExam from "../Pages/EditExam";
import TeacherProfile from "../Pages/TeacherProfile";
import StudentDashboard from "../Pages/StudentDashboard";
import StudentGiveExam from "../Pages/StudentGiveExam";
import StudentProfile from "../Pages/StudentProfile";
import StudentNameChange from "../Pages/StudentNameChange";
import StudentResult from "../Pages/StudentResult";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import ForgotPassword from "../Pages/ForgotPassword";
import NewPassword from "../Pages/NewPassword";
import ResetPassword from "../Pages/ResetPassword";
import { useRoutes } from "react-router-dom";

const UseRoutesRouting = () => {
  let MainRouting = useRoutes([
    {
      path: "/",
      element: <TeacherPrivate />,
      children: [
        {
          path: "/teacher/dashboard",
          element: <TeacherDashboard />,
        },
        {
          path: "/teacher/createExam",
          element: <CreateExam />,
        },
        {
          path: "/teacher/verifiedStudent",
          element: <VerifiedStudent />,
        },
        {
          path: "/teacher/verifiedStudent/:id",
          element: <ViewStudentDeatils />,
        },
        {
          path: "/teacher/editExam/:editExamId",
          element: <EditExam />,
        },
        {
          path: "/teacher/profile",
          element: <TeacherProfile />,
        },
        {
          path: "/teacher/verifiedStudent/:id",
          element: <ViewStudentDeatils />,
        },
      ],
    },
    {
      path: "/",
      element: <StudentPrivate />,
      children: [
        {
          path: "/student/dashboard",
          element: <StudentDashboard />,
        },
        {
          path: "/student/dashboard/:id",
          element: <StudentGiveExam />,
        },
        {
          path: "/student/profile",
          element: <StudentProfile />,
        },
        {
          path: "/student/nameChange",
          element: <StudentNameChange />,
        },
        {
          path: "/student/result",
          element: <StudentResult />,
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/newPassword",
      element: <NewPassword />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    },
  ]);
  return MainRouting;
};

export default UseRoutesRouting;

// return
// (
//   <>
//     <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//     />
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<TeacherPrivate />}>
//           <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
//           <Route path="/teacher/createExam" element={<CreateExam />} />
//           <Route path="/teacher/verifiedStudent" element={<VerifiedStudent />} />
//           <Route path="/teacher/editExam/:editExamId" element={<EditExam />} />
//           <Route path="/teacher/profile" element={<TeacherProfile />} />
//           <Route path="/teacher/verifiedStudent/:id" element={<ViewStudentDeatils />}/>
//         </Route>

//         <Route path="/" element={<StudentPrivate />}>
//           <Route path="/student/dashboard" element={<StudentDashboard />} />
//           <Route path="/student/dashboard/:id" element={<StudentGiveExam />} />
//           <Route path="/student/profile" element={<StudentProfile />} />
//           <Route path="/student/nameChange" element={<StudentNameChange />} />
//           <Route path="/student/result" element={<StudentResult />} />
//         </Route>

//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route path="/newPassword" element={<NewPassword />} />
//         <Route path="/resetPassword" element={<ResetPassword />} />
//       </Routes>
//     </BrowserRouter>
//   </>
// );
