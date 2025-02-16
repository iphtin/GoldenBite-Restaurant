import React, { useState } from "react";

const CategorySelector = () => {
  const categories = [
    "All",
    "Side Dishes",
    "Salads",
    "Soups",
    "Snacks",
    "Breakfast",
    "Lunch",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default selected category

  return (
    <div className="mt-4 w-full flex-wrap flex gap-4">
      {categories.map((category) => (
        <div
          key={category}
          className={`py-2 px-6 rounded-full text-center cursor-pointer transition duration-300 ${
            selectedCategory === category
              ? "bg-black text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory(category)} // Set selected category on click
        >
          <p className="font-medium text-sm">{category}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
