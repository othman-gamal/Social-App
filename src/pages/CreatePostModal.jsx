import { Card, Input, Textarea, Button, Divider } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function CreatePostModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal Card */}
      <Card className="w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>

        <Divider />

        {/* Body */}
        <div className="space-y-4 mt-4">
          <Input type="text" placeholder="Post title" />
          <Textarea placeholder="What's on your mind?" rows={5} />
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 gap-2">
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary">Post</Button>
        </div>
      </Card>
    </div>
  );
}
/* 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Textarea, Input, Alert } from "@heroui/react";
import { toast } from "react-toastify";
import { createPost } from "../services/PostServices";

export default function CreatePostModal() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in");

      const formData = new FormData();
      formData.append("text", text);
      if (file) formData.append("image", file);

      await createPost(formData, token);
      toast.success("Post created successfully!");
      navigate("/"); // go back to newsfeed
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={true} onClose={() => navigate("/")}>
      <h2 className="text-xl font-bold mb-2">Create Post</h2>

      {error && <Alert color="danger" title={error} />}

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="mb-2"
      />

      <Input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <div className="flex justify-end gap-2 mt-3">
        <Button color="secondary" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} isLoading={isSubmitting}>
          Submit
        </Button>
      </div>
    </Modal>
  );
}

*/
