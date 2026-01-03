import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import book from "../../assets/Book.jpg";
import { FaHome, FaBook, FaPlusCircle, FaUser } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const Navbar = ({ isDark, setIsDark }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const handleSignOut = () => signOutUser().catch(err => console.log(err));

  const linkClass =
    "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors";

  return (
    <nav
      className={`flex justify-between items-center flex-wrap p-4 shadow-lg transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-gray-100" : "bg-primary text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={book} className="w-10 h-10" alt="Book" />
        <Link to="/" className="font-bold text-white text-xl">
          The Book Haven
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-4 items-center">
        <li className="text-white flex items-center gap-1 group">
          <FaHome className="w-5 h-5 group-hover:text-red-500" />
          <NavLink
            to="/"
            className={({ isActive }) =>
              linkClass +
              (isActive ? " font-bold text-red-500 underline" : "") +
              " group-hover:text-red-500"
            }
          >
            Home
          </NavLink>
        </li>

        <li className="text-white flex items-center gap-1 group">
          <FaBook className="w-5 h-5 group-hover:text-red-500" />
          <NavLink
            to="/allBooks"
            className={({ isActive }) =>
              linkClass +
              (isActive ? " font-bold text-red-500 underline" : "") +
              " group-hover:text-red-500"
            }
          >
            All Books
          </NavLink>
        </li>

        <li className="text-white flex items-center gap-1 group">
          <FaInfoCircle className="w-5 h-5 group-hover:text-red-500" />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              linkClass +
              (isActive ? " font-bold text-red-500 underline" : "") +
              " group-hover:text-red-500"
            }
          >
            About Us
          </NavLink>
        </li>
        <li className="text-white flex items-center gap-1 group">
          <FaInfoCircle className="w-5 h-5 group-hover:text-red-500" />
          <NavLink
            to="help"
            className={({ isActive }) =>
              linkClass +
              (isActive ? " font-bold text-red-500 underline" : "") +
              " group-hover:text-red-500"
            }
          >
            Support
          </NavLink>
        </li>

        {user && (
          <>
            <li className="text-white flex items-center gap-1 group">
              <FaPlusCircle className="w-5 h-5 group-hover:text-red-500" />
              <NavLink
                to="/addBooks"
                className={({ isActive }) =>
                  linkClass +
                  (isActive ? " font-bold text-red-500 underline" : "") +
                  " group-hover:text-red-500"
                }
              >
                Add Book
              </NavLink>
            </li>

            <li className="text-white flex items-center gap-1 group">
              <FaUser className="w-5 h-5 group-hover:text-red-500" />
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  linkClass +
                  (isActive ? " font-bold text-red-500 underline" : "") +
                  " group-hover:text-red-500"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="btn text-white btn-sm btn-outline"
        >
          {isDark ? "🌙 Dark" : "🌞 Light"}
        </button>

        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/3d3Qq5M/default-user.png"
                }
                className="w-10 h-10 rounded-full"
                alt="User"
              />
            </div>

            <button
              onClick={handleSignOut}
              className="btn text-white btn-sm btn-error"
            >
              Log Out
            </button>
          </>
        ) : (
          // ✅ FIXED: login now goes to /login
          <Link to="/login" className="btn text-white btn-sm btn-primary">
            Login
          </Link>
        )}

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="lg:hidden btn btn-ghost"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {dropdownOpen && (
        <ul
          className={`${
            isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
          } flex flex-col gap-1 p-2 mt-2 rounded shadow-lg lg:hidden`}
        >
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allBooks" className={linkClass}>
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="help" className={linkClass}>
              Support
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/addBooks" className={linkClass}>
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          <li>
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline w-full"
            >
              {isDark ? "🌙 Dark" : "🌞 Light"}
            </button>
          </li>

          <li>
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-error w-full"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-primary w-full text-center"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
