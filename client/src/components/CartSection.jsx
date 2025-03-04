import React, { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { addItem } from "../services";
import { useNavigate } from "react-router-dom"; // For redirection

const CartSection = ({ setShoppingCart, shoppingCart }) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate(); // For redirection

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1; // Default quantity is 1 for each item
      return acc;
    }, {})
  );

  const [orderType, setOrderType] = useState("Dine-in"); // Default order type

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const quantity = quantities[item.id] || 1; // Default quantity is 1
    return sum + item.price * quantity;
  }, 0);

  // Define Tax and Total
  const taxRate = 0.07; // Example: 7% tax rate
  const tax = subtotal * taxRate;

  // Round tax to the nearest tens
  const roundedTax = Math.round(tax / 10) * 10;

  const total = subtotal + roundedTax;

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload(); // Refresh to reflect changes
  };

  const handleOrderNow = async () => {
    // Validate delivery address if order type is Delivery
    if (
      (orderType === "Delivery" && !user.deliveryAddress.state) ||
      !user.phoneNumber
    ) {
      alert(
        "You cannot order delivery without a delivery address. Please update your profile."
      );
      navigate("/profile"); // Redirect to profile page
      return;
    }

    const customer = user._id; // Replace with actual user ID (e.g., from authentication state)
    const paymentMethod = "Card"; // Example: Can be dynamically set

    const orderData = {
      customer,
      products: cartItems.map((item) => ({
        product: item.id,
        productModel: item.productModel,
        quantity: quantities[item.id],
        extras: item.extras,
        price: item.price,
      })),
      totalPrice: total,
      paymentMethod,
      orderType, // Include order type in the order data
      deliveryAddress: orderType === "Delivery" ? user.deliveryAddress : null, // Include delivery address only for Delivery
    };

    try {
      const result = await addItem("orders/add", orderData);
      if (result) {
        alert("Order placed successfully!");
        navigate(`/order-tracking/${result.order._id}`);
        localStorage.removeItem("cart");
      } else {
        alert("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <>
      {/* Blur background for mobile only */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center sm:hidden">
        <div className="bg-white shadow-md w-[90%] sm:w-[360px] rounded-md p-4 h-[600px] flex flex-col">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-lg font-bold">Current Order</h2>
            <button
              className="font-bold text-red-700 text-[20px] cursor-pointer"
              onClick={() => setShoppingCart(!shoppingCart)}
            >
              X
            </button>
          </div>
          <div className="flex-1 h-[70%] overflow-y-scroll">
            {cartItems.map((item) => (
              <div
                className="flex items-center justify-between mb-2"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt="Cart Item"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 ml-4">
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <p className="text-[14px] text-green-500 font-bold">
                    ksh. {item.price}{" "}
                    <span className="text-[8px] text-gray-400">
                      x {quantities[item.id]}
                    </span>
                  </p>
                  <div className="flex justify-between items-center space-x-4">
                    <QuantitySelector
                      quantity={quantities[item.id]}
                      setQuantity={(quantity) =>
                        handleQuantityChange(item.id, quantity)
                      }
                      onRemove={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Type Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Type
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dine-in">Dine-in</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          {/* Payment Summary */}
          <div className="rounded-lg p-4 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-semibold text-sm">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Tax</span>
              <span className="font-semibold text-sm">
                ${roundedTax.toFixed(2)}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-300 my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Total</h2>
              <h2 className="text-lg font-bold">${total.toFixed(2)}</h2>
            </div>

            {/* Order Button */}
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              onClick={handleOrderNow}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Non-blurred version for larger screens */}
      <div className="hidden sm:block">
        <div className="bg-white shadow-md w-[360px] rounded-md p-4 h-[600px] flex flex-col">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-lg font-bold">Current Order</h2>
            <button
              className="font-bold text-red-700 text-[20px] cursor-pointer"
              onClick={() => setShoppingCart(!shoppingCart)}
            >
              X
            </button>
          </div>
          <div className="flex-1 h-[70%] overflow-y-scroll">
            {cartItems.map((item) => (
              <div
                className="flex items-center justify-between mb-2"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt="Cart Item"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 ml-4">
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <p className="text-[14px] text-green-500 font-bold">
                    ksh. {item.price}{" "}
                    <span className="text-[8px] text-gray-400">
                      x {quantities[item.id]}
                    </span>
                  </p>
                  <div className="flex justify-between items-center space-x-4">
                    <QuantitySelector
                      quantity={quantities[item.id]}
                      setQuantity={(quantity) =>
                        handleQuantityChange(item.id, quantity)
                      }
                      onRemove={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Type Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Type
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dine-in">Dine-in</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          {/* Payment Summary */}
          <div className="rounded-lg p-4 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-semibold text-sm">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Tax</span>
              <span className="font-semibold text-sm">
                ${roundedTax.toFixed(2)}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-300 my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Total</h2>
              <h2 className="text-lg font-bold">${total.toFixed(2)}</h2>
            </div>

            {/* Order Button */}
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              onClick={handleOrderNow}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSection;
