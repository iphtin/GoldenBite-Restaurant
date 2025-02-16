import React from "react";
import { FaArrowUp } from "react-icons/fa";

const MostSellingItems = ({ mostSellingItems }) => {
  return (
    <div
      className="bg-white shadow-lg ml-[42px] rounded-lg p-4"
      style={{ width: "350px" }}
    >
      {/* Title */}
      <div className="border-b pb-3 mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Most Selling Food
        </h2>
      </div>

      {/* Items List */}
      <div>
        {mostSellingItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b last:border-none"
          >
            {/* Item Info */}
            <div className="flex items-center">
              <div className="bg-indigo-100 text-indigo-600 rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-gray-800 text-sm font-medium">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.count} orders</p>
              </div>
            </div>

            {/* Percentage */}
            <div className="flex items-center">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-gray-600 font-medium">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingItems;
