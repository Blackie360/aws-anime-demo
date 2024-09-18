"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/_actions/actions";

const AddPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Create FormData object
    const formData = new FormData(event.currentTarget);

    try {
      // Pass FormData to createPost
      await createPost(formData);

      // Redirect to home page after successful submission
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">
        Create a New Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* Title Input */}
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your title"
          className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 w-full"
          disabled={isSubmitting}
        />

        {/* Emoji Picker */}
        <select
          name="emoji"
          id="emoji"
          className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 w-full"
          disabled={isSubmitting}
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
          className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
