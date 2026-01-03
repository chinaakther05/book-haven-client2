import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-200 dark:bg-black text-gray-700 dark:text-gray-300 min-h-screen">
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
  );
};

export default AboutUs;
