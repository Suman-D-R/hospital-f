import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import DoctorReg from "./pages/DoctorReg";
import AdminReg from "./pages/AdminReg";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminHospitals from "./pages/AdminHospitals";
import AddHospital from "./pages/AddHospital";
import AdminDoctors from "./pages/AdminDoctors";
import AddDoctor from "./pages/AddDoctor";
import Appointment from "./pages/Appointment";
import DoctorProfile from "./pages/DoctorProfile";

function App() {
  const role = localStorage.getItem("role");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/regpage" element={<RegistrationPage />} />
          <Route path="/doctor" element={<DoctorReg />} />
          <Route path="/admin" element={<AdminReg />} />
          {/* {role === "patient" || role === null ? ( */}
            <Route path="/" element={<DoctorDashboard />}>
              <Route path="/home" element={<Hospitals />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/doctorprofile" element={<DoctorProfile />} />
            </Route>
          {/*  ) : null} */}
          {/* {role === "admin" ? ( */}
            {/* <Route path="/" element={<AdminDashboard />}>
               <Route path="/adminhome" element={<AdminHospitals />} />
               <Route path="/addhospital" element={<AddHospital />} />
               <Route path="/admindoctor" element={<AdminDoctors />} />
               <Route path="/adddoctor" element={<AddDoctor />} />

            </Route> */}
          {/* ) : null} */}
          {role === "doctor" ? (
            <Route path="/home" element={<DoctorDashboard />}>
            </Route>
          ) : null}
        </Routes>
      </Router>
    </>
  );
}


export default App;
