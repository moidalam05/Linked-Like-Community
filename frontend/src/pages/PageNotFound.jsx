import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200 text-gray-800 px-4">
      <div className="text-[8rem] animate-bounce">🚫</div>

      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl text-center max-w-md mb-6 animate-fade-in">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 animate-fade-in"
      >
        Go Back Home
      </Link>

      {/* Custom animation with Tailwind */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;
