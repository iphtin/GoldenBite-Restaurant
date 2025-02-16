import React, { useState } from "react";
import axios from "axios";
import { addItem, updateItem } from "../services";

const CategoryForm = ({ setShowForm, item }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    image: item?.image || "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/darzppmps/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      setImagePreview(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Category Data:", formData);

    // Add logic to send `formData` to your backend
    try {
      if (item) {
        const result = await updateItem(
          "categories/update",
          item._id,
          formData
        );
        alert(result.message);
        window.location.reload();
      } else {
        const result = await addItem("categories/add", formData);
        alert(result.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 border rounded-md shadow">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-sm font-bold">Add Category</h1>
        <button
          onClick={() => setShowForm(false)}
          className="text-xl font-semibold text-red-600 hover:text-red-800"
        >
          x
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isUploading && (
            <p className="text-sm text-blue-500">Uploading image...</p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview || item?.image ? (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Image Preview
            </label>
            <img
              src={imagePreview || item?.image}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {item ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
