import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch books from server
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

  // Sorting function
  const sortBooks = (order, list) => {
    const sorted = [...list].sort((a, b) => {
      if (order === "asc") return a.rating - b.rating;
      else return b.rating - a.rating;
    });
    return sorted;
  };

  // Get unique genres
  const genres = ["All", ...new Set(books.map((b) => b.genre).filter(Boolean))];

  // Filtered & sorted books
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) =>
      selectedGenre === "All" ? true : book.genre === selectedGenre
    );

  const finalBooks = sortBooks(sortOrder, filteredBooks);

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
    <h1 className="text-3xl md:text-4xl text-primary font-extrabold mb-6 text-center uppercase tracking-wider drop-shadow-md">
  All Books
</h1>
<p className="text-center text-gray-700 dark:text-gray-300 mb-4">
  Browse our collection of amazing books. Find your next favorite read!
</p>


      {/* Search, Filter & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-1/3"
        />

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded px-2 py-1 w-full md:w-1/4"
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Sort by Rating:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {finalBooks.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-10">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {finalBooks.map((book) => (
            <div
              key={book._id}
              className="text-black rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-2 flex flex-col bg-white dark:bg-gray-800 dark:text-white"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-[200px] object-cover  hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Author: <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Genre: {book.genre || "N/A"}
              </p>
              <div className="flex justify-between items-center">
                 <p className="text-sm font-semibold mb-2">
                ⭐ Rating: {book.rating || "0"}
              </p>
              <Link
                to={`/book-details/${book._id}`}
                className="btn btn-sm btn-primary mt-auto"
              >
                View Details
              </Link>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
