import React, { useEffect, useState } from "react";
import { getCustomers } from "../services";

const Customer = () => {
  // Sample customer data
  // const customers = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     role: "customer",
  //     password: "******",
  //     profileImage: "https://via.placeholder.com/50", // Placeholder profile image
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     role: "admin",
  //     password: "******",
  //     profileImage: "https://via.placeholder.com/50",
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     email: "alice.johnson@example.com",
  //     role: "customer",
  //     password: "******",
  //     profileImage: "https://via.placeholder.com/50",
  //   },
  // ];

  // State to track the selected customer
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: selectedCustomer?.name,
    email: selectedCustomer?.email,
    role: selectedCustomer?.role,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const result = await getCustomers();
        setCustomers(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Customers", error);
      }
    };
    fetchCustomers();
  }, [customers]);

  // Update customer form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle customer role change or details update
  const handleUpdate = () => {
    if (formData.password.trim() === "") {
      alert("Password cannot be empty.");
      return;
    }
    alert(`Updated details for ${formData.name}`);
    // Update the selected customer with new details (optional backend API call)
    setSelectedCustomer((prev) => ({
      ...prev,
      ...formData,
    }));
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const filteredCustomers = customers.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side: Customer list */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Customers</h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-full rounded-md focus:outline-none border-none"
            placeholder="Search..."
          />
        </div>
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className={`p-4 rounded-lg cursor-pointer mb-2 flex justify-between items-center ${
              selectedCustomer?._id === customer._id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setSelectedCustomer(customer);
              setFormData({
                name: customer.name,
                email: customer.email,
                password: "",
                role: customer.role,
              });
            }}
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  customer?.profileImage ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={customer.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-bold">{customer.name}</div>
                <div className="text-sm">{customer.email}</div>
              </div>
            </div>
            <div className="ml-[50px] bg-[#9FE2BF] p-2 rounded-md">
              <span
                className={`text-sm font-semibold text-gray-700 ${
                  customer.role === "admin" && "text-red-500"
                }`}
              >
                {customer.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Customer details */}
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Customer</h2>
        {selectedCustomer && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg w-full outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg w-full outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg w-full outline-none"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="text-center flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
