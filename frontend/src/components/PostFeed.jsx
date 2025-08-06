import PostCard from "./PostCard";
import { FaImage, FaSmile, FaPaperPlane } from "react-icons/fa";

const posts = [
  {
    _id: "1",
    name: "Akashdeep Singh",
    designation: "Mern stack || React.js developer || tailwind css|| Next.js",
    content: "I'm interested",
    userId: "123",
    timeAgo: "5d",
  },
  {
    _id: "1",
    name: "Akashdeep Singh",
    designation: "Mern stack || React.js developer || tailwind css|| Next.js",
    content: "I'm interested",
    userId: "123",
    timeAgo: "5d",
  },
  {
    _id: "1",
    name: "Akashdeep Singh",
    designation: "Mern stack || React.js developer || tailwind css|| Next.js",
    content: "I'm interested",
    userId: "123",
    timeAgo: "5d",
  },
];

const PostFeed = () => {
  const currentUserId = "123";

  return (
    <div className="max-w-2xl mx-auto">
      {/* --- Post Form --- */}
      <div className="mb-4 bg-white p-4 rounded-lg shadow border border-orange-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Create a Post
        </h2>
        <form className="space-y-2">
          <textarea
            placeholder="What's on your mind?"
            className="w-full rounded-md p-2 resize-none border border-gray-400"
            rows="3"
          ></textarea>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-gray-500">
              <FaImage className="cursor-pointer" title="Add image" />
              <FaSmile className="cursor-pointer" title="Add emoji" />
            </div>

            <button
              type="submit"
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              <FaPaperPlane /> Post
            </button>
          </div>
        </form>
      </div>

      {/* --- Divider --- */}
      <hr className="border-t border-gray-300 my-4" />

      {/* --- Post Feed --- */}
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
