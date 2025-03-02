import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Favorites = () => {
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  console.log(favorites);
  // Remove item from favorites
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((item) => item._id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`Item removed from favorites.`);
    window.location.reload(); // Reload to update the UI
  };

  // Add item to cart
  const addToCart = (item) => {
    alert(`"${item.name}" added to cart!`);
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">No Favorites Found</h1>
        <p className="text-gray-500 mt-2">
          Explore our menu and add items to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen lg:lg:w-[1020px] m-auto">
      <h1 className="text-xl font-bold mb-6 ml-6">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
        {favorites.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg p-2 shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[120px] rounded-lg object-cover cursor-pointer"
              onClick={() =>
                navigate(`/details/${item._id}`, { state: { item } })
              }
            />
            <div>
              <p className="text-gray-700 mt-2 font-bold text-sm mb-2">
                {item.name}
              </p>
              <div className="flex items-center justify-between pb-1">
                <p className="text-green-600 font-bold text-sm">
                  {item.price[0].value}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="text-gray-800 mr-2"
                  >
                    <MdOutlineAddShoppingCart />
                  </button>
                  <button
                    className="text-red-700"
                    onClick={() => removeFavorite(item._id)}
                  >
                    <MdOutlineFavorite />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
