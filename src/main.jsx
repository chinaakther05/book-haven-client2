import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthProvider.jsx';

import RootLayout from './layout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllBooks from './components/AllBooks/AllBooks.jsx';
import Register from './components/Register/Register.jsx';
import AddBook from './components/AddBook/AddBook.jsx';
import MyBooks from './components/myBook/MyBooks.jsx';
import Error from './components/error/Error.jsx';
import BookDetails from './components/bookDetails/BookDetails.jsx';
//import Genres from './components/Genres/Genres.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout, // only reference, not JSX
    children: [
      { index: true, Component: Home },
      
      { path: 'allBooks', Component: AllBooks },
      { path: 'register', Component: Register },
      { path: 'addBooks', Component: AddBook },
      { path: 'myBooks', Component: MyBooks },
      {
        path: '/book-details/:id',
        Component: BookDetails
      },
      { path: '*', Component: Error },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
