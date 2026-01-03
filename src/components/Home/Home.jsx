import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import banner1 from "../../assets/bannar.jpg";
import banner2 from "../../assets/bannar 2.jpg";
import banner3 from "../../assets/bannar3.jpg";
import banner4 from "../../assets/bannar 4.jpg";
import image from "../../assets/images2 (7).jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://book-haven-server-seven.vercel.app/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Handle View Details
  const handleViewDetails = (bookId) => {
    if (!user) {
      navigate("/login"); // login না থাকলে redirect
    } else {
      navigate(`/book/${bookId}`); // login থাকলে details page
    }
  };

  return (
    <div className="mt-5 bg-gray-200 dark:bg-gray-900">
      {/* Banner Section */}
      <section className="relative h-[70vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-full"
        >
          {[banner1, banner2, banner3, banner4].map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{ backgroundImage: `url(${banner})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center text-white px-4">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                    Welcome to The Book Haven
                  </h1>
                  <p className="text-lg lg:text-2xl mb-6">
                    Discover, Add & Manage Your Favorite Books
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/allBooks" className="btn btn-primary btn-lg">
                      All Books
                    </Link>
                    <Link to="/addBooks" className="btn btn-primary btn-lg">
                      Create Book
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Added Books */}
      <section className="my-10 px-6 py-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Latest Added Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {books.length > 0 ? (
            books
              .slice(-8)
              .reverse()
              .map((book) => (
                <div
                  key={book._id}
                  className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-60 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    by {book.author}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-yellow-500 font-semibold">
                      ⭐ {book.rating}
                    </p>
                    <button
                      onClick={() => handleViewDetails(book._id)}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No books found.</p>
          )}
        </div>
      </section>

      {/* Book of the Week */}
      <section className="my-10 px-6 bg-gray-200 dark:bg-gray-800 py-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Book of the Week
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={image}
            alt="Book of the Week"
            className="w-150 h-90 object-cover rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-primary">
              The Great Gatsby
            </h3>
            <p className="text-gray-700 dark:text-gray-200">
              A timeless story about wealth, love, and the American dream —
              beautifully written by F. Scott Fitzgerald.
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              The Book Haven isn’t just a library — it’s a community built by
              readers, for readers. We celebrate every voice, every story, and
              every shared moment of discovery.
            </p>
          </div>
        </div>
      </section>



      {/* About Section */}
    

      <div className="bg-gray-200 dark:bg-black mt-4 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">
            About Us
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Learn more about who we are, what we do, and why we love books.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 Welcome to The Book Haven
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The Book Haven is a modern online platform where book lovers can
              explore, discover, and share their favorite books. Our mission is
              to make reading more accessible and enjoyable for everyone.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              We provide a clean, user-friendly experience with powerful
              features like book listings, detailed pages, user reviews, and a
              personalized dashboard.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you are a casual reader or a passionate book collector,
              The Book Haven is built for you.
            </p>
          </div>

          {/* Image / Highlight Card */}
          <div className="bg-white hover:bg-pink-200 dark:bg-gray-900 rounded-2xl shadow p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🌟 Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              To create a trusted and inspiring space where readers can connect
              with books that shape ideas, knowledge, and imagination.
            </p>
          </div>
        </div>

      </div>
    </div> 
    </div>
  );
};

export default Home;
