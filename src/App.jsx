import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route,useNavigate, Navigate } from 'react-router-dom';
import "./App.css"
import Dashboard from './Pages/Dashboard/Dashboard';
import Signin from "./Pages/Signin/Signin";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
                <Route path="/" element={<DashboardHome/>} />
                
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/email" element={<Email />} />
            <Route path="/forget-password" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePass />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
