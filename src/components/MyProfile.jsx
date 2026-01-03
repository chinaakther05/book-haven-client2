import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const { user, auth } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  // when user data loads
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500">
        User not logged in
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      Swal.fire("Success!", "Profile updated successfully", "success");
      setEditing(false);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Profile
      </h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={photo || "https://i.ibb.co/3d3Qq5M/default-user.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />

        {!editing ? (
          <>
            <h2 className="text-2xl font-semibold">
              {user.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            <button
              onClick={() => setEditing(true)}
              className="btn btn-primary mt-4"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="w-full max-w-sm space-y-3"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full"
            />

            <div className="flex gap-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
