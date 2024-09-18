import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";

// Array of random emojis
const emojis = ["🌟", "🔥", "💫", "🎉", "👾", "✨", "🚀", "🌸", "🍀", "⚡"];

function getRandomEmoji() {
  // Pick a random emoji from the array
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export default async function Home() {
  const isSignedIn = await isAuthenticated();
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });
  console.log("posts", posts);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        {isSignedIn ? "Your Anime List" : "Anime Titles from All Users"}
      </h1>

      {/* Post Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {posts?.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Random Emoji with Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {getRandomEmoji()} {post.title}
            </h2>
            <Post
              onDelete={onDeletePost}
              post={post}
              isSignedIn={isSignedIn}
            />
            {isSignedIn && (
              <button
                onClick={() => onDeletePost(post.id)}
                className="mt-4 text-sm text-red-600 hover:underline"
              >
                Delete Post
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        <p>
          {isSignedIn
            ? "Manage your anime listings with ease."
            : "Sign in to manage your own anime titles."}
        </p>
      </footer>
    </main>
  );
}
