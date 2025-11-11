import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/bannar.jpg"; // Banner image path
import image from '../../assets/images2 (7).jpg'

const Home = () => {
  return (
    <div className="mt-5">

      {/* 1️⃣ Banner */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fadeInDown">
            Welcome to The Book Haven
          </h1>
          <p className="text-lg lg:text-2xl mb-6 animate-fadeInUp">
            Discover, Add & Manage Your Favorite Books
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/allBooks"
              className="btn btn-primary btn-lg animate-bounce"
            >
              All Books
            </Link>
            <Link
              to="/addBooks"
              className="btn btn-primary btn-lg animate-bounce delay-150"
            >
              Create Book
            </Link>
          </div>
        </div>
      </section>

    
      
      {/* 3️⃣ Book of the Week Section */}
      <section className="my-10 px-6 bg-gray-100 dark:bg-gray-800 py-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Book of the Week
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={image}
            alt="Book of the Week"
            className="w-80 h-90 object-cover rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-primary">
              The Great Gatsby
            </h3>
            <p className="text-gray-700 dark:text-gray-200">
              A timeless story about wealth, love, and the American dream —
              beautifully written by F. <br /> Scott Fitzgerald. This week's featured
              book will inspire readers with <br /> its classic tale of ambition and
              romance.
            </p>
          </div>
        </div>
      </section>
        {/* 4️⃣ About The Book Haven Section */}
<section className="my-10 px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
  <h2 className="text-3xl font-bold text-center mb-6 text-primary">
    About The Book Haven
  </h2>
  <div className="max-w-4xl mx-auto text-center text-gray-700 dark:text-gray-200 space-y-4">
    <p>
      The Book Haven is your ultimate digital library, where book lovers can explore, add, and manage their favorite books. Whether you're into fantasy, mystery, romance, or science fiction, we provide a space to discover new reads and keep track of your personal collection.
    </p>
    <p>
      Our mission is to connect readers with books they’ll love, provide a seamless way to manage your collection, and celebrate the joy of reading. Join our community and be part of The Book Haven today!
    </p>
  </div>
</section>


      
    </div>
  );
};

export default Home;
