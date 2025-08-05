const PostFeed = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-orange-100">
      <h2 className="text-xl font-semibold mb-4">Community Feed</h2>
      <div className="space-y-4">
        <div className="p-3 border rounded">
          <p className="text-sm text-gray-700">✨ Welcome to XploreNexus!</p>
        </div>
        <div className="p-3 border rounded">
          <p className="text-sm text-gray-700">
            🚀 Moid just posted something amazing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
