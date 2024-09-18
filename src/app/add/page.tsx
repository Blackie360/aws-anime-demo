import React from "react";
import { createPost } from "@/app/_actions/actions";

const AddPost = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">
        Create a New Post
      </h2>
      <form
        action={createPost}
        className="flex flex-col gap-4"
      >
        {/* Title Input */}
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your title"
          className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 w-full"
        />

        {/* Emoji Picker */}
        <select
          name="emoji"
          id="emoji"
          className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 w-full"
        >
          <option value="">Select an Emoji</option>
          <option value="😊">😊 Smiley</option>
          <option value="🚀">🚀 Rocket</option>
          <option value="🔥">🔥 Fire</option>
          <option value="💡">💡 Lightbulb</option>
          <option value="🎉">🎉 Celebration</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
