import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Admin from "./components/Admin";
import Mentor from "./components/Mentor";
import Student from "./components/Student";
import _404Page from "./components/_404Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import MentorDashboard from "./components/MentorDashboard";
import ManageCalendar from "./components/ManageCalendar";
import ManageAppointments from "./components/ManageAppointments";
import MentorFeedback from "./components/MentorFeedback";
import MentorTransactionHistory from "./components/MentorTransactionHistory";
import EditProfile from "./components/EditProfile";
import StudentDashboard from "./components/StudentDashboard";
import StudentGroup from "./components/StudentGroup";
import BookingMentor from "./components/BookingMentor";
import MyAppointments from "./components/MyAppointments";
import StudentFeedback from "./components/StudentFeedback";
import StudentTransactionHistory from "./components/StudentTransactionHistory";
import EditProfileStudent from "./components/EditProfileStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";

import PuffLoader from "react-spinners/PuffLoader";

import { registerLicense } from "@syncfusion/ej2-base";
import AdminDashboard from "./components/AdminDashboard";
import ManageMentors from "./components/ManageMentors";
import ManageStudents from "./components/ManageStudents";
import StudentClass from "./components/StudentClass";
registerLicense(
  "Mgo+DSMBMAY9C3t2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9TdEBiW3xacHdRQGNY"
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

const AppContent = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { isLoading } = authContext;

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <PuffLoader color="#ff9000" size={100} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/404" element={<_404Page />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="mentors"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ManageMentors />
            </ProtectedRoute>
          } />
          <Route path="students"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ManageStudents />
            </ProtectedRoute>
          } />
        </Route>

        <Route
          path="/mentor"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <Mentor />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["Mentor"]}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="calendar"
            element={
              <ProtectedRoute allowedRoles={["Mentor"]}>
                <ManageCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="appointments"
            element={
              <ProtectedRoute allowedRoles={["Mentor"]}>
                <ManageAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="feedback" element={<MentorFeedback />} />
          <Route
            path="transaction-history"
            element={
              <ProtectedRoute allowedRoles={["Mentor"]}>
                <MentorTransactionHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-profile"
            element={
              <ProtectedRoute allowedRoles={["Mentor"]}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Student />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="class"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <StudentClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="group"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <StudentGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking-mentor"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <BookingMentor />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-appointments"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <StudentFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="transaction-history"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <StudentTransactionHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-profile"
            element={
              <ProtectedRoute allowedRoles={["Student"]}>
                <EditProfileStudent />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;
