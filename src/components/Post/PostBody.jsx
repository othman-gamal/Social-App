import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiShareAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function PostBody({
  post,
  body,
  postComments,
  image,
  fromDetails,
  id,
  refetch,
}) {
  return (
    <>
      <div className="px-4 pb-3">
        <p className="text-gray-800">{body}</p>
      </div>

      {/* Image */}
      <div className="w-full">
        <img
          src={
            image
              ? image
              : "https://linked-posts.routemisr.com/uploads/default-profile.png"
          }
          alt="Post content"
          className={`w-full object-cover ${fromDetails ? " " : "h-80"}`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <AiOutlineHeart className="w-6 h-6" />
          <span className="font-medium">1200</span>
        </button>
        <Link
          to={`/post-details/${id}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <BiMessageRounded className="w-6 h-6" />
          <span className="font-medium">{postComments?.length || 0}</span>
        </Link>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium">17</span>
        </button>
      </div>
    </>
  );
}

export default PostBody;
