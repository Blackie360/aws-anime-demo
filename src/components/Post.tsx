"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Schema } from "../../amplify/data/resource";

const Post = ({
  post,
  onDelete,
  isSignedIn,
}: {
  post: Pick<Schema["Post"]["type"], "title" | "id">;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const router = useRouter();
  const onDetail = () => {
    router.push(`posts/${post.id}`);
  };

  return (
    <div className="border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-full p-4 rounded-lg flex justify-between items-center gap-4">
      <button 
        onClick={onDetail} 
        className="flex items-center gap-2 text-left w-full"
        aria-label={`View details for ${post.title}`}
      >
        <div className="font-semibold text-gray-800">Title:</div>
        <div className="text-gray-900 font-medium truncate">{post.title}</div>
      </button>
      {isSignedIn ? (
        <button
          className="text-red-600 hover:text-red-800 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
          onClick={() => onDelete(post.id)}
          aria-label={`Delete post ${post.title}`}
        >
          <span className="text-xl">&times;</span>
        </button>
      ) : null}
    </div>
  );
};

export default Post;
