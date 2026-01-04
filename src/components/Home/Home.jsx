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
    <section className="relative h-[75vh] overflow-hidden">
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    navigation={true}
    loop={true}
    className="h-full"
  >
    {[banner1, banner2, banner3, banner4].map((banner, index) => (
      <SwiperSlide key={index}>
        <div
          className="relative h-[75vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl text-center px-6 text-white animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              Welcome to <span className="text-sky-400">The Book Haven</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-200">
              Discover, add & manage your favorite books — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/allBooks"
                className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 transition font-semibold shadow-lg"
              >
                Browse Books
              </Link>

              <Link
                to="/addBooks"
                className="px-8 py-3 rounded-lg border border-white/40 hover:bg-white/10 transition font-semibold backdrop-blur-md"
              >
                Add a Book
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
                  
                    <p className="text-yellow-500 font-semibold">
                      ⭐ {book.rating}
                    </p>
                    <button
                      onClick={() => handleViewDetails(book._id)}
                      className="btn btn-sm w-full rounded-2xl btn-primary"
                    >
                      View Details
                    </button>
                  </div>
              
              ))
          ) : (
            <p className="text-center text-gray-500">No books found.</p>
          )}
        </div>
      </section>

      {/* Book of the Week */}
    <section className="my-14 px-6 py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-6xl mx-auto">
  {/* Title */}
  <div className="text-center mb-10">
    <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400">
      ⭐ Featured
    </span>
    <h2 className="text-4xl font-extrabold text-primary">
      Book of the Week
    </h2>
  </div>

  <div className="flex flex-col md:flex-row items-center gap-10">
    {/* Image (Fixed W & H) */}
    <div className="w-[260px] h-[380px] flex-shrink-0 relative">
      <img
        src={image}
        alt="Book of the Week"
        className="w-full h-full object-cover rounded-xl shadow-xl"
      />
      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        Weekly Pick
      </span>
    </div>

    {/* Content */}
    <div className="max-w-xl">
      <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        The Great Gatsby
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        by F. Scott Fitzgerald
      </p>

      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
        A timeless story about wealth, love, and the American dream — beautifully
        written and deeply meaningful.
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
        The Book Haven isn’t just a library — it’s a community built by readers,
        for readers. Every book matters here.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition shadow-md">
          <Link to='allBooks'> View Book</Link>
         
        </button>
        <button className="px-6 py-3 border border-sky-500 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg font-semibold transition">
        <Link to='addbooks'>Add to NewBook</Link>  
        </button>
      </div>
    </div>
  </div>
</section>





      {/* About Section */}
    

      <div className="bg-white dark:bg-black mt-4 text-gray-700 dark:text-gray-300">
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
