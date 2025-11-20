import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";

import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";

import {
  DeleteComment,
  editComment,
  GetPostComments,
} from "../../services/commentsServices";

function PostFooter({
  id,
  fromDetails,
  name,
  photo,
  content,
  PostUserId,
  comment,
  setPostComments, // only exists in newsfeed
  refetch, // only exists in post details
}) {
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(content);

  async function refreshComments() {
    // If we came from Newsfeed → use local state
    if (setPostComments) {
      const { data } = await GetPostComments(id);
      setPostComments(data.comments);
    }

    // If we came from PostDetails → refetch entire post
    if (refetch) {
      await refetch();
    }
  }

  async function deleteUserComment() {
    setIsLoading(true);
    try {
      await DeleteComment(comment._id);
      await refreshComments();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveEdit() {
    if (!editedText.trim()) return;
    setIsLoading(true);

    try {
      await editComment(comment._id, editedText);
      await refreshComments();
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <img
          src={
            photo.includes("/undefined")
              ? "https://linked-posts.routemisr.com/uploads/default-profile.png"
              : photo
          }
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="grow bg-gray-50 rounded-2xl px-4 py-3">
          <h4 className="font-semibold text-sm">{name}</h4>

          {!isEditing && <p className="text-sm mt-1">{content}</p>}

          {isEditing && (
            <div className="flex flex-col gap-2 mt-2">
              <textarea
                className="border rounded-lg p-2 text-sm w-full"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />

              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditedText(content);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {!isLoading ? (
          userData._id === PostUserId &&
          userData._id === comment.commentCreator._id && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <BsThreeDotsVertical className="w-5 h-5 cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit" onClick={() => setIsEditing(true)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  onClick={deleteUserComment}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        ) : (
          <Spinner />
        )}
      </div>

      {!fromDetails && (
        <Link
          to={`/post-details/${id}`}
          className="flex justify-center text-gray-500 text-sm mt-3 hover:text-gray-700"
        >
          View all comments
        </Link>
      )}
    </div>
  );
}

export default PostFooter;
