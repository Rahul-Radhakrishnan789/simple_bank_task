import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/commonPages/signInPage";
import LoginPage from "./pages/commonPages/loginPage";
import UserDashboard from "./pages/userPages/UserDashboard";
import AdminDashboard from "./pages/adminPages/adminDashboard";
function App() {

  return (
    <>
            <Router>
                    <Routes>
                        <Route path="/" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/userdashboard" element={<UserDashboard/>} />
                        <Route path="/admindashboard" element={<AdminDashboard/>} />
                    </Routes>
                </Router>
    </>
  )
}

export default App
