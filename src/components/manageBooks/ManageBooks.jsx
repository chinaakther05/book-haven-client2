import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all books (admin)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://book-haven-server-seven.vercel.app/books"
        );
        setBooks(res.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load books", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 🔹 Approve book
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `https://book-haven-server-seven.vercel.app/books/${id}`,
        { status: "approved" }
      );

      setBooks((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "approved" } : b
        )
      );

      Swal.fire("Approved!", "Book approved successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to approve book", "error");
    }
  };

  // 🔹 Delete book
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://book-haven-server-seven.vercel.app/books/${id}`
          );

          setBooks((prev) => prev.filter((b) => b._id !== id));

          Swal.fire("Deleted!", "Book deleted successfully", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete book", "error");
        }
      }
    });
  };

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Books (Admin)
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>Title</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.userEmail || "Unknown"}</td>
                  <td>
                    <span
                      className={`badge ${
                        book.status === "approved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.status || "pending"}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {book.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(book._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
