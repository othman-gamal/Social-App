import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiShareAlt, BiCamera } from "react-icons/bi";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import PostHeader from "../../Post/PostHeader";
import PostBody from "../../Post/PostBody";
import PostFooter from "../../Post/PostFooter";

// export default function PostCard({ post }) {
//   // console.log(post.comments[0].commentCreator.name);
//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <PostHeader
//         post={post}
//         photo={post.user.photo}
//         name={post.user.name}
//         date={post.createdAt}
//       />
//       {/* Content */}
//       <PostBody post={post} id={post._id} body={post.body} image={post.image} />

//       {/* Comments */}
//       {post.comments.length > 0 && (
//         <PostFooter
//           post={post}
//           id={post._id}
//           photo={post.comments[0].commentCreator.photo}
//           name={post.comments[0].commentCreator.name}
//           content={post.comments[0].content}
//         />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
// import PostHeader from "../../Post/PostHeader";
// import PostBody from "../../Post/PostBody";
// import PostFooter from "../../Post/PostFooter";

export default function PostCard({ post }) {
  const [postComments, setPostComments] = useState(post.comments || []);
  const postId = post._id;

  return (
    <div className=" bg-white rounded-lg shadow-sm border border-gray-200">
      <PostHeader
        post={post}
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
          post={post}
          id={post._id}
          photo={postComments[0]?.commentCreator?.photo}
          name={postComments[0]?.commentCreator?.name}
          content={postComments[0]?.content}
        />
      )}
    </div>
  );
}
