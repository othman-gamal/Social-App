import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { IoChevronDown } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import {
  DeleteComment,
  GetPostComments,
} from "../../services/commentsServices";
import { useState } from "react";

function PostFooter({
  post,
  id,
  fromDetails,
  name,
  photo,
  content,
  PostUserId,
  comment,
  setPostComments,
  // commentCreatorId,
}) {
  //   console.log(id);
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteUserComment(commentId) {
    setIsLoading(true);
    try {
      const { data } = await DeleteComment(commentId);
      console.log(data);
      getNewComments(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getNewComments(postId) {
    try {
      const { data } = await GetPostComments(postId);
      console.log(data);
      setPostComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function editComment(commentId) {}

  return (
    <>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={
              photo.includes("/undefined")
                ? "https://linked-posts.routemisr.com/uploads/default-profile.png"
                : photo
            }
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="grow  bg-gray-50 rounded-2xl px-4 py-3">
            <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
            <p className="text-sm text-gray-700 mt-1">{content}</p>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {userData._id == PostUserId &&
                userData._id == comment.commentCreator._id && (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger className="cursor-pointer">
                      <BsThreeDotsVertical className="w-5 h-5" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="edit">Edit</DropdownItem>
                      <DropdownItem
                        key="delete"
                        color="danger"
                        className="text-danger-500"
                        onClick={() => deleteUserComment(comment._id)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
            </>
          )}
        </div>
        <div className="flex items-center">
          <Link
            to={`/post-details/${id}`}
            className={`${
              fromDetails ? "hidden" : " "
            }  flex items-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700`}
          >
            View all comments
            <IoChevronDown className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostFooter;
