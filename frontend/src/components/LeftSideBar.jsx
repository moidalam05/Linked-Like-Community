const LeftSidebar = () => {
  return (
    <div className="hidden lg:block w-1/5 p-4 bg-white shadow rounded-lg h-fit sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Welcome, Moid 👋</h2>
      <ul className="space-y-2 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">My Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">Connections</li>
        <li className="hover:text-blue-600 cursor-pointer">Saved Posts</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
