import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

import RootLayout from "./layout/RootLayout";
import Home from "./components/Home/Home";
import AllBooks from "./components/AllBooks/AllBooks";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AddBook from "./components/AddBook/AddBook";
import MyBooks from "./components/myBook/MyBooks";
import Error from "./components/error/Error";
import BookDetails from "./components/bookDetails/BookDetails";
import BookDetailsHome from "./components/bookDetailsHome/BookDetailsHome";
import PrivateRoute from "./context/PrivateRoute";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import MyProfile from "./components/MyProfile";

import Support from "./components/support/Support";
import ManageBooks from "./components/manageBooks/ManageBooks";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,   // 🔥 element ব্যবহার
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      { path: "allBooks", element: <AllBooks /> },
     
      {
        path:'help',
       Component:Support
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      {
        path: "addBooks",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },

     

      {
        path: "book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "book/:id",
        element: <BookDetailsHome />,
      },
    ],
  },
  
    // Dashboard Routes
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <p className="text-2xl">
  Here you can manage all your books and profile.
</p>
 },
           {
            path: '/dashboard/my-profile',
            element: <MyProfile></MyProfile>
           },
            {
        path: "/dashboard/myBooks",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path:'manage-books',
        element: <PrivateRoute> <ManageBooks></ManageBooks> </PrivateRoute>
      },
      
  
        ],
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
