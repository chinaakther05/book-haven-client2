import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams(); // URL থেকে book id নেওয়া
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`) // server থেকে book fetch
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load book details!");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  if (!book)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 text-lg">Book not found</p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl text-red font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="text-red font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Rating:</span> {book.rating}
          </p>
          <p className="text-gray-700 mt-4">{book.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
