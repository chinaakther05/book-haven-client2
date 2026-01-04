import React, { useState, useEffect } from "react";

const Support = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-primary animate-pulse">
          Loading support...
        </p>
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-10 text-center text-primary dark:text-gray-100">
        Help & Support
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">
          How to Use the Site
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-800 dark:text-gray-200">
          <li>Browse books on the "All Books" page.</li>
          <li>Add your favorite books using the "Add Book" page.</li>
          <li>View and edit your books in "My Books".</li>
          <li>Check your profile and update information in "My Profile".</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">
          Contact Support
        </h2>
        <p className="mb-4 text-gray-800 dark:text-gray-200">
          Facing any problem? Reach out to us, and we'll respond as soon as possible.
        </p>
        <a
          href="mailto:support@bookhaven.com"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          Email Support
        </a>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">FAQs</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-800 dark:text-gray-200">
          <li>
            <strong>How to reset password?</strong> → Currently via your account
            settings.
          </li>
          <li>
            <strong>How to delete a book?</strong> → Go to "My Books" and click
            Delete.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Support;
