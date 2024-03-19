"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { MdFlip } from "react-icons/md";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQueries, useQuery } from "convex/react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const initPeople = [
  {
    name: "John Doe",
    profileImage:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",

    _id: "" as Id<"users">,
    email: "joh@gmail.com",
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
  // _id: Id<"website">;
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
  users: Id<"users">[] | undefined;
}
type PeopleType = {
  _id: Id<"users">;
  profileImage?: string | undefined;
  name: string;
  email: string;
}[];

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  // _id,
  title,
  description,
  link,
  pages,
  animate,
  initial,
  variants,
  onFlipClick,
  users,
}) => {
  const addUsertoSite = useMutation(api.website.addUsertoSite);
  const getUsersOfWebsite = useQuery(
    api.users.getUser,
    users ? { ids: users as Id<"users">[] } : "skip"
  );

  const [email, setEmail] = useState<string>("");
  const [people, setPeople] = useState<PeopleType>(initPeople);
  const addSite = async () => {
    if (email == "" || email == null) return;
    await addUsertoSite({
      email: email,
      websiteId: "jd7c600zmv9wfcp0wrvqhga7v16nh3yn" as Id<"website">,
    });
  };
  useEffect(() => {
    if (getUsersOfWebsite != undefined) setPeople(getUsersOfWebsite);
  }, [getUsersOfWebsite]);
  return (
    <motion.div
      className=" w-full relative max-w-md self-stretch"
      animate={animate}
      initial={initial}
      variants={variants}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div
        className="transform h-full"
        style={{
          transform: animate === "selected" ? "rotateY(180deg)" : "none",
        }}
      >
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="w-full mb-auto flex justify-between">
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
              <MdFlip className="h-5 w-5 rounded-full border-gray-500 fill-gray-500 " />
            </div>
          </div>

          {animate === "selected" ? (
            <>
              <div className="flex flex-row items-center justify-center  w-full">
                <AnimatedTooltip items={people} />
              </div>
              <div className="text-white text-sm mt-4">
              <TextGenerateEffect words={` To create and collaborate with your team on this website, please enter the email address of the user you wish to invite below:`} />
              
              </div>
             
              <div className="mt-5 w-full flex flex-col justify-center items-center">
                <Label
                  htmlFor="invite"
                  className="text-center font-bold text-[18px] text-slate-400 my-4"
                >
                  Invite a user to collaborate
                </Label>
                <Input
                  id="invite"
                  className="col-span-3 mt-1 max-w-64 text-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="abc@gmail.com"
                />
                <Button
                  type="submit"
                  variant={"outline"}
                  className="flex mt-5 px-5 items-center gap-2 text-lg"
                  onClick={() => {
                    addSite();
                  }}
                >
                  Invite
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href={link}>
                <Image
                  className="roundedfont-bold text-xl text-white my-4 relative z-50-lg max-h-[200px]"
                  src={imageUrl}
                  alt={title}
                  width={600}
                  height={600}
                />
              </Link>
              <div className="hover:translate-x-4 transition duration-200">
                <h1 className="font-bold text-xl text-white my-4 relative z-50 capitalize ">
                  {title}
                </h1>

                <p className="font-normal text-base text-slate-500 mb-4 relative z-50 first-letter:capitalize">
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
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
