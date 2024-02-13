import Image from "next/image";
import React from "react";
import { FaRegFile } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "../ui/button";
interface iProps {
  name: string;
  time: string;
  imageUrl?: string;
}
let tempUrl =
  "https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png";
const index = ({ name, time }: iProps) => {
  return (
    <div className="flex flex-col w-72 rounded-lg relative overflow-hidden">
      <div className="flex items-center gap-x-3 bg-[#242424] px-2 py-2 shadow-sm shadow-black">
        <div className="icons text-3xl">
          <FaRegFile className="text-white" />
        </div>
        <div className="">
          <div className="text-base text-white truncate mr-3">{name}</div>
          <div className="text-xs text-gray-300  line-clamp-1 mr-3">
            Edited {time} ago
          </div>
        </div>
      </div>
      <div className="h-48 flex justify-center py-4 bg-black">
        <Image
          src={tempUrl}
          width={240}
          height={140}
          alt="project image"
          className="object-cover"
        />
      </div>
      <div className="absolute top-3 right-2 flex flex-col items-end">
        <HiOutlineDotsVertical className="text-xl text-white" />
      </div>
    </div>
  );
};

export default index;
