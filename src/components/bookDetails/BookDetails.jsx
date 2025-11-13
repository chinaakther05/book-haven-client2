import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // 🕒 সময় দেখানোর জন্য
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext"; // 🧠 লগইন ইউজারের ইনফো

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ বইয়ের ডেটা লোড করো
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => toast.error("Failed to load book details!"));

    // ✅ কমেন্টস ফেচ করো
    axios
      .get(`http://localhost:3000/comments?bookId=${id}`)
      .then((res) => setComments(res.data))
      .catch(() => toast.error("Failed to load comments!"));
  }, [id]);

  // ✅ কমেন্ট সাবমিট করো
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Write something first!");

    const commentData = {
      bookId: id,
      text: newComment,
      userName: user?.displayName || "Anonymous",
      userPhoto: user?.photoURL || "https://i.ibb.co/2Y7t2Cv/default-user.png",
      date: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:3000/comments", commentData);
      setComments([...comments, res.data]); // রিয়েল টাইমে নতুন কমেন্ট দেখাবে
      setNewComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment!");
    }
  };

  if (!book)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster position="top-right" />

      {/* ✅ বইয়ের তথ্য */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Rating:</span> {book.rating}
          </p>
          <p className="text-gray-700 mt-4">{book.summary}</p>
        </div>
      </div>

      {/* ✅ Comment Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments 💬</h2>

        {/* কমেন্ট লিস্ট */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b py-3">
              <div className="flex items-center gap-3">
                <img
                  src={comment.userPhoto}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-800">{comment.text}</p>
            </div>
          ))
        )}

        {/* ✅ Add New Comment */}
        {user ? (
          <form onSubmit={handleAddComment} className="mt-5 flex gap-3">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="input input-bordered w-full text-black"
            />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        ) : (
          <p className="mt-4 text-gray-500">Please log in to comment.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
