import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch order data from API
    const fetchTrackingOrder = async () => {
      try {
        const response = await fetch(`https://goldenbite-restaurant-backend.onrender.com/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error("Failed to fetch order data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchTrackingOrder();

    // Simulate real-time updates (optional)
    const interval = setInterval(fetchTrackingOrder, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return <p className="text-center mt-10 text-red-500">No order found.</p>;
  }

  const { orderStatus, orderDate, deliveryAddress, products, orderType } =
    order;

  // Define status steps based on orderType
  const statusSteps = {
    Delivery: ["Order Placed", "Processing", "Out for Delivery", "Delivered"],
    Takeaway: ["Order Placed", "Processing", "Ready for Pickup", "Completed"],
    "Dine-in": ["Order Placed", "Processing", "Served", "Completed"],
  };

  const steps = statusSteps[orderType] || [];
  const statusIndex = steps.indexOf(orderStatus);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Tracking</h2>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={product.product?.image || "https://via.placeholder.com/64"} // Fallback image
                alt={product.product?.name || "Product"}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-lg font-medium">
                  {product.product?.name || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address (only for Delivery orders) */}
      {orderType === "Delivery" && deliveryAddress && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
          <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>
          <p className="text-gray-700">
            {deliveryAddress.street}, {deliveryAddress.city},{" "}
            {deliveryAddress.state}, {deliveryAddress.postalCode},{" "}
            {deliveryAddress.country}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-6">Order Status</h3>
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Animated Circle */}
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index <= statusIndex ? "bg-green-500" : "bg-gray-300"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: index <= statusIndex ? 1.2 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {index + 1}
              </motion.div>

              {/* Status Text */}
              <div className="ml-4">
                <p className="text-lg font-medium">{step}</p>
                {index === statusIndex && (
                  <p className="text-sm text-gray-600">
                    {step === "Delivered" || step === "Completed"
                      ? `Your order has been ${step.toLowerCase()}.`
                      : `Estimated time: ${formatDistanceToNow(
                          new Date(orderDate),
                          {
                            addSuffix: true,
                          }
                        )}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Date */}
      <p className="text-gray-600 mt-6">
        Ordered {formatDistanceToNow(new Date(orderDate), { addSuffix: true })}
      </p>
    </div>
  );
};

export default OrderTracking;
