import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2'; // <- SweetAlert2 import

const AddBook = () => {
  const { user } = useContext(AuthContext);
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
      await axios.post('https://book-haven-server-seven.vercel.app/books', newBook);
      
      // SweetAlert2 success alert
      Swal.fire({
        icon: 'success',
        title: 'Book Added!',
        text: 'Your book has been added successfully.',
        timer: 2000,
        showConfirmButton: false
      });

      // Reset form
      setTitle('');
      setAuthor('');
      setGenre('');
      setRating('');
      setSummary('');
      setCoverImage('');

    } catch (err) {
      console.log(err);
      // SweetAlert2 error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Unable to add book. Please try again.',
      });
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
