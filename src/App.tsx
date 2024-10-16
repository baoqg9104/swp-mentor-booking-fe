import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./components/AuthContext";
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

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="/mentor" element={<Mentor />}>
              <Route path="dashboard" element={<MentorDashboard />} />
              <Route path="calendar" element={<ManageCalendar />} />
              <Route path="appointments" element={<ManageAppointments />} />
              <Route path="feedback" element={<MentorFeedback />} />
              <Route
                path="transaction-history"
                element={<MentorTransactionHistory />}
              />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>

            <Route path="/student" element={<Student />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="group" element={<StudentGroup />} />
              <Route path="booking-mentor" element={<BookingMentor />} />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route path="feedback" element={<StudentFeedback />} />
              <Route
                path="transaction-history"
                element={<StudentTransactionHistory />}
              />
              <Route path="edit-profile" element={<EditProfileStudent />} />
            </Route>

            <Route path="*" element={<_404Page />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
