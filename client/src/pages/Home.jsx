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
    <div className="bg-[#f8f9f9] w-[100%] min-h-screen">
      <Navbar setShoppingCart={setShoppingCart} shoppingCart={shoppingCart} />
      <div
        className={`flex flex-col md:flex-row p-4 md:p-6 ${
          shoppingCart ? "lg:w-[1020px]" : ""
        }  m-auto`}
      >
        {/* Main Content */}
        <div className="flex-1 md:w-3/4 p-2 md:p-4">
          {/* Discount Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Special Discount Today</h3>
            <SpecialItemTimer specialItems={specialItems} />
          </div>

          {/* Horizontal Scrollable Menu Grid */}
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="inline-flex gap-4 pb-4">
              {specialItems.map((item) => (
                <div
                  key={item._id}
                  className="w-[150px] sm:w-[180px] md:w-[200px]"
                >
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Explore Menu Section */}
          <div className="flex justify-between items-center mt-8 mb-4">
            <h3 className="text-lg font-bold">Explore Our Best Menu</h3>
          </div>

          {/* Category Selector */}
          <CategorySelector />

          {/* More Menu Items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
            {menuItems.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        {!shoppingCart && (
          <div>
            {" "}
            <CartSection
              setShoppingCart={setShoppingCart}
              shoppingCart={shoppingCart}
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
