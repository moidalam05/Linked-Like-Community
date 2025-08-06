import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import generateColorsFromString from "../hooks/generateColorForString";
import { deletePost, getPosts } from "../features/posts/postSlice";
import { useDispatch } from "react-redux";
import { getPublicProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, isAuthenticated, user, setPosts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const { backgroundColor, textColor } = generateColorsFromString(
    post.author.name
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const handleDeletePost = async () => {
    const apiResponse = await dispatch(deletePost(post._id));
    console.log(apiResponse);

    if (apiResponse.payload) {
      console.log("Post deleted successfully");
      const apiResponse = await dispatch(getPosts());

      if (apiResponse.payload.success === true) {
        setPosts(apiResponse.payload.data);
      }
    }
  };

  const getPublicUserProfile = async (userId) => {
    const apiResponse = await dispatch(getPublicProfile(userId));
    console.log(apiResponse);
    if (apiResponse.payload.success === true) {
      navigate(`/profile/${apiResponse?.payload?.data?.user?._id}`);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-2 relative border border-orange-100">
      {/* Header */}
      <div
        onClick={() => getPublicUserProfile(post.author._id)}
        className="flex justify-between items-start"
      >
        <div className="flex gap-2 items-center cursor-pointer">
          <div
            className="w-12 h-12 font-semibold text-xl rounded-full flex items-center justify-center"
            style={{ backgroundColor, color: textColor }}
          >
            {post.author.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{post.author.name}</h2>
            <p className="text-xs text-gray-400">{timeAgo}</p>
          </div>
        </div>

        {/* Three Dots Menu */}
        {isAuthenticated && user._id === post.author._id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-600 hover:text-black"
            >
              <BsThreeDotsVertical size={20} />
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fadeIn">
                <button
                  onClick={() => alert("Edit clicked")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  ✏️ Edit Post
                </button>
                <button
                  onClick={handleDeletePost}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  🗑️ Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-4 text-gray-800 whitespace-pre-line text-[15px]">
        {post.content}
      </div>

      {/* Footer Actions */}
      <div className="flex mt-4 text-gray-600 gap-6 text-sm items-center">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FaRegThumbsUp /> Like
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FaRegCommentDots /> Comment
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
