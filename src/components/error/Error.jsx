import React from "react";
import { useNavigate } from "react-router-dom";
import errorImg from "../../assets/error.webp";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mt-10 text-center px-4">
      <img
        className="w-[400px] h-[300px] mb-4"
        src={errorImg}
        alt="Error Illustration"
      />
      <h1 className="text-5xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-xl mb-6 text-gray-600">Page Not Found !!</p>

      {/* Back/Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;
