import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";

function PostHeader({ post, photo, name, date }) {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={photo}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(date).toLocaleString("en-us", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default PostHeader;
