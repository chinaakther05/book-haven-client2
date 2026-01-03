import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 dark:text-gray-200 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary dark:text-white tracking-wide">
            📚 The Book Haven
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Explore, read, and share your favorite books with the world.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:text-base">
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            to="allBooks"
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            All Books
          </Link>
          
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>

        {/* Social Links */}
       <div className="flex justify-center gap-6 mb-8 text-gray-400">
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 hover:text-blue-600  transition-colors"
  >
    <FaFacebookF className="text-lg" />
    <span>Facebook</span>
  </a>

  <a
    href="https://github.com/chinaakther05"
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 hover:text-blue-700  transition-colors"
  >
    <FaGithub className="text-lg" />
    <span>GitHub</span>
  </a>

  <a
    href="https://www.linkedin.com/in/china-akther-a384b23a2/"
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 hover:text-blue-700  transition-colors"
  >
    <FaLinkedinIn className="text-lg" />
    <span>LinkedIn</span>
  </a>
 <a
  href="mailto:chinaakther05@gmail.com"
  className="flex items-center gap-2 hover:text-primary transition-colors"
>
  <MdEmail className="text-lg" />
  <span>Email</span>
</a>

</div>

        {/* Copyright */}
       <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
  © {new Date().getFullYear()}{" "}
  <span className="font-semibold text-primary dark:text-primary">
    The Book Haven
  </span>
  . All rights reserved.
</div>


      </div>
    </footer>
  );
};

export default Footer;
