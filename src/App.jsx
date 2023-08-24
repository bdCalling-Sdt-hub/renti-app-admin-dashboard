import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./404";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import HostRequest from "./Pages/Dashboard/HostInfo/HostRequest";
import KycForm from "./Pages/Dashboard/Kyc/KycForm";
import Notification from "./Pages/Dashboard/Notification/Notification";
import RentInformation from "./Pages/Dashboard/RentInformation/RentInformation";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import Wallet from "./Pages/Dashboard/Wallet/Wallet";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/earning" element={<Earning />} />
              <Route path="/host-info" element={<HostInfo />} />
              <Route path="/host-request" element={<HostRequest />} />
              <Route path="/kyc-form" element={<KycForm />} />
              <Route path="/wallet" element={<Wallet />} />

              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/rent-info" element={<RentInformation />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/email" element={<Email />} />
            <Route path="/forget-password" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
