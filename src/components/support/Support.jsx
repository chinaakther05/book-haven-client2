import React from "react";

const Support = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Help / Support</h1>

      <p className="mb-4">
        Welcome to The Book Haven Help Center! Here we are ready to assist you with any issues or questions you might have.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How to Use the Site:</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Browse books on the "All Books" page.</li>
        <li>Add your favorite books using the "Add Book" page.</li>
        <li>View and edit your books in "My Books".</li>
        <li>Check your profile and update information in "My Profile".</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Contact Support:</h2>
      <p className="mb-4">
  If you face any problem, you can reach out through email at{" "}
  <a
    href="mailto:support@bookhaven.com"
    className="text-blue-500 hover:underline"
  >
    support@bookhaven.com
  </a>
  . We will respond as soon as possible.
</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">FAQs:</h2>
      <ul className="list-disc ml-6">
        <li>How to reset password? → Currently via your account settings.</li>
        <li>How to delete a book? → Go to "My Books" and click Delete.</li>
      </ul>
    </div>
  );
};

export default Support;
