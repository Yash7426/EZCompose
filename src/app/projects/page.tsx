import Button from "@/components/ui/button";
import React from "react";
import { LuFolderSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { SiFiles } from "react-icons/si";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineFolderShared } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";
const SearchBar = () => {
  return (
    <div className="relative w-[400px]">
      <div className="h-full flex items-center hover:cursor-pointer  justify-center w-10 absolute right-0 bg-black rounded-r-md">
        <LuFolderSearch className="text-slate-200 w-10 text-base h-4 hover:text-orange-400 font-bold absolute   right-0 my-auto" />
      </div>
      <input
        type="text"
        placeholder="Type to search"
        className="w-full pl-12 pr-3 py-2 text-gray-500 focus:placeholder:text-orange-400 bg-[#1C1C1C] outline-none border border-[#1C1C1C] focus:border-black shadow-sm rounded-lg"
      />
    </div>
  );
};

const page = () => {
  return (
    <div className="bg-[#242424] w-full h-screen overflow-hidden">
      <div className="flex justify-between px-20 py-6">
        <div className="text-2xl text-white pr-20 font-bold">My Projects</div>
        <div>
          <SearchBar />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button className="border-2 text-white text-sm border-black   px-2 py-1 rounded-md my-auto justify-center items-center  h-fit flex gap-x-2">
            <div className="text-sm">Sort by</div>
            <GoChevronDown />

          </Button>
          <Button className="border-2 text-white bg-blue-500  text-sm border-black  px-2 py-1 rounded-md my-auto justify-center items-center  h-fit flex gap-x-2">
            <FaPlus className="" />
            <div className="">New</div>
          </Button>
        </div>
      </div>
      <div className=" flex justify-between h-full">
        <div className="w-[24.8%]  bg-[#1C1C1C] h-full">
          <ul className="w-full h-full flex flex-col items-center py-8  px-14 text-base gap-y-6 text-white">
            <li className="w-full bg-[#242424] px-4 py-3 rounded-lg flex gap-x-3 items-center shadow-sm shadow-black">
                <SiFiles />
                All files
            </li>
            <li className="w-full bg-[#242424] px-4 py-3 rounded-lg flex gap-x-3 items-center shadow-sm shadow-black">
              <FaRegClock />
              Recent
            </li>
            <li className="w-full bg-[#242424] flex gap-x-3 items-center px-4 py-3  rounded-lg shadow-sm shadow-black">
              <MdOutlineFolderShared />
              Shared with me
            </li>
            <li className="w-full bg-[#242424] flex gap-x-3 items-center px-4 py-3 rounded-lg shadow-sm shadow-black">
              <IoMdHeart />
              Favourite
            </li>
          </ul>
        </div>
        <div className="bg-[#1C1C1C] w-[75%] p-8">
          <div className="text-3xl text-white">
            Projects
          </div>
          <div className="">

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
