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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/student" element={<Student />} />

          <Route path="*" element={<_404Page />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
