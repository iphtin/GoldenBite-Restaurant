import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import CategorySelector from "../components/CategorySelector";
import { getMenu, getSpecialDiscount } from "../services";
import CartSection from "../components/CartSection";
import SpecialItemTimer from "../components/SpecialItemTimer";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [specialItems, setSpecialItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await getMenu();
        setMenuItems(result);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchSpecialDiscount = async () => {
      try {
        const result = await getSpecialDiscount();
        setSpecialItems(result);
      } catch (error) {
        console.error("Error fetching Special Discount", error);
      }
    };

    fetchSpecialDiscount();
    fetchMenu();
  }, []);

  return (
    <div className="bg-[#f8f9f9] w-full min-h-screen">
      <Navbar setShoppingCart={setShoppingCart} shoppingCart={shoppingCart} />
      <div className="flex flex-col md:flex-row p-6">
        {/* Main Content */}
        <div className="flex-1 md:w-3/4 p-4">
          {/* Discount Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Special Discount Today</h3>
            <SpecialItemTimer specialItems={specialItems} />
          </div>

          {/* Menu Grid */}
          <div className="flex flex-wrap gap-2">
            {specialItems.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>

          {/* Explore Menu Section */}
          <div className="flex justify-between items-center mt-8 mb-4">
            <h3 className="text-lg font-bold">Explore Our Best Menu</h3>
          </div>

          {/* Category Selector */}
          <CategorySelector />

          {/* More Menu Items */}
          <div className="mt-5 flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        {!shoppingCart && <CartSection />}
      </div>
    </div>
  );
};

export default Home;
