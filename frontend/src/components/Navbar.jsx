import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-cyan-700 to-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          XploreConnect
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/explore" className="hover:underline">
            Explore
          </Link>
          <Link to="/community" className="hover:underline">
            Community
          </Link>
          <Link to="/jobs" className="hover:underline">
            Jobs
          </Link>
        </div>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:inline">Profile</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md z-50">
                  <Link
                    to="/profile/update"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/profile/change-password"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false); // replace with logout logic
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          <HiMenu className="text-3xl" />
        </button>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-900 text-white px-4 pb-4 space-y-3">
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/explore" className="block hover:underline">
            Explore
          </Link>
          <Link to="/community" className="block hover:underline">
            Community
          </Link>
          <Link to="/jobs" className="block hover:underline">
            Jobs
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile/update" className="block hover:underline">
                Update Profile
              </Link>
              <Link
                to="/profile/change-password"
                className="block hover:underline"
              >
                Change Password
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="block w-full text-left hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
