"use client";
import React, { useState } from "react";
import { Schema } from "../../amplify/data/resource";

const Comments = ({
  addComment,
  post,
  paramsId,
}: {
  addComment: (content: string, post: Schema["Post"]['type'], paramsId: string) => void;
  post: Schema["Post"]['type'];
  paramsId: string;
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const add = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.trim()) {
      setIsSubmitting(true);
      try {
        await addComment(comment, post, paramsId);
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center text-red-700 mb-4">
        Add a Comment
      </h2>
      <form onSubmit={add} className="flex flex-col gap-4">
        {/* Comment Input */}
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Add your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Comments;
