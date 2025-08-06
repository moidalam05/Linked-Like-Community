import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthenticated, data } = useSelector((state) => state.auth);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    const apiResponse = dispatch(logoutUser());
    if (apiResponse.payload.success === true) {
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white text-gray-500 shadow-md border-b fixed w-full border-b-orange-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between ">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black tracking-wide">
          XploreConnect
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "hover:underline"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "hover:underline"
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "hover:underline"
            }
          >
            Jobs
          </NavLink>
        </div>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:underline text-black font-semibold"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold text-xl">
                  {data?.name.charAt(0).toUpperCase()}
                </div>
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
                      setDropdownOpen(false);
                      handleLogout();
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
        <div className="md:hidden bg-white text-gray-500 px-4 pb-4 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "block hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "block hover:underline"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "block hover:underline"
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? "underline text-black" : "block hover:underline"
            }
          >
            Jobs
          </NavLink>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block hover:underline text-black font-semibold"
              >
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
                onClick={handleLogout}
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
