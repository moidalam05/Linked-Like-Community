import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    setPasswordValidations({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password)
      return toast.error("All fields are required");
    if (
      !passwordValidations.length ||
      !passwordValidations.uppercase ||
      !passwordValidations.number ||
      !passwordValidations.specialChar
    )
      return;

    if (!email.includes("@") && !email.includes(".com")) {
      return toast.error("Please enter a valid email address");
    }

    const apiResponse = await dispatch(registerUser(userData));

    if (apiResponse.payload.success === true) {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#e3f2fd] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Password enter instruction */}
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p
              className={
                passwordValidations.length ? "text-green-600" : "text-red-600"
              }
            >
              {passwordValidations.length ? "✅" : "❌"} At least 6 characters
            </p>
            <p
              className={
                passwordValidations.uppercase
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {passwordValidations.uppercase ? "✅" : "❌"} One uppercase letter
            </p>

            <p
              className={
                passwordValidations.number ? "text-green-600" : "text-red-600"
              }
            >
              {passwordValidations.number ? "✅" : "❌"} One number
            </p>
            <p
              className={
                passwordValidations.specialChar
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {passwordValidations.specialChar ? "✅" : "❌"} One special
              character (!@#$%^&*)
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-400 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Create an account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
