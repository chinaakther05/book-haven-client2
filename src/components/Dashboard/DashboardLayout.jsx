import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdDashboard, MdPerson, MdBook, MdLibraryBooks, MdPeople, MdManageAccounts } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors";

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-gray-200 dark:bg-gray-800 w-64 p-4 transition-all ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <Link
          to="/"
          className="text-2xl font-bold mb-6 inline-block text-gray-800 dark:text-gray-100"
        >
          📚 Book Haven
        </Link>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? "bg-emerald-300 text-white font-semibold" : "text-gray-800 dark:text-gray-100"
              }`
            }
          >
            <MdDashboard className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800 dark:text-gray-100"
              }`
            }
          >
            <MdPerson className="text-lg" />
            <span>My Profile</span>
          </NavLink>

          

          <NavLink
            to="/dashboard/myBooks"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800 dark:text-gray-100"
              }`
            }
          >
            <FaBookOpen className="text-lg" />
            <span>My Books</span>
          </NavLink>


       <NavLink
  to="/dashboard/manage-books"
  className={({ isActive }) =>
    `${linkClass} ${isActive ? "bg-blue-500 text-white font-semibold" : ""}`
  }
>
  <MdLibraryBooks className="mr-2 text-lg" />
  <span>Manage Books</span>
</NavLink>

            
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-sm lg:hidden"
          >
            ☰
          </button>

          <div className="flex items-center gap-4">
            <p className="text-gray-800 dark:text-gray-100 font-medium">
              {user?.displayName || "User"}
            </p>
            <button
              onClick={signOutUser}
              className="btn btn-sm btn-error"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Nested Routes */}
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
