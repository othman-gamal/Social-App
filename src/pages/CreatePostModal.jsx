import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Divider,
} from "@heroui/react";
import { useState } from "react";
import { useRef } from "react";
import { HiPhoto } from "react-icons/hi2";
import { createPost, updatePost } from "../services/postServices";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostModal({
  post,
  isOpen,
  onOpenChange,
  callBack,
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(post?.image || "");
  const [formDataImage, setFormDataImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const fileInput = useRef();
  const PostMsg = useRef();

  function getFileInput() {
    fileInput.current.click();
  }
  function getFile() {
    const file = fileInput.current.files[0];
    setFormDataImage(file);
    setSelectedPhoto(URL.createObjectURL(file));
  }

  async function editPost() {
    const formData = new FormData();
    formData.append("body", PostMsg.current.value || " ");
    if (formDataImage) {
      formData.append("image", formDataImage);
    }
    setIsLoading(true);
    try {
      if (post) {
        const { data } = await updatePost(post._id, formData);
        console.log(data);
      } else {
        const { data } = await createPost(formData);
        console.log(data);
      }
      onOpenChange(false);
      queryClient.invalidateQueries(["getPosts"]);
      // callBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={() => {
          onOpenChange(false);
          if (!post) {
            setFormDataImage("");
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                {post ? "Update" : "Create"} Post
              </ModalHeader>
              <Divider />
              <ModalBody className="p-4">
                <Textarea
                  defaultValue={post?.body || ""}
                  ref={PostMsg}
                  minRows={`${selectedPhoto ? "" : 50}`}
                  placeholder="What's in your mind, Demb?"
                />
                {selectedPhoto && (
                  <img src={selectedPhoto} alt="user's Selected Photo" />
                )}
                <Divider />
                <div className="flex items-center gap-2 p-4">
                  <span className="font-semibold">
                    Add to Your Post {post ? "Updates" : ""}:
                  </span>
                  <span>
                    <HiPhoto
                      onClick={getFileInput}
                      className="text-2xl cursor-pointer text-green-600"
                    />
                  </span>
                  <input
                    ref={fileInput}
                    onChange={getFile}
                    type="file"
                    className="hidden"
                  />
                </div>
              </ModalBody>

              <Button
                isLoading={isLoading}
                onPress={editPost}
                className="m-4"
                color="primary"
              >
                {post ? "Update" : "Post"}
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
//backdrop="opaque"
