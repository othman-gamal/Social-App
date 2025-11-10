import { useEffect } from "react";
import PostCard from "../components/Components/Components/PostCard";
import Sidebar from "../components/Components/Components/Sidebar";
import { getAllPosts } from "../services/postServices";
import { useState } from "react";

export default function Newsfeed() {
  const [posts, setPosts] = useState([]);
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
        <div className="container">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2">
              {posts &&
                posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
