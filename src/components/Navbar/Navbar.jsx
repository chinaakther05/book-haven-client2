import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import book from "../../assets/Book.jpg";

const Navbar = ({ isDark, setIsDark }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const handleSignOut = () => signOutUser().catch(err => console.log(err));

  const linkClass = "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors";

  return (
    <nav className={`flex justify-between items-center flex-wrap p-4 shadow-lg transition-colors duration-300 ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={book} className="w-10 h-10" alt="Book" />
        <Link to="/" className="font-bold text-xl">The Book Haven</Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden lg:flex gap-2 items-center">
        <li><NavLink to="/" className={({isActive}) => linkClass + (isActive ? " font-bold underline" : "")}>Home</NavLink></li>
        <li><NavLink to="/allBooks" className={({isActive}) => linkClass + (isActive ? " font-bold underline" : "")}>All Books</NavLink></li>
        {user && <>
          <li><NavLink to="/addBooks" className={({isActive}) => linkClass + (isActive ? " font-bold underline" : "")}>Add Book</NavLink></li>
          <li><NavLink to="/myBooks" className={({isActive}) => linkClass + (isActive ? " font-bold underline" : "")}>My Books</NavLink></li>
        </>}
      </ul>

      {/* Right Buttons */}
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-sm btn-outline">
          {isDark ? "🌙 Dark" : "🌞 Light"}
        </button>

        {user ? <>
          <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
            <img src={user.photoURL || "https://i.ibb.co/3d3Qq5M/default-user.png"} className="w-10 h-10 rounded-full" alt="User" />
          </div>
          <button onClick={handleSignOut} className="btn btn-sm btn-error">Log Out</button>
        </> : (
          <Link to="/register" className="btn btn-sm btn-primary">Login</Link>
        )}

        {/* Mobile Dropdown */}
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="lg:hidden btn btn-ghost">☰</button>
      </div>

      {/* Mobile Menu */}
      {dropdownOpen && (
        <ul className={`${isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"} flex flex-col gap-1 p-2 mt-2 rounded shadow-lg lg:hidden transition-colors duration-300`}>
          <li><NavLink to="/" onClick={() => setDropdownOpen(false)} className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/allBooks" onClick={() => setDropdownOpen(false)} className={linkClass}>All Books</NavLink></li>
          {user && <>
            <li><NavLink to="/addBooks" onClick={() => setDropdownOpen(false)} className={linkClass}>Add Book</NavLink></li>
            <li><NavLink to="/myBooks" onClick={() => setDropdownOpen(false)} className={linkClass}>My Books</NavLink></li>
          </>}
          <li>
            <button onClick={toggleTheme} className="btn btn-sm btn-outline w-full">{isDark ? "🌙 Dark" : "🌞 Light"}</button>
          </li>
          <li>
            {user ? <button onClick={handleSignOut} className="btn btn-sm btn-error w-full">Log Out</button> : (
              <Link to="/register" className="btn btn-sm btn-primary w-full text-center">Login</Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
