import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./404";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import CarInformation from "./Pages/Dashboard/CarInformation/CarInformation";
import CarRequest from "./Pages/Dashboard/CarInformation/CarRequest";
import CarKyc from "./Pages/Dashboard/CarKyc/CarKyc";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import HostRequest from "./Pages/Dashboard/HostInfo/HostRequest";
import HostKyc from "./Pages/Dashboard/HostKyc/HostKyc";
import HostPayment from "./Pages/Dashboard/HostPayment/HostPayment";
import KycForm from "./Pages/Dashboard/KYC/KycForm";
import Notification from "./Pages/Dashboard/Notification/Notification";
import RentInformation from "./Pages/Dashboard/RentInformation/RentInformation";
import RentisIncome from "./Pages/Dashboard/RentisIncome/RentisIncome";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import StripeBills from "./Pages/Dashboard/StripeBills/StripeBills";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import UserRequest from "./Pages/Dashboard/UserInfo/UserRequest";
import UserKyc from "./Pages/Dashboard/UserKyc/UserKyc";
import UserPayment from "./Pages/Dashboard/UserPayment/UserPayment";
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
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/earning/:income" element={<Earning />} />
              <Route path="/host-information" element={<HostInfo />} />
              <Route path="/host-request" element={<HostRequest />} />
              <Route path="/kyc-form" element={<KycForm />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/user-information" element={<UserInfo />} />
              <Route path="/user-request" element={<UserRequest />} />
              <Route path="/rent-information" element={<RentInformation />} />
              <Route path="/car-information" element={<CarInformation />} />
              <Route path="/car-request" element={<CarRequest />} />
              <Route path="/user-payment" element={<UserPayment />} />
              <Route path="/renti-income" element={<RentisIncome />} />
              <Route path="/host-payment" element={<HostPayment />} />
              <Route path="/stripe-bills" element={<StripeBills />} />
              <Route path="/host-kyc" element={<HostKyc />} />
              <Route path="/user-kyc" element={<UserKyc />} />
              <Route path="/car-kyc" element={<CarKyc />} />
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/email" element={<Email />} />
            <Route path="/forget-password/:email" element={<Otp />} />
            <Route path="/update-password/:email" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
