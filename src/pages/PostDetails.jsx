import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/postServices";
import { useQuery } from "@tanstack/react-query";

import PostHeader from "../components/Post/PostHeader";
import PostBody from "../components/Post/PostBody";
import PostFooter from "../components/Post/PostFooter";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import Sidebar from "../components/Components/Components/Sidebar";
import CommentInput from "../components/Post/CommentInput";

export default function PostDetails() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    refetch, // important for refresh after comment edit/delete/add
  } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: () => getSinglePost(id),
  });

  const post = data?.data?.post;
  const comments = post?.comments || [];

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 sticky top-12 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      <div className="max-w-3xl col-span-2 m-5 bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading ? (
          <PostSkeleton />
        ) : (
          <>
            {/* Header */}
            <PostHeader
              post={post}
              PostUserId={post.user._id}
              photo={post.user.photo}
              name={post.user.name}
              date={post.createdAt}
            />

            {/* Body */}
            <PostBody
              post={post}
              id={post._id}
              body={post.body}
              image={post.image}
              fromDetails={true}
              refetch={refetch} // refresh comments after actions
            />

            <CommentInput
              post={post}
              id={post._id}
              body={post.body}
              image={post.image}
              fromDetails={true}
              refetch={refetch}
            />

            {/* Comments */}
            {comments.length > 0 &&
              comments.map((comment) => (
                <PostFooter
                  key={comment._id}
                  post={post}
                  id={post._id}
                  name={comment.commentCreator.name}
                  photo={comment.commentCreator.photo}
                  content={comment.content}
                  fromDetails={true}
                  PostUserId={post.user._id}
                  comment={comment}
                  refetch={refetch} // needed for delete/edit
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
