import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Correct import
import Nav from "./Components/Nav";
import SignupForm from "./Components/Signup";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/dashboard";
import Superadmindashboard from "./Components/superadmin_dashboard";
import TBIAdminRegistration from "./Components/TBIAdminRegistration";

const App = () => {
  return (
    <div className="bg-slate-900">
      <Router>
        <ConditionalNav />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/superadmin_dashboard" element={<Superadmindashboard />} />
          <Route path="/tbiadmin" element={<TBIAdminRegistration />} />
        </Routes>
      </Router>
    </div>
  );
}

const ConditionalNav = () => {
  const location = useLocation();

  // Check if the current path is the super admin dashboard
  const isSuperAdminDashboard = location.pathname === "/superadmin_dashboard";

  return (
    <>
      {/* Render Nav only if it's not superadmin_dashboard */}
      {!isSuperAdminDashboard && <Nav />}
    </>
  );
}

export default App;