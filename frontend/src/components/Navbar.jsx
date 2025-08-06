import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { MdLogout } from "react-icons/md";
import generateVibrantColorsFromString from "../hooks/generateColorForString";

const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, data } = useSelector((state) => state.auth);

  const handleLogout = () => {
    const apiResponse = dispatch(logoutUser());
    if (apiResponse.payload.success === true) {
      window.location.reload();
    }
  };

  const { backgroundColor, textColor } = generateVibrantColorsFromString(
    data?.name
  );

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
            <div className="flex items-center gap-4">
              <button>
                <div
                  className="w-10 h-10 flex justify-center items-center rounded-full text-white font-semibold text-xl"
                  style={{ backgroundColor, color: textColor }}
                >
                  {data?.name.charAt(0).toUpperCase()}
                </div>
              </button>
              <div className="text-md font-semibold ">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="cursor-pointer flex items-center gap-[4px]   "
                >
                  Logout
                  <MdLogout />
                </button>
              </div>
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
