import React from "react";
import Register from "./Components/Register";
import ActivateAccount from "./Components/ActivateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/DashBoard";
import URLShortener from "./Components/UrlShortner";
import CreatedURLsTable from "./Components/CreatedUrls";
function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/activateAccount" element={<ActivateAccount />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shorten" element={<URLShortener />} />
          <Route path="/created" element={<CreatedURLsTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
