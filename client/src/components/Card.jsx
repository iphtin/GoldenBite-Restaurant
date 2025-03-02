import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some((fav) => fav._id === item._id));
  }, [item._id]);

  // Toggle favorite status
  const toggleFavorite = (event) => {
    event.stopPropagation(); // Prevent navigating to the details page
    console.log("click favorites");

    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Remove from favorites
      storedFavorites = storedFavorites.filter((fav) => fav._id !== item._id);
    } else {
      // Add to favorites
      storedFavorites.push(item);
    }

    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));

    // Update state
    setIsFavorite(!isFavorite);
  };

  // Function to check if the current time is within the availability schedule
  const isFoodAvailable = () => {
    const currentTime = new Date();

    // Check availability based on availabilitySchedule
    if (item?.availabilitySchedule?.length > 0) {
      const { startTime, endTime } = item.availabilitySchedule[0] || {};

      if (!startTime || !endTime) return false;

      // Convert startTime and endTime to minutes
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const currentTimeInMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();
      const startTimeInMinutes = startHours * 60 + startMinutes;
      const endTimeInMinutes = endHours * 60 + endMinutes;

      // Handle time ranges, including overnight ranges
      return startTimeInMinutes <= endTimeInMinutes
        ? currentTimeInMinutes >= startTimeInMinutes &&
            currentTimeInMinutes <= endTimeInMinutes
        : currentTimeInMinutes >= startTimeInMinutes ||
            currentTimeInMinutes <= endTimeInMinutes;
    }

    // Fallback: Check expiryDate
    if (item?.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      return currentTime <= expiryDate;
    }

    return false;
  };

  const available = isFoodAvailable();

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/details/${item._id}`, { state: { item } })}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-[120px] p-1.5 rounded-lg object-cover"
        />
        <div className="absolute bottom-4 left-3">
          <span
            className={`text-[12px] px-3 py-1 rounded-full ${
              available ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {available ? "Available Now" : "Not Available"}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="py-2 px-3">
        <div>
          <h3 className="text-sm font-semibold">{item?.name}</h3>
        </div>

        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-700 font-semibold">
            ksh. {item?.price[0].value}
          </span>
          <button className="text-red-700" onClick={toggleFavorite}>
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
