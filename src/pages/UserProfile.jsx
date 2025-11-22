import {
  User,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Divider,
} from "@heroui/react";
import Sidebar from "../components/Components/Components/Sidebar";
import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { uploadUserImage, changePassword } from "../services/AuthServices";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
// import { id } from "zod/v4/locales";
import { getUserPosts } from "../services/postServices";
import { useParams } from "react-router-dom";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import PostCard from "../components/Components/Components/PostCard";
import { UserIcon } from "lucide-react";
import { CameraIcon } from "lucide-react";

export default function UserProfile() {
  const { userData, setToken } = useContext(authContext);

  const id = userData?._id;
  // ----------------------------
  // States for Change Password
  // ----------------------------
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // ----------------------------
  // Password Change Mutation
  // ----------------------------
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      setIsPasswordModalOpen(false);
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Wrong credentials");
    },
  });

  function handlePasswordSubmit() {
    if (!oldPass || !newPass || !confirmPass) {
      return toast.warning("Please fill all fields");
    }

    if (newPass !== confirmPass) {
      return toast.error("New passwords do not match");
    }

    changePasswordMutation.mutate({
      password: oldPass,
      newPassword: newPass,
    });
  }

  // ----------------------------
  // Upload Image Mutation
  // ----------------------------
  const uploadImageMutation = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: () => {
      toast.success("Image updated!");
    },
    onError: () => {
      toast.error("Failed to upload image.");
    },
  });

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    uploadImageMutation.mutate(formData);
  }
  //===================================
  const { data: posts, isLoading } = useQuery({
    queryKey: ["getUserPosts", id],
    queryFn: () => getUserPosts(id),
    select: (data) => data.posts, // direct access
  });

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }

  return (
    <div className="p-6">
      <div className="h-40 w-full bg-linear-to-r from-[#0C2B4E] via-[#8ABEB9] to-[#305669] flex items-center"></div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1 sticky top-12 h-screen overflow-y-auto">
          <Sidebar />
        </div>

        <div className="col-span-2 space-y-5 p-5">
          <div className="flex justify-between items-center gap-5">
            <User
              avatarProps={{
                src:
                  userData?.photo ||
                  "https://avatars.githubusercontent.com/u/30373425?v=4",
                className: "w-20 h-20",
              }}
              name={<p className="text-2xl font-semibold">{userData?.name}</p>}
              description={
                <p className="text-lg text-gray-600">@{userData?.name}</p>
              }
            />

            <div className="flex flex-col gap-1">
              {/* Upload Photo */}
              <Button
                color="success"
                endContent={<CameraIcon />}
                onPress={() => document.getElementById("uploadInput").click()}
              >
                Update Photo
              </Button>
              <input
                id="uploadInput"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Change Password */}
              <Button
                color="danger"
                startContent={<UserIcon />}
                variant="bordered"
                onPress={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </Button>

              <Button
                color="danger"
                startContent={<UserIcon />}
                onClick={() => logoutUser()}
              >
                Logout
              </Button>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="col-span-2 space-y-5 mt-52">
            {isLoading ? (
              [...Array(5)].map((_, i) => <PostSkeleton key={i} />)
            ) : (
              <>
                {posts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* Change Password Modal */}
      {/* ------------------------------ */}
      <Modal isOpen={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Change Password
          </ModalHeader>

          <ModalBody>
            <Input
              type="password"
              label="Old Password"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />

            <Input
              type="password"
              label="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />

            <Input
              type="password"
              label="Confirm New Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              isLoading={changePasswordMutation.isLoading}
              onPress={handlePasswordSubmit}
            >
              Update Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
