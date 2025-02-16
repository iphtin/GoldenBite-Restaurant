import React, { useState } from "react";
import { addItem, updateItem } from "../services/index";

const SpecialDiscountForm = ({ setShowForm, item }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || [
      { size: "Small", value: 0 },
      { size: "Medium", value: 0 },
      { size: "Large", value: 0 },
    ],
    image: item?.image || "",
    extras: item?.extras || [],
    expiryDate: item?.expiryDate
      ? new Date(item.expiryDate).toISOString().slice(0, 16)
      : "",
  });

  const [extraName, setExtraName] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...formData.price];
    updatedPrices[index].value = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      price: updatedPrices,
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding extras
  const addExtra = () => {
    if (extraName.trim() && extraPrice.trim()) {
      setFormData((prev) => ({
        ...prev,
        extras: [
          ...prev.extras,
          { name: extraName, price: parseFloat(extraPrice) },
        ],
      }));
      setExtraName("");
      setExtraPrice("");
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    setImageUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload"); // Replace with your preset

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/darzppmps/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        image: data.secure_url,
      }));
      setImageUploadLoading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageUploadLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add logic to submit the data to the backend
    try {
      if (item) {
        const result = await updateItem("discounts/update", item._id, formData);
        alert(result.message);
        window.location.reload();
      } else {
        const result = await addItem("discounts/create", formData);
        alert(result.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="absolute w-[95%] p-6 bg-white shadow-lg rounded-md">
      <div className="flex justify-between">
        <h1 className="text-sm font-bold mb-4">Add Special Discount</h1>
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-0 right-5 p-3 text-2xl font-semibold text-red-600 hover:text-red-800"
        >
          x
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter food name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Price Inputs */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Price ($)</label>
          <div className="space-y-2">
            {formData.price.map((price, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="w-20 font-medium">{price.size}</span>
                <input
                  type="number"
                  // value={price.value}
                  defaultValue={price.value}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder={`Enter ${price.size} price`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Date */}
        <div className="flex space-x-4 items-center">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Expiry Date and Time
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expiryDate: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="w-full"
          />
          {imageUploadLoading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded Preview"
              className="mt-2 w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Extras */}
        <div>
          <label className="block text-sm font-semibold mb-1">Extras</label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={extraName}
              onChange={(e) => setExtraName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Extra name"
            />
            <input
              type="number"
              value={extraPrice}
              onChange={(e) => setExtraPrice(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Extra price"
            />
            <button
              type="button"
              onClick={addExtra}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 gap-4 items-center flex flex-wrap">
            {formData.extras.map((extra, index) => (
              <li
                key={index}
                className="bg-gray-100 px-2 py-2 rounded-lg text-sm"
              >
                {extra.name} - ${extra.price}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {item ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpecialDiscountForm;
