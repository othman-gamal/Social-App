import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/postServices";
import { useEffect } from "react";
import { useState } from "react";
import PostHeader from "../components/Post/PostHeader";
import PostBody from "../components/Post/PostBody";
import PostFooter from "../components/Post/PostFooter";
import PostSkeleton from "../components/Skeletons/PostSkeleton";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [postComments, setPostComments] = useState([]);

  async function getPostDetails(postId) {
    try {
      const { data } = await getSinglePost(postId);
      console.log(data);
      setPost(data.post);
      setPostComments(data.post.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPostDetails(id);
  }, [id]);

  return (
    <>
      <div className="max-w-3xl mx-auto m-5 bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <PostSkeleton />
        ) : (
          <>
            {/* Header */}
            <PostHeader
              post={post}
              photo={post.user.photo}
              name={post.user.name}
              date={post.createdAt}
            />
            {/* Content */}
            <PostBody
              post={post}
              id={post._id}
              body={post.body}
              image={post.image}
              fromDetails={true}
              setPostComments={setPostComments}
            />

            {/* Comments */}
            {postComments.length > 0 && (
              <>
                {postComments.map((comment) => (
                  <PostFooter
                    key={comment._id}
                    name={comment.commentCreator.name}
                    photo={comment.commentCreator.photo}
                    content={comment.content}
                    fromDetails={true}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
