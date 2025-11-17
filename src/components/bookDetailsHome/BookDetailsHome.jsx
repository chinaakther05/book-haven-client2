import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetailsHome = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get(`https://book-haven-server-seven.vercel.app/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-semibold text-gray-600">
        Loading book details...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 text-xl font-semibold">
        Book not found 😢
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-4 mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Book Image */}
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-72 h-96 object-cover rounded-lg shadow-md"
        />

        {/* Book Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-primary mb-3">{book.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-yellow-500 font-semibold mb-3">
            ⭐ Rating: {book.rating}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {book.summary}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Added by: {book.userEmail}
          </p>

          <div className="flex gap-4">

            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsHome;
