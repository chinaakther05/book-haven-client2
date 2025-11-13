import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Home = () => {
  
  const [books, setBooks] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-5">
      
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

       
      <section className="my-10 px-6 py-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Latest Added Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books
              .slice(-6)
              .reverse()
              .map((book) => (
                <div
                  key={book._id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
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
                  <p className="text-yellow-500 font-semibold mt-2">
                    ⭐ {book.rating}
                  </p>
                  <Link
                    to={`/book/${book._id}`}
                    className="btn btn-sm btn-primary mt-3 w-full"
                  >
                    View Details
                  </Link>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No books found.</p>
          )}
        </div>
      </section>

      
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

     

    
      <section className="my-10 px-6 py-10 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          About The Book Haven
        </h2>
        <div className="max-w-4xl mx-auto text-center text-gray-700 dark:text-gray-200 space-y-4">
          <p>
            The Book Haven is your ultimate digital library, where book lovers
            can explore, add, and manage their favorite books.
          </p>
          <p>
            Our mission is to connect readers with books they’ll love and
            celebrate the joy of reading.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
