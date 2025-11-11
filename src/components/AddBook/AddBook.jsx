import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddBook = () => {
  const { user } = useContext(AuthContext); // Logged-in user info
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBook = {
      title,
      author,
      genre,
      rating,
      summary,
      coverImage,
      userEmail: user.email,
      userName: user.displayName
    };

    try {
      await axios.post('http://localhost:3000/books', newBook);
      toast.success("Book added successfully!");
      setTitle('');
      setAuthor('');
      setGenre('');
      setRating('');
      setSummary('');
      setCoverImage('');
      
    } catch (err) {
      console.log(err);
      toast.error("Failed to add book.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>

      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="input text-black input-bordered"
          />
         
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
            className="input text-black input-bordered"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            required
            className="input text-black input-bordered"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
            className="input text-black input-bordered"
          />
          <textarea
            placeholder="Summary"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
            className="textarea text-black textarea-bordered"
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={coverImage}
            onChange={e => setCoverImage(e.target.value)}
            required
            className="input text-black input-bordered"
          />
          <button type="submit" className="btn btn-primary mt-2">Add Book</button>
        </form>
      )}
    </div>
  );
};

export default AddBook;
