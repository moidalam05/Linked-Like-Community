import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateBio } from "../../features/auth/authSlice";
import { formatDistanceToNow } from "date-fns";
import generateVibrantColorsFromString from "../../hooks/generateColorForString";
import { MdVerified } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [addBioToggle, setAddBioToggle] = useState(false);
  const [addBio, setAddBio] = useState({
    bio: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUserProfile() {
      await dispatch(getUserProfile());
    }
    fetchUserProfile();
  }, [dispatch]);

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>No profile data found.</div>;

  const { backgroundColor, textColor } = generateVibrantColorsFromString(
    user?.user?.name
  );

  const updateProfileToAddBio = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return navigate("/login");
    }
    const apiResponse = await dispatch(updateBio(addBio));
    if (apiResponse.payload.success === true) {
      setAddBioToggle(false);
      await dispatch(getUserProfile());
      setAddBio({ bio: "" });
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4 py-28">
        <div className="flex flex-col md:flex md:flex-row items-center gap-4 mt-8 ">
          <h2
            className="text-7xl font-bold w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor, color: textColor }}
          >
            {user?.user?.name.charAt(0)}
          </h2>
          <div className="w-full md:w-[80%] text-center md:text-left">
            <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2 justify-center md:justify-start">
              <p className="text-4xl mb-2">{user?.user?.name}</p>
              <MdVerified className="text-blue-600 text-[18px] mt-1" />
            </div>
            <p className="text-[15px] text-gray-500 leading-5">
              {user?.user?.bio}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200 text-gray-600 text-sm font-medium flex flex-col md:flex-row items-center justify-between w-full py-2">
          <button
            onClick={() => {
              setAddBioToggle((prev) => !prev);
            }}
            className="flex items-center gap-2 py-2 text-blue-600 underline cursor-pointer text-lg md:text-xl"
          >
            Add Bio <FaEdit />
          </button>
          <textarea
            name="bio"
            id="bio"
            placeholder="Add your bio"
            className={`${
              addBioToggle ? "block" : "hidden"
            } w-full md:w-[60%] rounded-md p-2 resize-none border border-gray-400 my-2`}
            rows="2"
            value={addBio.bio}
            onChange={(e) => setAddBio({ ...addBio, bio: e.target.value })}
          ></textarea>

          <button
            onClick={updateProfileToAddBio}
            type="submit"
            className={`${
              addBioToggle ? "block" : "hidden"
            } bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer`}
          >
            Add Bio
          </button>
        </div>

        {/* Posts Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Posts</h3>
          {user?.posts?.map((post) => (
            <div key={post._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 flex items-center justify-center text-xl font-semibold rounded-full"
                  style={{ backgroundColor, color: textColor }}
                >
                  {user?.user?.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <p>{user?.user?.name}</p>
                  <p>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <p className="leading-tight text-gray-600 text-[15px]">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
