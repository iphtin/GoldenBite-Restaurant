import React, { useEffect, useState } from "react";
import { deleteItem, getSpecialDiscount } from "../services";
import SpecialDiscountForm from "../components/SpecialDiscountForm";

const SpecialDiscount = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchSpecialDiscount = async () => {
      try {
        const result = await getSpecialDiscount();
        console.log(result);
        setSpecialItems(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Special Discount", error);
      }
    };
    fetchSpecialDiscount();
  }, []);

  // Filter items based on the search query
  const filteredItems = specialItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("Are sure you want")) {
        const result = await deleteItem("discounts/delete", id);
        if (result) {
          setSpecialItems(specialItems.filter((c) => c._id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setShowForm(true);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    );
  }

  return (
    <div className="p-6 w-[95%] relative mx-auto overflow-y-scroll bg-gray-100 min-h-screen">
      {/* Title */}
      {showForm && (
        <div className="w-[100%] absolute pb-5 rounded-md">
          <SpecialDiscountForm setShowForm={setShowForm} item={selectedItem} />
        </div>
      )}
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-xl font-bold flex">
          Special Discount -
          <p className="text-blue-500 ml-2">{specialItems.length}</p>{" "}
        </h1>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-[500px] rounded-md focus:outline-none border"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={(e) => handleAdd(e)}
          className="bg-blue-500 text-sm font-semibold text-white px-9 py-3 rounded-md"
        >
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white p-6 shadow rounded-lg">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Expired</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredItems.map((item) => {
              return (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.price[0].value}</td>
                  <td className="p-3">5.4 ⭐</td>
                  <td className="p-3">{item.createdAt.split("T")[0]}</td>
                  <td
                    className={`p-3 ${
                      new Date(item.expiryDate) > new Date()
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {new Date(item.expiryDate) > new Date()
                      ? "Not Yet"
                      : "Expired"}
                  </td>

                  <td className="p-3 flex justify-center space-x-3">
                    <button
                      className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                      onClick={(e) => handleDelete(e, item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialDiscount;
