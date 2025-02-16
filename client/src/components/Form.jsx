import React from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ Signup }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extracting form values
    const formData = {
      name: e.target.name?.value || "",
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword?.value || "",
    };

    console.log("Form Data:", formData);

    // API call to login/sign up the user
    try {
      const url = Signup
        ? "http://localhost:3001/auth/signup" // Endpoint for Sign Up
        : "http://localhost:3001/auth/signin"; // Endpoint for Login

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Result", result);
      if (response.ok) {
        console.log("Success:", result);
        // Save user and token in localStorage

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        navigate("/"); // Navigate to the home after success
      } else {
        console.error("Error:", result.message);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("Signup mode:", Signup);

  return (
    <div className="max-w-md mx-auto">
      {!Signup && (
        <h2 className="text-2xl mt-[20%] font-bold text-center mb-6">Log In</h2>
      )}
      <form className="space-y-4 mt-[20px]" onSubmit={handleSubmit}>
        {/* Conditional Fields */}
        {Signup && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
              />
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {Signup && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {Signup ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        {Signup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            Signup ? navigate("/login") : navigate("/signup");
          }}
          className="text-indigo-600 hover:underline focus:outline-none"
        >
          {Signup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Form;
