import React, { useState, useEffect } from "react";

const SpecialItemTimer = ({ specialItems }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!specialItems || specialItems.length === 0) return;

    const firstItem = specialItems[0];
    const expirationDate = new Date(firstItem.expiryDate); // Assuming `expireDate` is in ISO format

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = expirationDate - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    // Initial calculation
    calculateTimeLeft();

    // Update the timer every second
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timerInterval);
  }, [specialItems]);

  return (
    <p className="text-gray-400 text-sm px-3 py-1 bg-white rounded-full shadow">
      End In <span className="text-red-500">{timeLeft}</span>
    </p>
  );
};

export default SpecialItemTimer;
