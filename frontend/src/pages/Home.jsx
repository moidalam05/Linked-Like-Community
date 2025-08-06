import React from "react";
import Layout from "../Layout/Layout";
import LeftSidebar from "../components/LeftSideBar";
import PostFeed from "../components/PostFeed";
import RightSidebar from "../components/RightSideBar";

const Home = () => {
  return (
    <div>
      <Layout>
        <div className="min-h-screen bg-[#f4f2ee] py-28 px-4 overflow-visible">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 overflow-visible">
            <LeftSidebar />

            <div className="flex-1">
              <PostFeed />
            </div>

            <RightSidebar />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
