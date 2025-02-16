import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>No item selected</p>;
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleExtraChange = (extra) => {
    setSelectedExtras((prevSelectedExtras) => {
      // Check if the extra is already selected
      const isSelected = prevSelectedExtras.some(
        (selected) => selected._id === extra._id
      );

      if (isSelected) {
        // If already selected, remove it
        return prevSelectedExtras.filter(
          (selected) => selected._id !== extra._id
        );
      } else {
        // If not selected, add it
        return [...prevSelectedExtras, extra];
      }
    });

    // Update the total extras price
    setTotalExtrasPrice((prevPrice) => {
      const isSelected = selectedExtras.some(
        (selected) => selected._id === extra._id
      );
      return isSelected ? prevPrice - extra.price : prevPrice + extra.price;
    });
  };

  const addToCart = () => {
    const selectedPizzaPrice = item.price.find(
      (p) => p.size === selectedSize
    )?.value;

    const totalPrice = (selectedPizzaPrice || 0) + totalExtrasPrice;

    const cartItem = {
      id: item._id,
      name: item.name,
      image: item.image,
      size: selectedSize,
      productModel: item.productModel,
      extras: selectedExtras, // Now includes name and price
      price: totalPrice,
    };

    // Retrieve existing cart or initialize as an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if an item with the same id already exists
    const itemExists = cart.some(
      (existingItem) => existingItem.id === cartItem.id
    );

    if (itemExists) {
      alert("Item already in cart!");
      return; // Exit without adding the item again
    }

    // Add the new item if it doesn't exist
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save back to localStorage

    alert("Item added to cart!");
  };

  const selectedPizzaPrice = item.price.find(
    (p) => p.size === selectedSize
  )?.value;

  const totalPrice = (selectedPizzaPrice || 0) + totalExtrasPrice;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-6 w-full md:w-1/2">
            <h1 className="text-lg font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 text-[12px] text-base/8 mb-4">
              {item.description}
            </p>

            {item.price[1].value !== 0 && (
              <>
                <h2 className="text-[16px] font-semibold mb-2">Select Size</h2>
                <ul className="space-y-2 flex items-center mb-4">
                  {item.price.map((item) => (
                    <li key={item.size} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={`size-${item.size}`}
                        name="item-size"
                        value={item.size}
                        onChange={() => handleSizeChange(item.size)}
                        checked={selectedSize === item.size}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`size-${item.size}`}
                        className="text-gray-700 text-sm"
                      >
                        {item.size} - ksh. {item.value}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {item.extras.length > 0 && (
              <>
                <h2 className="text-[16px] font-semibold mb-2">Extras</h2>
                <ul className="space-y-2 mb-4">
                  {item.extras.map((extra) => (
                    <li key={extra._id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`extra-${extra._id}`}
                        onChange={() => handleExtraChange(extra)}
                        checked={selectedExtras.some(
                          (selected) => selected._id === extra._id
                        )}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`extra-${extra._id}`}
                        className="text-gray-700 text-sm"
                      >
                        {extra.name} (+ksh. {extra.price})
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="text-[16px] font-semibold mb-4">
              Total Price:{" "}
              <span className="text-[14px] text-green-500">
                ksh. {totalPrice}
              </span>
            </div>

            <button
              onClick={addToCart}
              className="bg-black text-sm text-white px-6 py-2 rounded-md hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
