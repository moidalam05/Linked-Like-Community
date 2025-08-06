import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";

const PostCard = ({ post, currentUserId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const isOwner = currentUserId === post.userId;

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-2 relative border border-orange-100">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{post.name}</h2>
          <p className="text-sm text-gray-500">{post.designation}</p>
          <p className="text-xs text-gray-400">{post.timeAgo}</p>
        </div>

        {/* Three Dots Menu */}
        {isOwner && (
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
                  onClick={() => alert("Delete clicked")}
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
      <div className="mt-4 text-gray-800 whitespace-pre-line">
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
