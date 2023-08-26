import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import Notification from "./Pages/Dashboard/Notification/Notification";
import NotFound from "./404";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import RentInformation from "./Pages/Dashboard/RentInformation/RentInformation";
import CarInformation from "./Pages/Dashboard/CarInformation/CarInformation";
import UserPayment from "./Pages/Dashboard/UserPayment/UserPayment";
import RentisIncome from "./Pages/Dashboard/RentisIncome/RentisIncome";
import HostPayment from "./Pages/Dashboard/HostPayment/HostPayment";
import StripeBills from "./Pages/Dashboard/StripeBills/StripeBills";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification/>} />
              <Route path="/earning" element={<Earning />} />
              <Route path="/host-info" element={<HostInfo />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/rent-info" element={<RentInformation />} />
              <Route path="/car-info" element={<CarInformation />} />
              <Route path="/user-payment" element={<UserPayment />} />
              <Route path="/renti-income" element={<RentisIncome />} />
              <Route path="/host-payment" element={<HostPayment />} />
              <Route path="/stripe-bills" element={<StripeBills />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            
            <Route path="/email" element={<Email />} />
            <Route path="/forget-password" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
