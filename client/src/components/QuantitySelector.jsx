import React from "react";
import { CiTrash } from "react-icons/ci";

const QuantitySelector = ({ quantity, setQuantity, onRemove }) => {
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      onRemove(); // Remove the item when quantity reaches 1 and decrease is clicked
    }
  };

  return (
    <div className="flex justify-between w-full items-center space-x-4">
      <div className="bg-gray-200 rounded-md flex items-center justify-between w-[80px] p-1">
        <button
          onClick={handleDecrease}
          className="bg-white text-sm flex items-center justify-center w-6 h-6 font-bold text-black rounded-md hover:bg-gray-300"
          aria-label="Decrease Quantity"
        >
          -
        </button>
        <h4 className="text-sm font-semibold text-gray-700">{quantity}</h4>
        <button
          onClick={handleIncrease}
          className="bg-black w-6 h-6 font-bold text-white rounded-md hover:bg-gray-700"
          aria-label="Increase Quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={onRemove}
        className="text-sm text-gray-500 hover:text-red-500 flex items-center space-x-1"
        aria-label="Remove Item"
      >
        <CiTrash className="text-lg" />
      </button>
    </div>
  );
};

export default QuantitySelector;
