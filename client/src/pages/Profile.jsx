import React, { useState } from "react";
import axios from "axios";
import { CiCamera } from "react-icons/ci";
import { updateItem } from "../services";

const Profile = () => {
  const customer = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    profileImage: customer?.profileImage || "",
    deliveryAddress: {
      phone: customer?.deliveryAddress.phone || "07",
      city: customer?.deliveryAddress.city,
      state: customer?.deliveryAddress.state || "",
      country: customer?.deliveryAddress.country,
    },
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for phone and if the length exceeds 10 characters
    if (name === "deliveryAddress.phone" && value.length > 10) {
      alert("Phone number cannot exceed 10 characters.");
      return; // Stop further execution
    }

    if (name.startsWith("deliveryAddress.")) {
      const field = name.split(".")[1];
      setUser((prevUser) => ({
        ...prevUser,
        deliveryAddress: {
          ...prevUser.deliveryAddress,
          [field]: value,
        },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedUser = { ...user }; // Create a copy of the current user state

      // Upload image if a new file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "upload");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/darzppmps/image/upload",
          formData
        );

        const data = uploadResponse.data; // Use .data to access the response
        updatedUser.profileImage = data.secure_url; // Update the profile image URL
        setSelectedFile(null);
      }

      // Update the user in the database
      const result = await updateItem("user/update", customer._id, updatedUser);

      if (result) {
        alert(result.message);

        // Update localStorage with the new user data
        const updatedLocalStorageUser = {
          ...customer, // Spread the existing customer data
          ...updatedUser, // Overwrite with the updated user data
        };
        localStorage.setItem("user", JSON.stringify(updatedLocalStorageUser));

        // Optionally, update the state to reflect the changes
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="shadow-lg rounded-lg p-8 bg-white border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center animate-fade-in">
          Update Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <img
              src={
                imagePreview ||
                user.profileImage ||
                "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition">
              <CiCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4 animate-slide-in">
            <label className="block font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Email */}
          <div className="mb-4 animate-slide-in">
            <label className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Delivery Address */}
          <div className="mb-4 animate-slide-in">
            <label className="block font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="number"
              name="deliveryAddress.phone"
              value={user.deliveryAddress.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-slide-in">
              <label className="block font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={user.deliveryAddress.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg"
              />
            </div>

            <div className="animate-slide-in">
              <label className="block font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="deliveryAddress.state"
                value={user.deliveryAddress.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          <div className="mt-4 animate-slide-in">
            <label className="block font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={user.deliveryAddress.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg outline-non"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 mt-6 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 shadow-md"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
