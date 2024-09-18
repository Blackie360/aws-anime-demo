import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  const isSignedIn = await isAuthenticated();

  // Fetch posts with comments
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id", "comments.id", "comments.content"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });

  console.log("posts", posts);

  return (
    <main className="flex flex-col items-center justify-between p-24 w-full max-w-4xl mx-auto gap-4">
      <h1 className="text-2xl font-bold text-gray-900 pb-10">
        List Of All Animes{!isSignedIn ? " (" : ""}
      </h1>
      {posts?.map((post, idx) => (
        <Post
          onDelete={onDeletePost}
          post={post}
          key={post.id}  
          isSignedIn={isSignedIn}
        />
      ))}
    </main>
  );
}
