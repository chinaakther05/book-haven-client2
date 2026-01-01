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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,   // 🔥 element ব্যবহার
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      { path: "allBooks", element: <AllBooks /> },
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
        path: "myBooks",
        element: (
          <PrivateRoute>
            <MyBooks />
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
