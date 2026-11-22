"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

 const handleUpdateProfile = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const { error } = await authClient.updateUser({
      name: name,
      image: image,
    });

    if (error) {
      throw new Error(error.message || "Profile update failed");
    }

    setMessage("Profile updated successfully!");

  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please login first.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <form onSubmit={handleUpdateProfile} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Profile Image URL
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Page;