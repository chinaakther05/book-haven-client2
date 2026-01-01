import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://book-haven-server-seven.vercel.app/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sortBooks = (order) => {
    const sorted = [...books].sort((a, b) => {
      if (order === "asc") return a.rating - b.rating;
      else return b.rating - a.rating;
    });
    setBooks(sorted);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-primary animate-pulse">
          Loading books...
        </p>
      </div>
    );

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl md:text-4xl text-red font-bold mb-8 text-center">
        All Books
      </h1>

      {/* Search & Sort */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Box */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by book name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center">
          <label className="mr-2 font-medium">Sort by Rating:</label>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              sortBooks(e.target.value);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="text-black rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-4 flex flex-col bg-white dark:bg-gray-800 dark:text-white"
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Author: <span className="font-medium">{book.author}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Genre: {book.genre}
            </p>
            <p className="text-sm font-semibold mb-2">⭐ Rating: {book.rating}</p>
            <Link
              to={`/book-details/${book._id}`}
              className="btn btn-sm btn-primary mt-auto"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
