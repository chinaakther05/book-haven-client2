import React from "react";

const Footer = ({ isDark }) => {
  return (
    <footer className={`p-4 mt-4  text-center transition-colors duration-300 ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      &copy; 2025 The Book Haven. All rights reserved.
    </footer>
  );
};

export default Footer;
