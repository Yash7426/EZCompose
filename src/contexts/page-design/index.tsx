"use client";

import {
  useState,
  useRef,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import * as htmlToImage from "html-to-image";
import { useEffect } from "react";
import { useuserDetailsContext } from "@/contexts/user-details";
import { useUserContext } from "../user-context";
import { useToken } from "@/hooks/use-token";
import { useRouter } from "next/navigation";
import { IdesignState, IpageState } from "@/interfaces/design";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { Id } from "../../../convex/_generated/dataModel";

// import { useNavigate } from "react-router-dom";

interface IuserDetailsContext {
  design: IdesignState | null;
  setDesign: Dispatch<SetStateAction<IdesignState | null>>;
  webDesignState: IpageState | null;
  setWebDesignState: Dispatch<SetStateAction<IpageState | null>>;
  tokenTracker: string;
  setTokenTracker: Dispatch<SetStateAction<string>>;
  dropPosition: React.MutableRefObject<number | null>;
  publishWebPage: () => void;
  nodeLevel: React.MutableRefObject<any>;
  actElLayer: string;
  setELLayer: Dispatch<SetStateAction<string>>;
  removeWebPage: () => void;
  getWebPageImageAndSavePage: (type?: string) => Promise<void>;
  activeElemLayer: React.MutableRefObject<string | null>;
}

const pageDesignPreview = createContext<IuserDetailsContext>(
  {} as IuserDetailsContext
);

const PageDesignProvider = ({ children }: { children: React.ReactNode }) => {
  const updatePage = useMutation(api.webpage.updateWebpage);
  const deletePage = useMutation(api.webpage.deleteWebpage);
  // const user1 = useStoreUserEffect();
  const InitialDeisgnState: IdesignState = {
    websiteId: "" as Id<"website">,
    author: "" as Id<"users">,
    url: "",
    title: "My Website",
    faviconUri: "https://reactjs.org/faviconUrin.ico",
    socialImage: "",
    description: "descriptionription for the webpage",
    isPublished: false,
    pageMode: BigInt(1),
    settingMode: BigInt(-1),
    isDropEnabled: true,
    analyticsId: "",
    dropIndex: BigInt(0),
    fonts: [
      {
        font: "Poppins",
        weights: ["300", "regular", "700"],
      },
    ],
    elements: [],
  };

  // const navigate = useNavigate();

  const { editorState, setEditorState, setUserDetails, userDetails } =
    useuserDetailsContext();

  const dropPosition = useRef(0);
  const nodeLevel = useRef(null);

  const activeElemLayer = useRef<string | null>(null);

  const router = useRouter();
  const [design, setDesign] = useState<IdesignState | null>(InitialDeisgnState);
  const [actElLayer, setELLayer] = useState<string>("0,");
  const [webDesignState, setWebDesignState] = useState<IpageState | null>({});


  const user = useStoreUserEffect()
  const [token] = useToken();

  const [tokenTracker, setTokenTracker] = useState<string>(token as string);

  useEffect(() => {
    if (user) {
      let { _id } = user;
      if (_id) setUserDetails({ ...user, user: user.name, _id: _id });
    }
  }, [user]);

  useEffect(() => {
    setTokenTracker(token as string);
  }, [token]);

  const saveWebPage = async (status: number,
     type: string, ImgUri?: string) => {
    // if (status === 200 && design?.elements && design?.elements?.length > 0) {

      // await updatePage({
      //   webpageId: editorState?.pageId,
      //   websiteId: editorState?.websiteId,
      //   author: user._id as Id<"users">,
      //   ...__design_data,
      // });
    //   setWebDesignState((prev) => ({ ...prev, bannerImage: ImgUri }));
    //   //update the website setting

    //   await axios.post(
    //     "/api/save-webprev/",
    //     {
    //       id: user?._id,
    //       websiteId: editorState?.websiteId,
    //       imageUri: "" + ImgUri,
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${tokenTracker}` },
    //     }
    //   );
    // }

    //go for regular saving of page

    try {
      const __design_data = design;
      if (__design_data != null) {
        if (type === "publish") {
          __design_data.isPublished = !design?.isPublished;
          setDesign({ ...design, isPublished: !design?.isPublished });
        }
        delete __design_data["_id"];
        delete __design_data["websiteId"];
        delete __design_data["author"];
      

        __design_data.settingMode = BigInt(-1);

        
        if (editorState?.pageId && editorState?.websiteId && user?._id)
          await updatePage({
            webpageId: editorState?.pageId,
            websiteId: editorState?.websiteId,
            author: user._id as Id<"users">,
            ...__design_data,
          });
      }
    } catch (e) {
      alert("Unable to save the webpage try again!");
    }
  };

  const removeWebPage = async () => {
    try {
      const response = await deletePage({
        id: editorState?.pageId as Id<"webpage">,
        websiteId: editorState?.websiteId as Id<"website">,
      });
      setEditorState({ ...editorState, pageId: response as Id<"webpage"> });
      router.push(`/design/${editorState?.websiteId}/${response}/`);
    } catch (e) {
      alert("Unable to delete the webpage try again!");
    }
  };

  const getWebPageImageAndSavePage = async (type = "save") => {
    console.log("I got hitttttttt");
    try {
      let prevPanel = document.querySelector("[data-prevpanel]");
      console.log(prevPanel);
      if (prevPanel != null) {
        await htmlToImage
          .toJpeg(prevPanel as HTMLElement, {
            quality: 0.95,
            width: prevPanel?.getBoundingClientRect()?.width,
            height:
              (205 / 280) * (prevPanel?.getBoundingClientRect()?.width ?? 200),
            canvasWidth: 280,
            canvasHeight: 205,
            backgroundColor: "#ffffff",
          })

          .then(function (dataUrl) {
            saveWebPage(200, type, dataUrl);
          })
          .catch((err) => {
            saveWebPage(500, "");
          });
      }
    } catch (e) {
      alert("Unable to save the webpage! Try again!");
    }
  };

  const publishWebPage = async () => {
    if (design?.elements && design?.elements.length < 1) {
      alert("Can not publish blank page. Add elements to publish.");
      return;
    }
    getWebPageImageAndSavePage("publish");
  };
  // useEffect(() => {
  //
  // }, [design])

  return (
    <pageDesignPreview.Provider
      value={{
        dropPosition,
        publishWebPage,
        nodeLevel,
        design,
        actElLayer,
        setELLayer,
        removeWebPage,
        setDesign,
        tokenTracker,
        setTokenTracker,
        webDesignState,
        setWebDesignState,
        getWebPageImageAndSavePage,
        activeElemLayer,
      }}
    >
      {children}
    </pageDesignPreview.Provider>
  );
};

const usePageDesignContext = () => {
  const c = useContext(pageDesignPreview);

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return c;
};

export { usePageDesignContext, PageDesignProvider };
