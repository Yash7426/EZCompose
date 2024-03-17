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
import Card from "@/components/preview-project-card"
import Button from "@/components/ui/button";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/project-card";
import GradientBackground from "@/components/ui/gradient-background";
import leftGradient from "@/assets/image/left-gradient.webp"
import rightGradient from "@/assets/image/right-gradient.webp"
import { Meteors } from "@/components/ui/meteor";
import Card2 from "@/components/project-card/another";
const SearchBar = () => {
  return (
    <div className="relative w-[400px]">
      <div className="h-full flex items-center hover:cursor-pointer  justify-center w-10 absolute right-0 bg-black rounded-r-md">
        <LuFolderSearch className="text-slate-200 w-10 text-base h-4 hover:text-orange-400 font-bold absolute   right-0 my-auto" />
      </div>
      <input
        type="text"
        placeholder="Type to search"
        className="w-full pl-12 pr-3 py-2  focus:placeholder:text-gray-100 bg-[#1C1C1C] outline-none border border-gray-500 focus:border-gray-300 shadow-sm rounded-lg"
      />
    </div>
  );
};

const sidelinks = [
  {
    icons: <SiFiles />,
    name: "All files",
  },
  {
    icons: <FaRegClock />,
    name: "Recent",
  },
  {
    icons: <MdOutlineFolderShared />,
    name: "Shared with me",
  },
  {
    icons: <IoMdHeart />,
    name: "Favourite",
  },
  {
    icons: <IoMdHeart />,
    name: "Favourite",
  },
  {
    icons: <IoMdHeart />,
    name: "Favourite",
  },
];
const nestedNav = [
  { name: 'Cards', href: 'javascript:void(0)', icon: <></> },
  { name: 'Chekouts', href: 'javascript:void(0)', icon: <></> },
  { name: 'Payments', href: 'javascript:void(0)', icon: <></> },
  { name: 'Get paid', href: 'javascript:void(0)', icon: <></> },
];

const navigation2 = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

const userProfile = {
  name: 'John Doe',
  profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const Items = [
  { text: 'Dashboard', href: '#' },
  { text: 'Team', href: '#' },
  { text: 'Projects', href: '#' },
  { text: 'Calendar', href: '#' },
]
const page = () => {
  return (
    <>

      <Navbar Items={Items} navigation={navigation2} userProfile={userProfile}/>
      <div className="relative  w-full h-screen overflow-hidden bg-[#070A0F]">
        <Meteors />

        <div className=" flex justify-between h-full">

          <div className="bg-black w-full p-4 md:p-8 pt-20 md:pt-20">
            <div className="text-3xl text-white">Projects</div>
            <div className="my-5 justify-around grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 place-items-center">
         
              {
                sidelinks.map((ele) =>
                  <Card2
                  imageUrl="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png"
                  title="Noteworthy technology acquisitions 2021"
                  description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                  link="#"
                  />
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
