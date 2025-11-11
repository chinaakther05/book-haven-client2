import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-3 text-center border-t border-gray-700">
      <h2 className="text-3xl font-bold mb-3 text-white tracking-wide">
        📚 The Book Haven
      </h2>

      <p className="text-gray-400 text-sm md:text-base mb-6">
        Explore, Read & Share your favorite books with the world.
      </p>

      <div className="flex justify-center gap-6 mb-6">
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>

      <div className="border-t border-gray-700 pt-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">The Book Haven</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
