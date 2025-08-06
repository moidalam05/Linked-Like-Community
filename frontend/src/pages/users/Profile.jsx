import React from "react";
import Layout from "../../Layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4 py-28">
        {/* Cover + Profile Section */}
        <div className="relative w-full h-52 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-8"
          />
        </div>

        {/* User Info */}
        <div className="mt-20 ml-40">
          <h2 className="text-2xl font-semibold text-gray-800">Moid Alam</h2>
          <p className="text-sm text-gray-500">
            MERN Stack Developer | Gurugram, India
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span>🚀 245 followers</span>
            <span>🔗 310 connections</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex border-b border-gray-200 space-x-6 text-gray-600 text-sm font-medium">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600">
            Posts
          </button>
          <button className="pb-2 hover:text-blue-600">Collections</button>
          <button className="pb-2 hover:text-blue-600">About</button>
        </div>

        {/* Posts Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Posts</h3>
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="font-semibold text-gray-800">
              How to build a MERN Stack App
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              In this post, I’ll guide you through setting up a full MERN stack
              project...
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="font-semibold text-gray-800">
              Understanding React useEffect
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              useEffect is one of the most important hooks in React. It allows
              you to...
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10 space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">About</h3>
          <p className="text-sm text-gray-600">
            I am a full-stack developer with a passion for building web apps
            using React, Node.js, MongoDB, and Express. I'm always learning and
            exploring new technologies.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
