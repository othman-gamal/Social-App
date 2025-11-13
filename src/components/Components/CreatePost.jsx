import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const goToCreatePost = (e) => {
    e.stopPropagation(); // stop input from preventing propagation
    navigate("/createpost");
  };

  return (
    <Card className="cursor-pointer">
      <div className="flex items-center gap-2 p-3">
        <div className="size-12 rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
            alt="avatar"
          />
        </div>
        <Input
          type="text"
          placeholder="What's in your mind, Demb?"
          readOnly
          onClick={goToCreatePost} // handle click directly on input
        />
      </div>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/heroui-inc/heroui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
