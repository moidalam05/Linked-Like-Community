import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { formatDistanceToNow } from "date-fns";
import generateVibrantColorsFromString from "../../hooks/generateColorForString";
import { MdVerified } from "react-icons/md";

const PublicProfile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("user", user);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>No profile data found.</div>;

  const { backgroundColor, textColor } = generateVibrantColorsFromString(
    user?.user?.name.charAt(0)
  );

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
              {user?.user?.bio}Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Odio sequi corrupti, dolorem laboriosam odit nam
              vero magnam dolor in rem quos mollitia ipsa commodi sit atque
              quibusdam nobis distinctio deleniti voluptatem magni labore!
              Facilis doloremque illo dolorem officia eius. Nulla pariatur nam
              voluptate incidunt, unde illo beatae dolorem nostrum ab.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex border-b border-gray-200 space-x-6 text-gray-600 text-sm font-medium"></div>

        {/* Posts Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Posts</h3>
          {user?.posts.map((post) => (
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

export default PublicProfile;
