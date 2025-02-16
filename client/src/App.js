import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Menu from "./pages/Menu";
import Category from "./pages/Category";
import Banner from "./pages/Banner";
import Customer from "./pages/Customer";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Details from "./pages/Details";
import SpecialDiscount from "./pages/SpecialDiscount";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import OrderTracking from "./pages/OrderTracking";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  // const isAuthenticated = false;
  console.log(isAuthenticated);
  return (
    <Router>
      {isAuthenticated ? (
        user.role === "customer" ? (
          <div className="">
            {/* <Navbar /> */}
            <div className="">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-tracking/:id" element={<OrderTracking />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex bg-black overflow-hidden">
            <Sidebar />
            <div className="flex-1 m-2 bg-gray-100 rounded-lg flex overflow-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/banner" element={<Banner />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/discounts" element={<SpecialDiscount />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        )
      ) : (
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
