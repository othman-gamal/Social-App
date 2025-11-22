import { Button } from "@heroui/react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiShareAlt } from "react-icons/bi";
import { BiCamera } from "react-icons/bi";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CreateComment } from "../../services/commentsServices";

function CommentInput({
  post,
  body,
  image,
  fromDetails,
  id,
  setPostComments,
  refetch,
}) {
  const [commentMsg, setCommentnsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function addComment(comment) {
    if (!comment.post) return;
    setIsLoading(true);
    try {
      const data = await CreateComment(comment);
      // setPostComments(data.comments);
      // if (setPostComments) setPostComments(data.comments);
      console.log(data.data.comments);
      if (setPostComments) {
        setPostComments(data.data.comments); // NewsFeed
      } else if (refetch) {
        await refetch(); // PostDetails
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setCommentnsg("");
  }

  function sendComment(e) {
    setCommentnsg(e.target.value);
    console.log(commentMsg);
  }

  return (
    <>
      {/* Comment Input */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          onChange={(e) => {
            sendComment(e);
          }}
          value={commentMsg}
          type="text"
          placeholder="Write your comment"
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          isLoading={isLoading}
          onPress={() => {
            addComment({
              content: commentMsg,
              post: id,
            });
          }}
          size="sm"
          radius="full"
          variant="shadow"
          color="primary"
          disabled={commentMsg ? false : true}
          className="cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FiSend className="w-5 h-5" />
        </Button>
        <button className="text-gray-400 hover:text-gray-600">
          <BiCamera className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default CommentInput;
