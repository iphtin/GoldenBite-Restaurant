import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  FaSignOutAlt,
  FaUserEdit,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ setShoppingCart, shoppingCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const customer = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteItems(favoriteItems);
  }, []);

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
    <div className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-xl font-bold">
          <span className="text-indigo-500">Golden</span>Bite
        </div>

        {/* Search Bar (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center border px-4 py-2 rounded-full w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 focus:outline-none border-none"
            placeholder="Find food or beverages"
          />
          <IoSearchOutline className="text-gray-600" />
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars className="text-2xl text-gray-700" />
          </button>

          {/* Favorites */}
          <NavLink to="/favorites" className="relative hidden md:block">
            <MdOutlineFavorite
              className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer"
              aria-label="Favorites"
            />
            <span className="bg-red-500 absolute -top-1 -right-1 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favoriteItems.length}
            </span>
          </NavLink>

          {/* Shopping Cart */}
          <div className="relative hidden md:block">
            <FaShoppingCart
              onClick={handleCart}
              className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer"
              aria-label="Cart"
            />
            <span className="bg-red-500 absolute -top-1 -right-1 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </div>

          {/* Profile Image */}
          <img
            src={
              customer.profileImage ||
              "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer hidden md:block"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-2">
          <div className="flex flex-col items-center space-y-4">
            {/* Search Bar */}
            <div className="flex items-center border px-4 py-2 rounded-full w-[90%]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 focus:outline-none border-none"
                placeholder="Find food or beverages"
              />
              <IoSearchOutline className="text-gray-600" />
            </div>

            {/* Favorites & Cart */}
            <NavLink
              to="/favorites"
              className="relative flex items-center space-x-2"
            >
              <MdOutlineFavorite className="text-2xl text-gray-700" />
              <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favoriteItems.length}
              </span>
              <span>Favorites</span>
            </NavLink>

            <button
              onClick={handleCart}
              className="relative flex items-center space-x-2"
            >
              <FaShoppingCart className="text-2xl text-gray-700" />
              <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
              <span>Cart</span>
            </button>

            {/* Profile */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={
                  customer.profileImage ||
                  "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{customer.name || "Profile"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 right-6 mt-2 w-48 bg-white shadow-lg rounded-lg border">
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
  );
};

export default Navbar;
