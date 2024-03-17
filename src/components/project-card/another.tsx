import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { MdFlip } from "react-icons/md";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];


type IFlipCardType = {
  selected: {
    rotateY: number;
    transition: { duration: number };
  };
  notSelected: {
    rotateY: number;
    transition: { duration: number };
  };
};
interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  pages: {
    pageId: Id<"webpage">;
    pageName: string;
  }[];
  onFlipClick: () => void;
  initial: "notSelected" | "selected";
  animate: "notSelected" | "selected";
  variants: IFlipCardType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  title,
  description,
  link,
  pages,
  animate,
  initial,
  variants,
  onFlipClick
}) => {
  return (
    <motion.div className=" w-full relative max-w-md justify-stretch"
      animate={animate}
      initial={initial}
      variants={variants}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div
          className="transform"
          style={{
            transform: animate === "selected" ? "rotateY(180deg)" : "none"
          }}
        >
      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <div className="w-full my-1 flex justify-between">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 fill-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          <div onClick={onFlipClick}>
            <MdFlip className="h-5 w-5 rounded-full border-gray-500" />

          </div>

        </div>
     
        {
          animate === "selected" ? (
            <>
              <div className="flex flex-row items-center justify-center  w-full">
                <AnimatedTooltip items={people} />
              </div>
              <p className="text-white">
                y
              </p>

            </>
          ) :
            (
              <>
                <Link href={link}>
                  <Image
                    className="rounded-t-lg max-h-[200px]"
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={600}
                  />
                </Link>
                <div className="hover:translate-x-4 transition duration-200">
                  <h1 className="font-bold text-xl text-white my-4 relative z-50">
                    {title}
                  </h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    {description}
                  </p>
                  {pages && pages.length > 0 && (
                    <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                      {pages && pages.length} page(s) &nbsp;&nbsp;
                    </p>
                  )}

                  <Link
                    href={link}
                    className="shadow-[inset_0_0_0_2px_#616467] px-4 py-2 rounded-md tracking-widest capitalize  bg-transparent hover:bg-gray-700 hover:text-white dark:text-neutral-200 transition duration-200"
                  >
                    Open
                  </Link>
                </div>
              </>
            )
        }
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
