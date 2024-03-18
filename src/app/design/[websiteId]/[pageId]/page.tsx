"use client";
import { useEffect, useContext, useRef, useState } from "react";
import AppStyles from "./designApp.module.css";
import { FaGripLinesVertical } from "react-icons/fa";
import { usePageDesignContext } from "@/contexts/page-design";
import { useuserDetailsContext } from "@/contexts/user-details";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import SettingPanel from "@/components/setting-panel";
import { useToken } from "@/hooks/use-token";
import SideColumn from "@/components/side-column";
import PreviewPanel from "@/components/preview-panel";
import { Id } from "../../../../../convex/_generated/dataModel";
import Navbar from "@/components/header";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import _ from "lodash";
import { IdesignState } from "@/interfaces/design";


const navItems = [
  { href: '#home', text: 'Home' },
  { href: '#about', text: 'About' },
  { href: '#services', text: 'Services' },
  { href: '#contact', text: 'Contact' },
];

function DesignApp({
  params,
}: {
  params: { websiteId: Id<"website">; pageId: Id<"webpage"> };
}) {
  const __webpageParams = {
    websiteId: params.websiteId,
    pageId: params.pageId,
  };
  const router = useRouter();

  const webpage = useQuery(
    api.webpage.getWebpage,
    __webpageParams.pageId
      ? { id: __webpageParams.pageId as Id<"webpage"> }
      : "skip"
  );

  const website = useQuery(
    api.website.getWebSite,
    __webpageParams.websiteId
      ? { id: __webpageParams.websiteId as Id<"website"> }
      : "skip"
  );

  let pageDesignState = usePageDesignContext();

  const UserDetailsState = useuserDetailsContext();
  // { currentWidth: "300px", isDragStarted: false }
  const resizer = useRef<
    HTMLDivElement & {
      isDragStarted: boolean;
      currentWidth: "300px";
    }
  >(null);

  const [sideWid, setSideWid] = useState({ width: "300px" });
  const [prevWid, prevContWid] = useState({ width: "240px" });

  const updateSettingsWidth = (e: React.DragEvent<HTMLDivElement>) => {
    // resizePanel.current.style.width = e.pageX + "px";
    if (e.pageX > 239 && e.pageX < window.innerWidth * 0.6) {
      setSideWid({ width: e.pageX + "px" });
      prevContWid({ width: e.pageX - 60 + "px" });
    }

    //update the position of element if visible
    //check if any element is active at the moment
    if (document.querySelectorAll(".temp_infocus").length > 0) {
      let dockl = document.querySelector("[data-operation]") as HTMLElement;
      if (dockl) {
        let parentPosition = document
          .querySelector("[data-panelmain]")
          ?.getBoundingClientRect();
        let dockSize = document
          .querySelector(".temp_infocus")
          ?.getBoundingClientRect();
        if (parentPosition && dockSize) {
          dockl.style.left = dockSize?.x - parentPosition.x - 26 + "px";
          dockl.style.top = dockSize?.y - parentPosition.y + "px";
        }
      }
    }
  };

  useEffect(() => {
    UserDetailsState.setEditorState((prev) => ({
      ...prev,
      ...__webpageParams,
    }));
  }, []);

  useEffect(() => {
    if (
      UserDetailsState.editorState?.pageId !== __webpageParams.pageId ||
      UserDetailsState.editorState?.websiteId !== __webpageParams.websiteId
    ) {
      UserDetailsState.setEditorState((prev) => ({
        ...prev,
        ...__webpageParams,
      }));
    }
  }, [__webpageParams]);

  useEffect(() => {
    if (
      UserDetailsState.editorState?.websiteId &&
      UserDetailsState.editorState.pageId
    ) {
      setPageState(
        UserDetailsState.editorState.pageId,
        UserDetailsState.editorState.websiteId
      );
    }
  }, [
    // UserDetailsState.editorState?.websiteId,
    // UserDetailsState.editorState?.pageId,
    website,
    webpage,
  ]);

  const setPageState = async (pid: any, wid: any) => {
    let _pid = pid;
    let _wid = wid;
    if (!_pid || !_wid) return;
    try {
      if (webpage != undefined) {
        if (
          !_.isEqual(webpage?.elements,pageDesignState.design?.elements)
          // Object(webpage?.elements).toString() !==
          // Object(pageDesignState.design?.elements).toString()
        ) {
          pageDesignState.setDesign(webpage);
        }
      }
      if (website != undefined) {
        pageDesignState.setWebDesignState(website);
      }
    } catch (err) {
      router.push("/my-websites");
    }
  };

  useEffect(() => {
    // if(pageDesignState.design?.isPublished==true) return;
    pageDesignState.getWebPageImageAndSavePage();
  }, [pageDesignState.design]);

  return (
    <div className={AppStyles["app"]}>
      <div className={AppStyles["NavBar"]}>
        <Navbar />
      </div>
      <div className={AppStyles["container"]}>
        <aside style={sideWid} className={AppStyles["options_menu"]}>
          <div className={AppStyles["options_menu_main"]}>
            <SideColumn prevWid={prevWid} key={"sideCol"} />
          </div>
          <div
            draggable
            ref={resizer}
            onDragStart={() => {
              if (resizer.current) resizer.current.isDragStarted = true;
            }}
            onDrag={updateSettingsWidth}
            onDragEnd={() => {
              if (resizer.current) resizer.current.isDragStarted = false;
            }}
            className={AppStyles["options_resizer"]}
          >
            <FaGripLinesVertical />
          </div>
        </aside>

        <main className={AppStyles["preview_panel"]}>
          <PreviewPanel />
        </main>
        <SettingPanel />
      </div>
    </div>
  );
}

export default DesignApp;
