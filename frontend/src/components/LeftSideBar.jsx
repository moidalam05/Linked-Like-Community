import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import generateVibrantColorsFromString from "../hooks/generateColorForString";
import profileImage from "../assets/profile.jpg";
import { useEffect } from "react";
import { getUserProfile } from "../features/auth/authSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  let { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchUserData() {
      if (!isAuthenticated) {
        return;
      }
      const apiResponse = await dispatch(getUserProfile());

      if (apiResponse.payload.success === true) {
        console.log(apiResponse.payload.data);
      }
    }
    fetchUserData();
  }, [dispatch, isAuthenticated]);

  const { backgroundColor, textColor } = generateVibrantColorsFromString(
    user?.user?.name
  );

  console.log("user", user);

  if (!isAuthenticated) {
    user = null;
  }
  if (!user)
    return (
      <div className="hidden lg:block w-1/5 p-4 bg-white shadow-sm rounded-lg h-max sticky top-28 z-10 border border-orange-100">
        <h2 className="text-lg font-semibold mb-4">Welcome, there 👋</h2>

        {/* Profile Section */}
        <Link
          to="/profile"
          className="block mb-6 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition"
        >
          {/* Cover Image */}
          <div className="h-20 bg-gradient-to-r from-blue-400 to-cyan-400 relative">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            />
          </div>

          {/* Name and Bio */}
          <div className="pt-10 pb-4 text-center px-2">
            <h3 className="font-semibold text-gray-800">Your Name</h3>
            <p className="text-sm text-gray-500">Your Bio</p>
          </div>
        </Link>

        {/* Menu Links */}
        <ul className="space-y-2 text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">My Profile</li>
          <li className="hover:text-blue-600 cursor-pointer">Connections</li>
          <li className="hover:text-blue-600 cursor-pointer">Saved Posts</li>
        </ul>
      </div>
    );

  return (
    <div className="hidden lg:block w-1/5 p-4 bg-white shadow-sm rounded-lg h-max sticky top-28 z-10 border border-orange-100">
      <h2 className="text-lg font-semibold mb-4">
        Welcome, {user?.user?.name} 👋
      </h2>

      {/* Profile Section */}
      <Link
        to="/profile"
        className="block mb-6 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition"
      >
        {/* Cover Image */}
        <div className="h-20 bg-gradient-to-r from-blue-400 to-cyan-400 relative">
          {/* Profile Image */}
          <p
            className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-2xl font-semibold"
            style={{ backgroundColor, color: textColor }}
          >
            {user?.user?.name.charAt(0)}
          </p>
        </div>

        {/* Name and Bio */}
        <div className="pt-10 pb-4 text-center px-2">
          <h3 className="font-semibold text-gray-800">{user?.user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.user?.bio}</p>
        </div>
      </Link>

      {/* Menu Links */}
      <ul className="space-y-2 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">My Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">Connections</li>
        <li className="hover:text-blue-600 cursor-pointer">Saved Posts</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
