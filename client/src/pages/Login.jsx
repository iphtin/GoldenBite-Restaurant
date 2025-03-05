import React from "react";
import { FaRegCheckCircle, FaLock } from "react-icons/fa";
import Form from "../components/Form";

const Login = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block w-[600px] bg-[#f8f9f9] h-full">
        <div className="flex items-center ml-[10%] mt-[5%]">
          <img
            src="/favicon.ico"
            alt="logo"
            className="w-[40px] h-[40px] rounded-md"
          />
          <h1 className="font-bold ml-[10px]">GoldenBite</h1>
        </div>
        <div className="flex justify-center mt-[20%] items-center">
          <div>
            <div className="w-[200px] h-[200px]">
              <img src="/welcome.png" alt="welcome" className="w-full h-full" />
            </div>
            <div className="flex">
              <FaRegCheckCircle className="text-blue-700 mt-1" />
              <div className="ml-1">
                <h3 className="font-semibold text-[15px]">Email</h3>
                <p className="text-gray-500 text-[12px]">
                  Please provide your email
                </p>
              </div>
            </div>
            <div className="flex mt-6">
              <FaLock className="text-blue-700 mt-1" />
              <div className="ml-1">
                <h3 className="font-semibold text-[15px]">Password</h3>
                <p className="text-gray-500 text-[12px]">
                  Please provide your password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white h-full">
        <div className="flex justify-center mt-[10%] p-4">
          <Form Auth="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
