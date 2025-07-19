import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Withdraw from "./pages/Withdraw"; // optional if you're using route protection
import AuthGuard from "./components/AuthGuard";

function App() {
  let isAuthenticated = localStorage.getItem("token");
  return (
    <div
      className="app-container"
      style={{ backgroundColor: "rgb(212, 243, 231)", minHeight: "100vh" }}
    >
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/withdraw" element={<Withdraw />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
