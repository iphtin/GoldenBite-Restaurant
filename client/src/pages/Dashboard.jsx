import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaTimesCircle,
} from "react-icons/fa";
import MostSellingItems from "../components/MostSellingItems";
import ReviewsAndRatings from "../components/ReviewsAndRatings";
import { getCustomers, getOrders } from "../services";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [mostSellingItems, setMostSellingItems] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [customerGrowth, setCustomerGrowth] = useState({
    totalCustomers: 0,
    growthPercentage: 0,
  });

  const [ordersData, setOrdersData] = useState([
    { name: "Completed", value: 75 },
    { name: "Remaining", value: 25 },
  ]);

  const [growthData, setGrowthData] = useState([
    { name: "Growth", value: 60 },
    { name: "Remaining", value: 40 },
  ]);

  const [revenueData, setRevenueData] = useState([
    { name: "Achieved", value: 85 },
    { name: "Remaining", value: 15 },
  ]);

  const COLORS = {
    orders: ["#4F46E5", "#E0E7FF"], // Indigo
    growth: ["#DC2626", "#FECACA"], // Red
    revenue: ["#F59E0B", "#FEF3C7"], // Yellow
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch data from APIs
        const orderData = await getOrders();

        // Set orders and customers state
        setOrders(orderData);

        // Count Canceled Orders
        const canceledOrders = orderData.filter(
          (order) => order.orderStatus === "Canceled"
        ).length;
        setCanceledOrders(canceledOrders);

        // Calculate Total Revenue
        const totalRevenue = orderData.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );
        setTotalRevenue(totalRevenue);

        // Count occurrences of each item
        const itemCount = {};
        let totalOrdersCount = 0;

        orderData.forEach((order) => {
          order.products.forEach((item) => {
            const productId = item.product._id;
            if (!itemCount[productId]) {
              itemCount[productId] = { ...item.product, count: 0 };
            }
            itemCount[productId].count += item.quantity;
            totalOrdersCount += item.quantity;
          });
        });

        // Convert to array, calculate percentage, and sort by count
        const sortedItems = Object.values(itemCount)
          .map((item) => ({
            ...item,
            percentage: ((item.count / totalOrdersCount) * 100).toFixed(1),
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Get top 5 most selling items

        setMostSellingItems(sortedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch data from APIs
        const orderData = await getOrders();
        const customerData = await getCustomers();

        // Set orders and customers state
        setOrders(orderData);

        // Calculate Total Orders Percentage
        const totalOrders = orderData.length;
        const completedOrders = orderData.filter(
          (order) => order.orderStatus === "Completed"
        ).length;
        const ordersPercentage = Math.round(
          (completedOrders / totalOrders) * 100
        );

        // Calculate Customer Growth Percentage
        const previousCustomersCount = 500; // Example: Fetch from DB if available
        const totalCustomers = customerData.length;
        const customerGrowthPercentage = previousCustomersCount
          ? Math.round(
              ((totalCustomers - previousCustomersCount) /
                previousCustomersCount) *
                100
            )
          : 100;

        // Calculate Total Revenue Percentage
        const totalRevenue = orderData.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );
        const previousRevenue = 50000; // Example: Fetch from DB if available
        const revenuePercentage = previousRevenue
          ? Math.round(
              ((totalRevenue - previousRevenue) / previousRevenue) * 100
            )
          : 100;

        // Update pie chart data
        setOrdersData([
          { name: "Completed", value: ordersPercentage },
          { name: "Remaining", value: 100 - ordersPercentage },
        ]);

        setGrowthData([
          { name: "Growth", value: customerGrowthPercentage },
          { name: "Remaining", value: 100 - customerGrowthPercentage },
        ]);

        setRevenueData([
          { name: "Achieved", value: revenuePercentage },
          { name: "Remaining", value: 100 - revenuePercentage },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const renderCenteredLabel = (percentage) => (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-[12px] absolute font-bold text-black"
    >
      {percentage}%
    </text>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-3 ml-1">
        Hi, Samantha. Welcome back to GoldenBite
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        {/* Total Orders */}
        <div className="bg-white p-5 shadow rounded-lg flex items-center">
          <FaShoppingCart className="text-indigo-600 text-2xl mr-4" />
          <div>
            <h2 className="text-sm font-semibold text-gray-600">
              Total Orders
            </h2>
            <p className="text-sm font-bold text-indigo-600 mt-1">
              {orders.length}
            </p>
          </div>
        </div>

        {/* Customer Growth */}
        <div className="bg-white p-5 shadow rounded-lg flex items-center">
          <FaUsers className="text-green-500 text-2xl mr-4" />
          <div>
            <p className="text-sm font-bold text-green-500 mt-1">
              {formatNumber(customerGrowth.totalCustomers)} Customers (+
              {customerGrowth.growthPercentage}%)
            </p>
          </div>
        </div>

        {/* Total Canceled */}
        <div className="bg-white p-5 shadow rounded-lg flex items-center">
          <FaTimesCircle className="text-red-500 text-2xl mr-4" />
          <div>
            <h2 className="text-sm font-semibold text-gray-600">
              Total Canceled
            </h2>
            <p className="text-sm font-bold text-red-500 mt-1">
              {canceledOrders}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-5 shadow rounded-lg flex items-center">
          <FaDollarSign className="text-yellow-500 text-2xl mr-4" />
          <div>
            <h2 className="text-sm font-semibold text-gray-600">
              Total Revenue
            </h2>
            <p className="text-sm font-bold text-yellow-500 mt-1">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="flex">
        <div className="grid grid-cols-1 w-[350px] h-[130px] shadow rounded-lg bg-white md:grid-cols-3">
          {/* Total Orders Chart */}
          <div className="text-center">
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={ordersData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={40}
                  innerRadius={20}
                  startAngle={90}
                  endAngle={450}
                  label={(props) => renderCenteredLabel(ordersData[0].value)}
                  labelLine={false}
                  dataLabel={false}
                >
                  {ordersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.orders[index]} />
                  ))}
                  {/* {renderCenteredLabel(ordersData[0].value)} */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <h2 className="text-[12px] font-semibold text-gray-600">
              Total Orders
            </h2>
          </div>

          {/* Customer Growth Chart */}
          <div className="text-center">
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={growthData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={40}
                  innerRadius={20}
                  startAngle={90}
                  endAngle={450}
                  label={(props) => renderCenteredLabel(growthData[0].value)}
                  labelLine={false}
                  dataLabel={false}
                >
                  {growthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.growth[index]} />
                  ))}
                  {/* {renderCenteredLabel(growthData[0].value)} */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <h2 className="text-[12px] font-semibold text-gray-600">
              Customer Growth
            </h2>
          </div>

          {/* Total Revenue Chart */}
          <div className="text-center mb-3">
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={40}
                  innerRadius={20}
                  startAngle={90}
                  endAngle={450}
                  label={(props) => renderCenteredLabel(revenueData[0].value)}
                  labelLine={false}
                  dataLabel={false}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.revenue[index]} />
                  ))}
                  {/* {renderCenteredLabel(revenueData[0].value)} */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <h2 className="text-[12px] font-semibold text-gray-600">
              Total Revenue
            </h2>
          </div>
          <ReviewsAndRatings />
        </div>
        <MostSellingItems mostSellingItems={mostSellingItems} />
        <div className="w-[170px] ml-3 flex flex-col items-center rounded-lg bg-red-500">
          <h2 className="mt-[20%] font-bold text-white">
            Orders Today: {orders.length}
          </h2>
          <img src="/chef.png" className="h-[250px] mt-6 w-full" alt="chef" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
