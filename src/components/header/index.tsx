"use client";
import React, { useRef, useEffect, useState } from "react";
import nvstyle from "./navbar.module.css";
import "./navbar.css";
import { usePageDesignContext } from "@/contexts/page-design";
import { useuserDetailsContext } from "@/contexts/user-details";
import { useUserContext } from "@/contexts/user-context";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { FaAngleDown, FaExternalLinkAlt } from "react-icons/fa";
import { IoClose, IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { Page } from "@/interfaces/design";
import { Id } from "../../../convex/_generated/dataModel";
import Filter from "../mainfilter/filter";
import Button from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import DropdownMenu from "../ui/dropdown";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Switch } from "../ui/switch";
import Modal from '../ui/modal';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { calculateMillisecondsBetweenDates } from '../preview-panel/column-width-setting/utils';
import { useModalContext } from "@/contexts/modal-context";
interface MenuItem {
  name: string;
  href: string;
}

interface DropdownItem {
  name: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

interface Props {
  pages?: Page[];
  isPageDesign?: boolean;
  isPageDesignEmpty?: boolean;
}

const Navbar: React.FC = () => {
  const parentDropDownSlide = useRef<HTMLDivElement>(null);
  const dropdownSlide = useRef<HTMLDivElement>(null);

  const {
    webDesignState,
    setDesign,
    design,
    publishWebPage,
    getWebPageImageAndSavePage,
    removeWebPage,
  } = usePageDesignContext();
  const { setEditorState, editorState } = useuserDetailsContext();
  const [checked, setChecked] = useState(false);
  const { handleClose, setmodalData } = useModalContext()
  const params = useParams<{ websiteId: string; pageId: string }>();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  // const isPageDesign= true;
  const schedulePublish = useMutation(api.website.schedulePublish)
  const isPageDesign = params.pageId && params.websiteId ? true : false;
  const isPageDesignEmpty = params.pageId && params.websiteId ? true : false;


  const { user } = useUserContext();

  const handleSliderBoxShow = () => {
    if (dropdownSlide.current != null) {
      dropdownSlide.current.style.opacity = "1";
      dropdownSlide.current.style.scale = "1";
    }
  };

  const handleSliderBoxRemove = () => {
    if (dropdownSlide.current != null) {
      dropdownSlide.current.style.scale = "0";
      dropdownSlide.current.style.opacity = "0";
    }
  };

  const createNewPage = () => {
    setDesign((prev) => ({ ...prev, settingMode: BigInt(4) }));
  };
  const handlePageChange = (pageId: Id<"webpage"> | undefined) => {
    setEditorState((prev) => ({ ...prev, pageId }));
    router.push(`/design/${editorState?.websiteId}/${pageId}`);
  };
  const handlePageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value;
    // const filteredPages = webDesignState?.pages?.filter((page) => page.pageName.toLowerCase().includes(value.toLowerCase()));
    // setDesign((prev)=>({ ...prev, pages: filteredPages }));
  };

  const menuItems = [
    { id: 1, name: "New Page", onClick: createNewPage, icon: <CiCirclePlus /> },
    {
      id: 2,
      name: "Save Page",
      onClick: () => getWebPageImageAndSavePage("Save"),
      icon: <CiCirclePlus />,
    },
    {
      id: 3,
      name: "Publish Page",
      onClick: publishWebPage,
      icon: <CiCirclePlus />,
    },
    {
      id: 4,
      name: "Delete Page",
      onClick: removeWebPage,
      icon: <CiCirclePlus />,
    },
    {
      id: 5,
      name: "Exit editor",
      href: "/my-websites",
      icon: <CiCirclePlus />,
    },
  ];
  const SettingsItems = [
    {
      id: 1,
      name: "Settings & Meta",
      onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(3) })),
      icon: <CiCirclePlus />,
    },
    {
      id: 2,
      name: "Font Manager",
      onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(1) })),
      icon: <CiCirclePlus />,
    },
    {
      id: 3,
      name: "Google Analytics",
      onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(2) })),
      icon: <CiCirclePlus />,
    },
  ];
  const AboutItems = [
    {
      id: 1,
      name: "Project Link",
      href: "https://github.com/Yash7426/EZCompose",
      icon: <CiCirclePlus />,
    },
    {
      id: 2,
      name: "Donate",
      href: "https://github.com/Yash7426/EZCompose",
      icon: <CiCirclePlus />,
    },
  ];


  return (
    <nav className={`${nvstyle["navbar"]} py-1`}>

      <Modal isOpen={isAlbumOpen} onClose={() => setIsAlbumOpen((prev) => !prev)} className="!w-[90%] md:!w-[800px] md:!max-w-[95vw] mb-[20px]">
        <div className="bg-[#18181c]  text-wihte  p-[15px] rounded-3xl flex flex-col gap-3 relative w-full max-w-[960px] mx-auto no-scrollbar no-scroll md:px-[70px] px-[15px] ">
<div className="text-2xl text-white">
  Publish the page
</div>
          <Filter
            key={"Publish"}
            title={"Do you want to Schedule the Job?"}
            inputType={"radio"}
            value={checked}
            onChange={(value) => setChecked(value as boolean)}
            className="text-white"
            selectOptions={[
              {
                label: "Yes",
                value: true,
              },
              {
                label: "No",
                value: false,
              },
            ]}
          />
          <div>
          {
            checked ?
              (
                <div className="flex flex-col gap-4">
                  <input type="datetime-local" value={date.toISOString().slice(0, 16)} onChange={(e) => setDate(new Date(e.target.value))} />
                  <Button onClick={async () => {
                    await schedulePublish({
                      dateTime: calculateMillisecondsBetweenDates(new Date(), date),
                      id: params.pageId as unknown as Id<"webpage">,
                    })
                  }} variant="outline">
                    Schedule
                  </Button>
                </div>
              )
              :
              (
                <>
                  <Button onClick={publishWebPage} variant="outline">
                    Publish
                  </Button>
                </>
              )
          }

          </div>
        </div>
      </Modal>
      {/* <div className={nvstyle["navbar_header_logo"]}>WebPage Builder</div> */}
      {isPageDesign &&
        webDesignState?.pages &&
        webDesignState.pages.length > 0 && (
          <>
            <Filter
              key={Math.random() * 1000}
              inputType={"select"}
              placeholder={"Enter Name of Page"}
              value={"filter.value"}
              onChange={(e) => {
                handlePageSearch;
              }}
              selectOptions={webDesignState.pages.map((page) => ({
                value: page.pageId,
                label: page.pageName,
              }))}
              onOptionClick={(option) => {
                handlePageChange(option.value as Id<"webpage">);
              }}
              className={"!text-white !bg-ui2"}
              Variant="flex flex-col items-start  text-[14px] "
            />
          </>
        )}
      <Button
        variant="primary"
        className="flex items-center min-w-fit !px-3 rounded-lg !py-2 gap-2 !bg-ui2 text-sm !text-white"
        onClick={createNewPage}
      >
        <IoMdAddCircle />
        Create New
      </Button>
      <div
        ref={parentDropDownSlide}
        className={clsx(
          nvstyle["navbar_menu_bar"],
          (isPageDesign || isPageDesignEmpty) && nvstyle["expanded"]
        )}
      >
        <ul
          className={clsx(nvstyle["navbar_menu_level_one"])}
          onMouseEnter={handleSliderBoxShow}
          onMouseLeave={handleSliderBoxRemove}
        >
          {isPageDesign || isPageDesignEmpty ? (
            <>
              <DropdownMenu items={menuItems} name="webpage" />
              <DropdownMenu items={SettingsItems} name="settings" />
              <DropdownMenu items={AboutItems} name="about" />
            </>
          ) : (
            <DropdownMenu items={AboutItems} name="about" />
          )}
        </ul>
        <div ref={dropdownSlide} className={nvstyle["spanning_menu_box"]}></div>
      </div>
      {(isPageDesign || isPageDesignEmpty) && (
        <>
          <div className="user-web-link">
            <span className=" !pr-12">
              <div className="w-full text-slate-400 pr-2 line-clamp-3">

                {`http://${window.location.hostname}/web/${webDesignState?._id}/${design?.url}`}
              </div>
            </span>
            <Link
              className="external-open"
              href={
                !design?.isPublished
                  ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/`
                  : `/web/${webDesignState?._id}/${design?.url}`
              }
            >
              <FaExternalLinkAlt />
            </Link>
          </div>

          <Switch
            checked={!!design?.pageMode} // Convert BigInt to boolean
            setChecked={(isChecked) => {
              const newPageMode = isChecked ? BigInt(1) : BigInt(0); // Convert boolean to BigInt
              setDesign((prev) => ({ ...prev, pageMode: newPageMode }));
            }}
          />
          <div className={nvstyle["user_persistant_actions"]}>
            {/* Here you can render the dropdown for Save/Update and Publish/Unpublish */}
            <DropdownMenu
              name="Action"
              items={[
                {
                  id: 1,
                  name: !design?.isPublished ? "Save" : "Update",
                  onClick: () =>
                    getWebPageImageAndSavePage(
                      !design?.isPublished ? "Save" : "Update"
                    ),
                  icon: <CiCirclePlus />,
                },
                {
                  id: 2,
                  name: !design?.isPublished ? "Publish" : "Unpublish",
                  onClick: () => setIsAlbumOpen(true),
                  icon: <CiCircleMinus />,
                },
                {
                  id: 3,
                  name: "preview",
                  onClick: () => {
                    router.push(
                      `${!design?.isPublished ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/` : `/web/${webDesignState?._id}${design.url}`}`
                    );
                  },
                  icon: <CiCircleMinus />,
                },
              ]}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
