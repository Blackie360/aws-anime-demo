"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Schema } from "../../amplify/data/resource";

const Post = ({
  post,
  onDelete,
  isSignedIn,
}: {
  post: Pick<Schema["Post"]["type"], "title" | "id" | "comments">;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const router = useRouter();
  
  const onDetail = () => {
    router.push(`posts/${post.id}`);
  };

  const onAddComment = () => {
    router.push(`/posts/${post.id}/`);
  };

  return (
    <div className="border bg-white shadow-red-400 shadow-md hover:shadow-lg transition-shadow duration-200 w-full p-4 rounded-lg flex flex-col">
      <button onClick={onDetail} className="flex gap-2 items-center mb-4">
        <div className="font-semibold text-gray-700">Title:</div>
        <div className="text-gray-900 font-medium truncate">{post.title}</div>
      </button>
      
      {post.comments && post.comments.length > 0 ? (
        <div className="border-t pt-2 mt-2 text-gray-700">
          <h3 className="text-lg font-semibold">Comments:</h3>
          <ul className="list-disc pl-5">
            {post.comments.map((comment) => (
              <li key={comment.id} className="mb-2">{comment.content}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No comments yet.</p>
      )}

      {isSignedIn && (
        <div className="flex gap-4 mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            onClick={onAddComment}
          >
            Add Comment
          </button>
          <button
            className="text-red-600 hover:text-red-800 transition-colors duration-200 font-bold"
            onClick={() => onDelete(post.id)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
