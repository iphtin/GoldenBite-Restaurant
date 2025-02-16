import React, { useEffect, useState } from "react";
import { deleteItem, getOrders, updateItem } from "../services";
import { MdOutlineUnfoldMore, MdDeleteOutline } from "react-icons/md";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log(selectedStatus);

  // Filter orders by status
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === selectedStatus);

  // Update order status
  const updateOrderStatus = async (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    await updateItem("orders/update", id, {
      orderStatus: newStatus,
    });
    alert(`Order #${id} status updated to ${newStatus}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getOrders();
        setOrders(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchOrders();
  }, [orders]);

  const deleteOrder = async (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    await deleteItem("orders/delete", id);
    alert(`Order #${id} deleted successfully`);
  };

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Filter by Status */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm text-left">Order No.</th>
              <th className="px-6 py-4 text-sm text-left">Customer</th>
              <th className="px-6 py-4 text-sm text-left">Items</th>
              <th className="px-6 py-4 text-sm text-left">Total</th>
              <th className="px-6 py-4 text-sm text-left">Date</th>
              <th className="px-6 py-4 text-sm text-left">Status</th>
              <th className="px-6 py-4 text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id} className="border-t">
                <td className="px-6 text-sm py-4">
                  <p
                    className={`w-[50px] h-[50px] rounded-full text-white flex items-center justify-center font-bold ${
                      colors[index % colors.length]
                    }`}
                  >
                    {index + 1}
                  </p>
                </td>
                <td className="px-6 text-[14px] py-4 font-semibold">
                  {order.customer.name}
                </td>
                <td>
                  <p className="font-medium text-sm">
                    {order.products[0].product.name}{" "}
                  </p>
                </td>
                <td className="px-6 text-sm py-4">ksh. {order.totalPrice}</td>
                <td className="px-6 text-sm py-4">
                  {order.orderDate.split("T")[0]}
                </td>
                <td
                  className={`px-6 text-sm py-4 ${
                    order.orderStatus === "Completed"
                      ? "text-green-500"
                      : order.orderStatus === "Pending"
                      ? "text-orange-500"
                      : order.orderStatus === "Processing"
                      ? "text-yellow-500"
                      : order.orderStatus === "Canceled"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {order.orderStatus}
                </td>
                <td className="px-6 flex text-sm py-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="px-4 py-2 border rounded-lg"
                  >
                    {/* Common options for all order types */}
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>

                    {/* Conditional options based on orderType */}
                    {order.orderType === "Delivery" && (
                      <>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </>
                    )}
                    {order.orderType === "Takeaway" && (
                      <>
                        <option value="Ready for Pickup">
                          Ready for Pickup
                        </option>
                        <option value="Completed">Completed</option>
                      </>
                    )}
                    {order.orderType === "Dine-in" && (
                      <>
                        <option value="Served">Served</option>
                        <option value="Completed">Completed</option>
                      </>
                    )}

                    {/* Common option for all order types */}
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[20px] ml-4"
                  >
                    <MdOutlineUnfoldMore />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl flex items-center font-bold">
                Order Details
                <span className="text-[12px] ml-6 bg-green-700 px-3 py-1 rounded-md text-white">
                  {selectedOrder.orderType} -{" "}
                  {moment(selectedOrder.orderDate).fromNow()}
                </span>
              </h2>
              <button
                className="text-red-700 text-xl"
                onClick={() => deleteOrder(selectedOrder._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>

            <p className="text-sm">
              <strong>Customer:</strong> {selectedOrder.customer.name}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {selectedOrder.deliveryAddress.phone}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {selectedOrder.customer.email}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {selectedOrder.deliveryAddress.street},{" "}
              {selectedOrder.deliveryAddress.city},{" "}
              {selectedOrder.deliveryAddress.state},{" "}
              {selectedOrder.deliveryAddress.country}
            </p>

            <div className="h-[350px] overflow-y-scroll">
              <h3 className="text-sm text-blue-600 font-bold">Items</h3>
              <div className="mt-1">
                {selectedOrder.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border-b py-2"
                  >
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Quantity: </span>
                        {item.quantity}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Price: </span>
                        Ksh. {item?.price}
                      </p>
                      {item?.extras.length > 0 && (
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Extras: </span>
                          {item?.extras.map((extra) => (
                            <span className="text-gray-800 pr-2">
                              {extra.name}: Ksh. {extra.price},
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm">
              <strong>Total Price:</strong> ksh. {selectedOrder.totalPrice}
            </p>
            <p className="text-sm">
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p className="text-sm">
              <strong>Status:</strong> {selectedOrder.orderStatus}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
