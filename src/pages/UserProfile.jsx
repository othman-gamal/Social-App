import React from "react";
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
import { useContext, useState, useMemo } from "react";
import { authContext } from "../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadUserImage, changePassword } from "../services/AuthServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import PostCard from "../components/Components/Components/PostCard";
import { CameraIcon, UserIcon } from "lucide-react";
import { getAllPosts } from "../services/postServices";

export default function UserProfile() {
  const { userData, setToken } = useContext(authContext);
  const { id } = useParams(); // user id in url e.g. /user-profile/691dfc851311fd7b032a128f/posts

  // ----------------------------
  // Local states for change password modal
  // ----------------------------
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [followersCount, setFollowersCount] = useState(513);
  const [isFollowing, setIsFollowing] = useState(false);

  // ----------------------------
  // upload image mutation
  // ----------------------------
  const uploadImageMutation = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (res) => {
      toast.success("Image updated!");
      // you may want to refresh user context here if you fetch user again
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to upload image.");
    },
  });

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    uploadImageMutation.mutate(formData);
  }

  // ----------------------------
  // change password mutation
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

    // backend expects { password, newPassword } per your last message
    changePasswordMutation.mutate({ password: oldPass, newPassword: newPass });
  }

  // ----------------------------
  // Fetch ALL posts (uses same query key as the rest of your app)
  // This will use cache if ["getPosts"] already exists.
  // ----------------------------
  const { data: allPostsRaw, isLoading: postsLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getAllPosts(),
    // do not select here — keep full response to be safe
  });

  // posts array from API response (defensive)
  const allPosts = allPostsRaw?.data?.posts ?? [];

  // ----------------------------
  // Filter posts that belong to this `id`
  // ----------------------------
  const userPosts = useMemo(() => {
    if (!allPosts || !id) return [];
    return allPosts.filter((p) => p.user && String(p.user._id) === String(id));
  }, [allPosts, id]);

  // ----------------------------
  // Derive user info:
  // - if this is own profile -> use auth context (has email)
  // - otherwise try to get data from first post's user object
  // ----------------------------
  const profileUser = useMemo(() => {
    if (userData && String(userData._id) === String(id)) {
      // viewing my own profile
      return {
        _id: userData._id,
        name: userData.name,
        photo: userData.photo,
        email: userData.email,
      };
    }

    if (userPosts.length > 0) {
      // take user info from first post (posts contain user.name and user.photo)
      const u = userPosts[0].user || {};
      return {
        _id: u._id,
        name: u.name,
        photo: u.photo,
        email: null, // posts don't include email
      };
    }

    // fallback: unknown user (no posts and not current user)
    return {
      _id: id,
      name: "Unknown user",
      photo: null,
      email: null,
    };
  }, [userData, id, userPosts]);

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }

  return (
    <div className="p-6">
      {/* top banner */}
      <div className="h-40 w-full bg-gradient-to-r from-[#0C2B4E] via-[#8ABEB9] to-[#305669] flex items-center"></div>

      <div className="grid grid-cols-4 gap-3 mt-6">
        {/* Sidebar */}
        <div className="col-span-1 sticky top-12 h-screen overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-span-2 space-y-5 p-5">
          {/* User header */}
          <div className="flex justify-between items-center gap-5">
            <User
              avatarProps={{
                src:
                  profileUser?.photo ||
                  "https://avatars.githubusercontent.com/u/30373425?v=4",
                className: "w-28 h-28 rounded-full object-cover",
              }}
              name={
                <p className="text-2xl font-semibold">{profileUser?.name}</p>
              }
              description={
                <p className="text-sm text-gray-600">
                  {profileUser?.email
                    ? profileUser.email
                    : `@${profileUser?.name
                        ?.replace(/\s+/g, "")
                        .toLowerCase()}`}
                </p>
              }
            />

            <div className="flex flex-col gap-2">
              {/* Only allow current user to update their image & password */}
              {String(userData?._id) === String(id) && (
                <>
                  <Button
                    color="success"
                    endContent={<CameraIcon />}
                    onPress={() =>
                      document.getElementById("uploadInput").click()
                    }
                  >
                    Update Photo
                  </Button>
                  <input
                    id="uploadInput"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    color="danger"
                    variant="bordered"
                    onPress={() => setIsPasswordModalOpen(true)}
                  >
                    Change Password
                  </Button>
                  <Button color="danger" onClick={logoutUser}>
                    Logout
                  </Button>
                </>
              )}

              {/* If not the owner show a simple follow/message button or nothing */}
              {String(userData?._id) !== String(id) && (
                <div className="flex gap-2">
                  <Button
                    color={isFollowing ? "default" : "primary"} // gray if following
                    onPress={() => {
                      if (isFollowing) {
                        setFollowersCount((prev) => prev - 1);
                      } else {
                        setFollowersCount((prev) => prev + 1);
                      }
                      setIsFollowing(!isFollowing);
                    }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Divider className="my-2" />

          {/* stats */}
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-500">Posts</div>
              <div className="text-lg font-medium">{userPosts.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Followers</div>
              <div className="text-lg font-medium">{followersCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Following</div>
              <div className="text-lg font-medium">475</div>
            </div>
          </div>

          <Divider className="my-2" />

          {/* posts list */}
          <div className="space-y-5">
            {postsLoading ? (
              // skeleton grid
              [...Array(3)].map((_, i) => <PostSkeleton key={i} />)
            ) : userPosts.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                No posts yet.
              </div>
            ) : (
              userPosts.map((post) => <PostCard key={post._id} post={post} />)
            )}
          </div>
        </div>

        {/* right column (optional) */}
        <div className="col-span-1 sticky top-12 h-screen overflow-y-auto p-3">
          {/* you can put other widgets here */}
        </div>
      </div>

      {/* Change Password Modal */}
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
