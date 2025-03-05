import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ Auth }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // State to manage validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extracting form values
    const formData = {
      name: e.target.name?.value || "",
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword?.value || "",
    };

    // Validate inputs
    const validationErrors = validateForm(formData, Auth);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return;
    }

    console.log("Form Data:", formData);

    // API call to login/sign up the user
    try {
      const url =
        Auth === "signup"
          ? "https://goldenbite-restaurant-backend.onrender.com/auth/signup" // Endpoint for Sign Up
          : "https://goldenbite-restaurant-backend.onrender.com/auth/signin"; // Endpoint for Login

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Result", result);
      if (response.ok) {
        console.log("Success:", result);
        if (Auth === "signup") {
          // Redirect to login page after successful signup
          navigate("/login");
        } else {
          // Save user and token in localStorage for login
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          // Navigate to the home page after successful login
          navigate("/");
        }
      } else {
        console.error("Error:", result.message);
        alert(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Validation function
  const validateForm = (formData, Auth) => {
    const errors = {};

    if (Auth === "signup" && !formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Auth === "signup" && !formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (
      Auth === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto w-full">
      {Auth === "login" && (
        <h2 className="text-2xl mt-[20%] font-bold text-center mb-6">Log In</h2>
      )}
      {Auth === "signup" && (
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      )}
      <form className="space-y-4 mt-[20px]" onSubmit={handleSubmit}>
        {/* Conditional Fields */}
        {Auth === "signup" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={`w-full p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-indigo-400`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </>
        )}
        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        {Auth === "signup" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className={`w-full p-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded focus:ring-2 focus:ring-indigo-400`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {Auth === "signup" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        {Auth === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            Auth === "signup" ? navigate("/login") : navigate("/register");
          }}
          className="text-indigo-600 hover:underline focus:outline-none"
        >
          {Auth === "signup" ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Form;
