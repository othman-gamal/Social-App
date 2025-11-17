import { useEffect } from "react";
import PostCard from "../components/Components/Components/PostCard";
import Sidebar from "../components/Components/Components/Sidebar";
import { getAllPosts } from "../services/postServices";
import { useState } from "react";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import CreatePost from "../components/Components/CreatePost";
import { useNavigate } from "react-router-dom";

export default function Newsfeed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  async function getPosts() {
    const { data } = await getAllPosts();
    setPosts(data?.posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-200">
        <div className="container p-5">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 sticky top-12 h-screen overflow-y-auto">
              <Sidebar />
            </div>
            <div className="col-span-2 space-y-5">
              <CreatePost getallposts={getPosts} />
              {posts.length == 0 ? (
                [...Array(5)].map((skeleton, index) => (
                  <PostSkeleton key={index} />
                ))
              ) : (
                <>
                  {posts &&
                    posts.map((post) => (
                      <PostCard
                        getallposts={getPosts}
                        key={post.id}
                        post={post}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
