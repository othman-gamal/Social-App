import PostHeader from "../../Post/PostHeader";
import PostBody from "../../Post/PostBody";
import PostFooter from "../../Post/PostFooter";

import { useState } from "react";

export default function PostCard({ post, getallposts }) {
  const [postComments, setPostComments] = useState(post.comments || []);
  const postId = post._id;

  return (
    <div className=" bg-white rounded-lg shadow-sm border border-gray-200">
      <PostHeader
        getallposts={getallposts}
        post={post}
        PostUserId={post.user._id}
        photo={post.user.photo}
        name={post.user.name}
        date={post.createdAt}
      />

      <PostBody
        post={post}
        id={postId}
        body={post.body}
        image={post.image}
        setPostComments={setPostComments}
      />

      {postComments?.length > 0 && (
        <PostFooter
          PostUserId={post.user._id}
          comment={postComments[0]}
          // commentCreatorId={post.comments.commentCreator._id}
          post={post}
          id={post._id}
          photo={postComments[0]?.commentCreator?.photo}
          name={postComments[0]?.commentCreator?.name}
          content={postComments[0]?.content}
          setPostComments={setPostComments}
        />
      )}
    </div>
  );
}
