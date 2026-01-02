import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors";

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-gray-200 dark:bg-gray-800 w-64 p-4 transition-all ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <Link to='/' className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Dashboard
        </Link>
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/my-profile" className={linkClass}>
            My Profile
          </NavLink>
          <NavLink to="/dashboard/add-book" className={linkClass}>
            Add Book
          </NavLink>

          {/* Admin Links example */}
          {user?.role === "admin" && (
            <>
              <NavLink to="/dashboard/all-users" className={linkClass}>
                All Users
              </NavLink>
              <NavLink to="/dashboard/manage-books" className={linkClass}>
                Manage Books
              </NavLink>
            </>
          )}
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
            <p className="text-gray-800 dark:text-gray-100">
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

        {/* Nested Routes will render here */}
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
