const RightSidebar = () => {
  return (
    <div className="hidden xl:block w-1/4 p-4 bg-white shadow rounded-lg h-fit sticky top-20">
      <h2 className="text-lg font-semibold mb-4">People you may know</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Drishti Arora</p>
            <p className="text-sm text-gray-500">Student @ Oriental</p>
          </div>
          <button className="text-blue-600 text-sm font-semibold">
            Connect
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Safa Sadaf</p>
            <p className="text-sm text-gray-500">Pharma Researcher</p>
          </div>
          <button className="text-blue-600 text-sm font-semibold">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
