import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useContext } from "react";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { authContext } from "../../context/AuthContext";
import CreatePostModal from "../../pages/CreatePostModal";
import { useState } from "react";
import { DeletePost } from "../../services/postServices";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function PostHeader({ post, photo, name, date, PostUserId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function deleteUserPost(postId) {
    setIsLoading(true);
    try {
      const { data } = await DeletePost(postId);
      queryClient.invalidateQueries(["getPosts"]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div
          className="flex items-center gap-3"
          onClick={() => navigate(`/user-profile/${PostUserId}/posts`)}
        >
          <img
            as
            link
            src={photo}
            alt={name}
            className={`w-12 h-12 rounded-full object-cover not ${
              userData._id == PostUserId
                ? "cursor-pointer  "
                : "pointer-events-none"
            }`}
          />
          <div>
            <h3
              className={`font-semibold text-gray-900 cursor-pointer ${
                userData._id == PostUserId ? "cursor-pointer" : ""
              }`}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(date).toLocaleString("en-us", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
        {userData._id == PostUserId && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <BsThreeDotsVertical className="w-5 h-5" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem onPress={onOpen} key="edit">
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                className="text-danger-500"
                onClick={() => deleteUserPost(post._id)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      {isOpen && (
        <CreatePostModal
          post={post}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </>
  );
}

export default PostHeader;
