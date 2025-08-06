import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { FaImage, FaSmile, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";

const PostFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, data } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);

  const [postData, setPostData] = useState({
    content: "",
  });

  useEffect(() => {
    async function fetchPosts() {
      const apiResponse = await dispatch(getPosts());

      if (apiResponse.payload.success === true) {
        setPosts(apiResponse.payload.data);
      }
    }
    fetchPosts();
  }, [dispatch, isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const apiResponse = await dispatch(createPost(postData));

    console.log(apiResponse);
    if (apiResponse.payload.success === true) {
      console.log("hello");

      setPostData({ content: "" });
      const apiResponse = await dispatch(getPosts());

      if (apiResponse.payload.success === true) {
        setPosts(apiResponse.payload.data);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* --- Post Form --- */}
      <div className="mb-4 bg-white p-4 rounded-lg shadow border border-orange-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Create a Post
        </h2>
        <form onSubmit={handlePostSubmit} className="space-y-2">
          <textarea
            placeholder="What's on your mind?"
            className="w-full rounded-md p-2 resize-none border border-gray-400"
            rows="3"
            name="content"
            value={postData.content}
            onChange={handleInputChange}
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

      <hr className="border-t border-gray-300 my-4" />

      {/* --- Post Feed --- */}
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            isAuthenticated={isAuthenticated}
            user={data}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
