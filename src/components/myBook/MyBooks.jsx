import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update modal state
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
  });

  // Load user's books
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/books?email=${user.email}`)
        .then((res) => {
          setBooks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          toast.error("Failed to load your books!");
        });
    }
  }, [user]);

  // Delete Book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      toast.success("Book deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete book.");
    }
  };

  // Open Update Modal
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: book.rating,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Update
  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/books/${editingBook._id}`,
        formData
      );
      setBooks(
        books.map((b) =>
          b._id === editingBook._id ? { ...b, ...formData } : b
        )
      );
      toast.success("Book updated successfully!");
      setEditingBook(null); // close modal
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="p-4">
      {/* Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-6 text-center">My Books</h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.rating}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-error mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(book)}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editingBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Book</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingBook(null)}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn btn-sm btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
