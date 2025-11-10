import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiShareAlt, BiCamera } from "react-icons/bi";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

export default function PostCard({ post }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="John Carter"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <p className="text-sm text-gray-500">4 hours ago</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Image */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
          alt="Post content"
          className="w-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <AiOutlineHeart className="w-6 h-6" />
          <span className="font-medium">1200</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <BiMessageRounded className="w-6 h-6" />
          <span className="font-medium">200</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium">17</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Write your comment"
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="text-gray-400 hover:text-gray-600">
          <BiCamera className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>

      {/* Comments */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            alt="Annalise Hane"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
            <h4 className="font-semibold text-sm text-gray-900">
              Annalise Hane
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700">
          View all comments
          <IoChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
