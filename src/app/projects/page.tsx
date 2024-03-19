"use client";
import React, { useEffect, useState } from "react";
import { LuFolderSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { SiFiles } from "react-icons/si";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineFolderShared } from "react-icons/md";
import { IoMdAddCircle, IoMdHeart } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Card from "@/components/preview-project-card";
import Button from "@/components/ui/button";
import Navbar from "@/components/navbar";
import GradientBackground from "@/components/ui/gradient-background";
import leftGradient from "@/assets/image/left-gradient.webp";
import rightGradient from "@/assets/image/right-gradient.webp";
import { Meteors } from "@/components/ui/meteor";
import Card2 from "@/components/project-card/another";
import { useClientContext } from "@/contexts/client-context";
import { usePathname } from "next/navigation";
import { useToken } from "@/hooks/use-token";
import useStoreUserEffect from "../useStoreUserEffect";
import { Id } from "../../../convex/_generated/dataModel";
import { Page } from "@/interfaces/design";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CreateProjectDialog from "@/components/createProjectModal";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Modal from "@/components/ui/modal";
import Filter from "@/components/mainfilter/filter";
import { useMutation } from "convex/react";
import { UploadFileResponse } from "@xixixao/uploadstuff";
import { UploadDropzone } from "@xixixao/uploadstuff/react";
import { useRouter } from "next/navigation";
import { useuserDetailsContext } from "@/contexts/user-details";
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
  { name: "Cards", href: "javascript:void(0)", icon: <></> },
  { name: "Chekouts", href: "javascript:void(0)", icon: <></> },
  { name: "Payments", href: "javascript:void(0)", icon: <></> },
  { name: "Get paid", href: "javascript:void(0)", icon: <></> },
];

const navigation2 = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

const userProfile = {
  name: "John Doe",
  profileImageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const Items = [
  { text: "Dashboard", href: "#" },
  { text: "Team", href: "#" },
  { text: "Projects", href: "#" },
  { text: "Calendar", href: "#" },
];

type IuserProject = {
  loadingProj: boolean;
  currentPage: number;
  perPage: number;
  loadFailed: boolean;
  userProject: {
    _id: Id<"website">;
    pages?: Page[];
    bannerImage?: string;
    name: string;
    published?: boolean;
    description?:string
    users?: Id<"users">[];
  }[];
};
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
type UserProjectProps = {
  createNewWeb: () => void;
};

const page = () => {
  const cardVariants:IFlipCardType = {
    selected: {
      rotateY: 180,
      transition: { duration: 0.35 },
    },
    notSelected: {
      rotateY: 0,
      transition: { duration: 0.35 },
    },
  };

  // these are the modal states please do not remove
  const [s, setS] = useState("");
  const [showSave, setShowSave] = useState(true);
  const generateUploadUrl = useMutation(api.website.generateUploadUrl);

  const getImageUrl = useMutation(api.website.generateServeUrl);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
    const ss = await getImageUrl({
      storageId: (uploaded[0].response as any).storageId as string,
    });
    setS(ss as string);
    setShowSave(false);
  };
  const router = useRouter();
  const user1 = useStoreUserEffect();
  const createWebsite = useMutation(api.website.createWebsite);
  const updateWebsite = useMutation(api.website.updateWebsite);
  const createWebpage = useMutation(api.webpage.createWebpage);
  let UserDetailsState = useuserDetailsContext();
  const createNewWebsite = async () => {
    try {
      if (formData.title.length < 1) {
        alert("Website name can not be blank");
        return;
      }
      if (formData.title.length < 5) {
        alert("Website name should have atleast 6 characters.");
        return;
      }
      if (formData.description.length < 1) {
        alert("Description can not be blank");
        return;
      }

      let __webName = formData.title;

      //remove special chars
      __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

      try {
        const websiteId = await createWebsite({
          user: user1?._id as Id<"users">,
          name: __webName,
          bannerImage: s,
          description: formData.description,
        });
        UserDetailsState.setEditorState((prev) => ({
          ...prev,
          websiteId: websiteId,
        }));
        const indexPageId = await createWebpage({
          faviconUri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFf_7kDwWnZhDhBoJfNqdCXtceqDMhh5yzMQ&usqp=CAU",
          description: "",
          socialImage: "",
          title: "index",
          author: user1?._id as Id<"users">,
          url: "index",
          isPublished: false,
          isDropEnabled: true,
          settingMode: BigInt(-1),
          analyticsId: "",
          fonts: [],
          websiteId: websiteId as Id<"website">,
          elements: [],
          prevImageUri: "",
        });

        // create a default web page
        router.push(`/design/${websiteId}/${indexPageId}`);
      } catch (error) {
        // closeModal();
        console.error(error);
      }
    } catch (err) {}
  };











  const { setSearch, search } = useClientContext();
  const pathname = usePathname();
  const isSearch = pathname.includes("/projects");

  const [isCreateAlbumOpen, setisCreateAlbumOpen] = useState<boolean>(false);
  const user = useStoreUserEffect();
  let [userProj, setUserProj] = useState<IuserProject>({
    loadingProj: false,
    currentPage: 1,
    perPage: 10,
    loadFailed: false,
    userProject: [],
  });
  const [selectedCard, setSelectedCard] = useState<number | null>(-1);

  const selectCard = (cardId: number) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const websites = useQuery(
    api.website.listuserSites,
    user?._id ? { user: user._id as Id<"users"> } : "skip"
  );

  useEffect(() => {
    if (websites) {
      setUserProj((prev) => ({
        ...prev,
        loadingProj: false,
        loadFailed: false,
        userProject: websites,
        currentPage: userProj.currentPage + 1,
      }));
    } else {
      setUserProj((prev) => ({
        ...prev,
        loadingProj: false,
        loadFailed: true,
      }));
    }
  }, [websites]);

  useEffect(() => {
    loadUserProject();
  }, []);

  const loadUserProject = async () => {
    setUserProj((prev) => ({ ...prev, loadingProj: true }));
    try {
    } catch (err) {
      console.error(err);
      setUserProj((prev) => ({
        ...prev,
        loadingProj: false,
        loadFailed: true,
      }));
    }
  };

  useEffect(() => {
    setSearch(isSearch);
  }, []);

  return (
    <>

      <Navbar
        Items={Items}
        navigation={navigation2}
        userProfile={userProfile}
        isSearch={search}
      />
      {/* <CreateProjectDialog isOpen={showModal} setisOpen={setShowModal} /> */}
      <Modal
            isOpen={isCreateAlbumOpen}
            onClose={() => setisCreateAlbumOpen(false)}
            className=""
          >
            <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-3xl flex flex-col gap-3">
              <div
                className="relative flex w-full bg-transparent rounded-md h-[19px]"
                onClick={() => setisCreateAlbumOpen(false)}
              >
                <IoClose className="absolute right-0 cursor-pointer fill-light hover:fill-secondary flex-end"/>
              </div>
              <Filter
                key={"Create Project"}
                inputType={"text"}
                title={"Create New Project"}
                placeholder={"Enter Name"}
                value={formData.title}
                onChange={(value) =>setFormData((prev) => ({ ...prev, title: value as string }))}
      
                
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
              />
              <Filter
                key={"Description"}
                inputType={"text"}
                title={"Description"}
                placeholder={"Enter Description"}
                value={formData.description}
                onChange={(value) =>setFormData((prev) => ({ ...prev, description: value as string }))}
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
              />
                <div className="px-4 -mr-4">
            <UploadDropzone
              uploadUrl={generateUploadUrl}
              fileTypes={{
                "application/pdf": [".pdf"],
                "image/*": [".png", ".gif", ".jpeg", ".jpg"],
              }}
              onUploadComplete={saveAfterUpload}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
          </div>
             

              <Button
                onClick={createNewWebsite}
                className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
              >
                {"Create Project"}
              </Button>
            </div>
          </Modal>
      <div className="relative  w-full min-h-screen overflow-x-hidden overflow-y-hidden bg-[#070A0F]">
        <Meteors />

        <div className=" flex justify-between h-full min-h-screen">
          <div className="bg-black w-full p-4 md:p-8 pt-20 md:pt-20">
            <div className="text-white py-4 text-xl  flex justify-between">
              <div className="">
                <h1>Welcome back, {user?.name || "User"}!</h1>
                <h3 className="text-base text-slate-400">
                  Select one your site, you want to edit
                </h3>
              </div>
              <div className="">
                <Button
                  variant={"outline"}
                  onClick={() => setisCreateAlbumOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-lg"
                >
                  <IoMdAddCircle className="text-" />
                  Add New Project
                </Button>
              </div>
            </div>
            <div className="text-3xl text-white my-4">Projects</div>
            <div className="my-5 justify-around grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 place-items-center">
              {userProj.userProject.map((ele, idx) => {
                return (
                
                <Card2
                 key={idx}
                //  _id={ele._id}
                  imageUrl={
                    ele.bannerImage
                      ? ele.bannerImage
                      : "/assets/images/elements/html/dummyImage.jpg"
                  }
                  title={ele.name}
                  description={ele.description as string}
                  link={`/design/${ele._id}/${ele.pages && ele.pages.length > 0 && ele.pages[0].pageId}/`}
                  pages={ele.pages as Page[]}
                  // key={ele._id}
                  onFlipClick={() => selectCard(idx)}
                  initial="notSelected"
                  animate={selectedCard === idx ? "selected" : "notSelected"}
                  variants={cardVariants}
                  users = {ele.users}
                />
              )})}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
