import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signin from "./Pages/Signin/Signin";
import "./app.css";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
              {/* <Route path="/" element={<Dashboardhome/>} /> */}
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
