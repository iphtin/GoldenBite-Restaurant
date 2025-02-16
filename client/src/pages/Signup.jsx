import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import Form from '../components/Form';

const Signup = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='w-[600px] bg-[#f8f9f9] h-full'>
        <div className='flex items-center ml-[10%] mt-[5%]'>
        <img src='/GoldenBite.jpg' alt="logo"
        className='w-[40px] h-[40px] rounded-md' />
        <h1 className='font-bold ml-[10px]'>GoldenBite</h1>
        </div>
       <div className='flex justify-center mt-[20%] items-center'>
        <div>
         <div className='flex'>
          <FaRegCheckCircle className='text-blue-700 mt-1' />
          <div className='ml-1'>  
            <h3 className='font-semibold text-[15px]'>Your Details</h3>
           <p className='text-gray-500 text-[12px]'>Please provide your name and email</p>
          </div>
          </div>
          <div className='flex mt-6'>
          <FaRegCheckCircle className='text-blue-700 mt-1' />
          <div className='ml-1'>  
            <h3 className='font-semibold text-[15px]'>Choose a password</h3>
           <p className='text-gray-500 text-[12px]'>Must be at least 8 characters</p>
          </div>
          </div>
          <div className='flex mt-6'>
          <FaRegCheckCircle className='text-blue-700 mt-1' />
          <div className='ml-1'>  
            <h3 className='font-semibold text-[15px]'>Address</h3>
           <p className='text-gray-500 text-[12px]'>Where you want the food to be deliver</p>
          </div>
          </div>
          <div className='flex mt-6'>
          <FaRegCheckCircle className='text-blue-700 mt-1' />
          <div className='ml-1'>  
            <h3 className='font-semibold text-[15px]'>phone number</h3>
           <p className='text-gray-500 text-[12px]'>So that we can call you when your food is ready</p>
          </div>
          </div>
       </div>
       </div>
      </div>
      <div className='w-full bg-white h-full'>
       {/* <div className='flex justify-center mt-[10%]'> */}
          <Form Signup={true} />
       {/* </div> */}
      </div>
    </div>
  )
}

export default Signup