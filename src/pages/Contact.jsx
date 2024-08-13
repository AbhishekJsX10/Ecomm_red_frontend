import React from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-zinc-800 text-white p-6 min-h-screen">
      {/* Left Side Image */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
           src="https://github.com/techinfo-youtube/ecommerce-app-2023/blob/main/client/public/images/contactus.jpeg?raw=true" // replace with your image URL
          alt="Contact Us"
          className="object-cover"
        />
      </div>

      {/* Right Side Contact Information */}
      <div className="md:w-1/2 w-full mx-auto flex flex-col justify-center items-center p-6">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Contact Us</h2>
          <p className="mb-4 text-center md:text-left">
            Any query and info about products? Feel free to call anytime, we are available 24/7.
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <AiOutlineMail className="h-6 w-6" />
              <a href="mailto:help@ecommerceapp.com" className="underline">
                help@ecommerceapp.com
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <AiOutlinePhone className="h-6 w-6" />
              <span>012-3456789</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <AiOutlinePhone className="h-6 w-6" />
              <span>1800-0000-0000 (toll free)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
