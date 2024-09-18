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
    <div className="border bg-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full p-4 rounded-lg flex justify-between items-center">
      <button onClick={onDetail} className="flex gap-2 items-center text-left">
        <div className="font-semibold text-gray-700">Title:</div>
        <div className="text-gray-900 font-medium truncate">{post.title}</div>
      </button>
      <input type="hidden" name="id" id="id" value={post.id} />
      {isSignedIn ? (
        <button
          className="text-red-600 hover:text-red-800 transition-colors duration-200 font-bold"
          onClick={() => onDelete(post.id)}
        >
          &times;
        </button>
      ) : null}
    </div>
  );
};

export default Post;
