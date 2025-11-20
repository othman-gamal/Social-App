import { Card, Divider, Input, useDisclosure } from "@heroui/react";

import { IoVideocam } from "react-icons/io5";
import { PiVideoFill } from "react-icons/pi";
import { HiPhoto } from "react-icons/hi2";
import { IoIosHappy } from "react-icons/io";
import CreatePostModal from "../../pages/CreatePostModal";

export default function CreatePost() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card>
        {" "}
        <div className="flex items-center gap-2 p-3">
          {" "}
          <div className="size-12 rounded-full overflow-hidden">
            {" "}
            <img
              src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
              alt=""
            />{" "}
          </div>{" "}
          <Input
            type="text"
            placeholder="what's in your mind, Demb?"
            onClick={onOpen}
            // onFocus={onOpen}
          />
        </div>{" "}
        <Divider />
        <div className="grid grid-cols-4 m-5">
          <div className="col-span-1 flex items-center gap-2 ">
            <span>
              {" "}
              <IoVideocam className="text-4xl text-orange-500" />
            </span>
            <span className="text-black"> Go Live </span>
          </div>
          <div className="col-span-1 flex items-center gap-2 ">
            <span>
              {" "}
              <HiPhoto className="text-4xl text-green-600" />
            </span>
            <span className="text-black"> Go Live </span>
          </div>
          <div className="col-span-1 flex items-center gap-2 ">
            <span>
              {" "}
              <PiVideoFill className="text-4xl text-pink-600" />
            </span>
            <span className="text-black"> Go Live </span>
          </div>
          <div className="col-span-1 flex items-center gap-2  ">
            <span>
              {" "}
              <IoIosHappy className="text-4xl text-blue-500" />
            </span>
            <span className="text-black"> Go Live </span>
          </div>
        </div>
      </Card>
      {isOpen && (
        <CreatePostModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </>
  );
}
