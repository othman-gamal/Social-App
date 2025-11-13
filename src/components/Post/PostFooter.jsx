import { IoChevronDown } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

function PostFooter({ post, id, fromDetails, name, photo, content }) {
  //   console.log(id);
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
          <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
            <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
            <p className="text-sm text-gray-700 mt-1">{content}</p>
          </div>
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
