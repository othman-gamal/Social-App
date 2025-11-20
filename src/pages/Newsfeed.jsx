import { useEffect } from "react";
import PostCard from "../components/Components/Components/PostCard";
import Sidebar from "../components/Components/Components/Sidebar";
import { getAllPosts } from "../services/postServices";
import { useState } from "react";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import CreatePost from "../components/Components/CreatePost";
import { useQuery } from "@tanstack/react-query";

export default function Newsfeed() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getAllPosts(),
    select: (data) => data?.data.posts,
  });

  return (
    <>
      <main className="min-h-screen bg-gray-200">
        <div className="container p-5">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 sticky top-12 h-screen overflow-y-auto">
              <Sidebar />
            </div>
            <div className="col-span-2 space-y-5">
              <CreatePost />
              {isLoading ? (
                [...Array(5)].map((skeleton, index) => (
                  <PostSkeleton key={index} />
                ))
              ) : (
                <>
                  {posts &&
                    posts.map((post) => <PostCard key={post.id} post={post} />)}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
