import React from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";

const ReviewsAndRatings = () => {
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 4.5,
      review:
        "The food was delicious, and delivery was on time. Will order again!",
      date: "Jan 6, 2025",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      review: "Amazing experience! The pizza was hot and fresh.",
      date: "Jan 5, 2025",
    },
  ];

  return (
    <div className="p-4 w-[400px] min-h-screen">
      {/* Header */}
      <h2 className="text-sm font-bold mb-1">Reviews and Ratings</h2>

      {/* Reviews Section */}
      <div className="bg-white shadow rounded-lg p-1">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start gap-2 p-4 border-b border-gray-200 last:border-b-0"
          >
            {/* User Avatar */}
            <FaUserCircle className="text-4xl text-gray-400" />

            {/* Review Content */}
            <div className="flex-1">
              {/* User Info */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-gray-700">
                  {review.user}
                </h3>
                <span className="text-[12px] text-gray-500">{review.date}</span>
              </div>

              {/* Rating */}
              <div className="flex text-[12px] items-center gap-1 text-yellow-500">
                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                  <FaStar key={i} />
                ))}
                {review.rating % 1 !== 0 && <FaStar className="half-filled" />}
                <span className="ml-2 text-[12px] text-gray-600">
                  {review.rating.toFixed(1)} / 5
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-[12px] mt-2">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
