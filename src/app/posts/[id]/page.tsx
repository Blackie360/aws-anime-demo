import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { addComment, deleteComment } from "@/app/_actions/actions";
import AddComment from "@/components/AddComment";
import React from "react";
import { Schema } from "../../../../amplify/data/resource";

const Posts = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const isSignedIn = await isAuthenticated();
  const { data: post } = await cookieBasedClient.models.Post.get(
    {
      id: params.id,
    },
    {
      selectionSet: ["id", "title"],
      authMode: isSignedIn ? "userPool" : "identityPool",
    }
  );
  
  console.log("post", post);
  
  const { data: allComments } = await cookieBasedClient.models.Comment.list({
    selectionSet: ["content", "post.id", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });

  const comments = allComments.filter(
    (comment) => comment.post.id === params.id
  );

  if (!post) return null;

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold mb-4">Post Information</h1>
      <div className="border rounded-lg w-1/2 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold">Title: {post.title}</h2>
      </div>

      {isSignedIn ? (
        <div className="mt-4 w-full max-w-lg">
          <AddComment
            addComment={addComment}
            paramsId={params.id}
            post={post as Schema["Post"]["type"]}
          />
        </div>
      ) : null}

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-bold">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="w-full p-2 mb-2 rounded border bg-yellow-100 flex justify-between items-center">
              <div className="text-gray-800">{comment.content}</div>
              {isSignedIn && (
                <form
                  action={async (formData) => {
                    "use server";
                    await deleteComment(formData);
                    revalidatePath(`/posts/${params.id}`);
                  }}
                >
                  <input type="hidden" name="id" value={comment.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 font-bold"
                  >
                    &times;
                  </button>
                </form>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
