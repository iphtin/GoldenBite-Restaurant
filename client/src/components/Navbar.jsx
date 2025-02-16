import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaSignOutAlt, FaUserEdit, FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShoppingCart, shoppingCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];
  const customer = JSON.parse(localStorage.getItem("user"));

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUpdateProfile = () => {
    navigate("/profile");
  };

  const handleCart = () => {
    setShoppingCart(!shoppingCart);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex py-3 px-6 w-full justify-between items-center space-x-4">
        <div className="text-center text-xl font-bold">
          <span className="text-indigo-500">Golden</span>Bite
        </div>
        <div className="rounded-full px-5 py-2 justify-between border flex items-center w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:outline-none border-none"
            placeholder="Find food or beverages"
          />
          <IoSearchOutline />
        </div>
        <div className="ml-4 mr-12 flex items-center">
          <NavLink to="/favorites" className="relative w-[40px] mr-8">
            {/* Shopping Cart Icon */}
            <MdOutlineFavorite
              onClick={() => handleCart()} // Function to handle cart actions
              className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer"
              aria-label="View Cart"
            />

            {/* Item Count Badge */}
            <p className="bg-red-500 absolute -top-1 -right-1 text-white font-medium text-xs w-5 h-5 flex items-center text-[12px] justify-center rounded-full shadow">
              {favoriteItems.length}
            </p>
          </NavLink>
          <div className="relative w-[40px] mr-8">
            {/* Shopping Cart Icon */}
            <FaShoppingCart
              onClick={() => handleCart()} // Function to handle cart actions
              className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer"
              aria-label="View Cart"
            />

            {/* Item Count Badge */}
            <p className="bg-red-500 absolute -top-1 -right-1 text-white font-medium text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
              {cartItems.length}
            </p>
          </div>
          <img
            src={
              customer.profileImage ||
              "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-6 mt-2 w-48 bg-white shadow-lg rounded-lg border">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleUpdateProfile}
              >
                <FaUserEdit className="mr-2" /> Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <FaSignOutAlt className="mr-2" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
