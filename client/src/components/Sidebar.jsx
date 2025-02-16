import React from "react";
import { NavLink } from "react-router-dom";
import { BiCategory, BiSolidDish } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { SiBandcamp } from "react-icons/si";
import { CiDiscount1 } from "react-icons/ci";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <IoMdHome />, path: "/" },
    { name: "Orders", icon: <MdOutlineShoppingCart />, path: "/orders" },
    { name: "Menu", icon: <BiSolidDish />, path: "/menu" },
    { name: "Categories", icon: <BiCategory />, path: "/categories" },
    { name: "Banner", icon: <SiBandcamp />, path: "/banner" },
    { name: "Customers", icon: <FaUsers />, path: "/customers" },
    {
      name: "Special Discount",
      icon: <CiDiscount1 />,
      path: "/discounts",
    },
    // { name: "Settings", icon: <IoIosSettings />, path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 text-center text-2xl font-bold">
        <span className="text-indigo-500">Golden</span>Bite
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg hover:bg-indigo-700 transition ${
                isActive ? "bg-indigo-600" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 flex items-center gap-4">
        <img
          src="https://cdn.gencraft.com/prod/user/744fac12-8cb5-451a-a0ae-d1352adf11a0/544a6f4b-c46c-4e9a-912c-1e2565f840b0/image/image1_0.jpg?Expires=1744052036&Signature=iOfKwsBqrIeAE1H~J8PaH9zPO-BP10dJQpz5ha9yFs1lx8UReyqEug0ZNKsPNcDRCIOjW5VngHA-00VoC-QWQ6fqmFxOTNIeumHm7yyMb3WEGpJrrD7RYa1fC43yq45hIDXJhskrQa8K~T8U7-EGEiYDjMxIWUplWo6yPS~X~4hQqQS1qSofQcR0k1Rn5QLOz9XwtMPOyQY26WFEO0P3SBrOaU7PByknVZ4EWcvspmwfY1Hye6QSRB-WSfX~c1TGE1Y-mjDm2H~dBj25gQvTxOvcgFgIbPClYfNP7LRfFKGgEmsgkgb55eAJUhJi2nKHA6vyJmX7FpJEooPbOmRCww__&Key-Pair-Id=K3RDDB1TZ8BHT8"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <div>
            <button
              className="text-sm border p-2 rounded cursor-pointer font-semibold"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
