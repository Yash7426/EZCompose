import React, { useState, useContext } from "react";
import axios from "axios";
import "./new-website-modal.css";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/user-context";
import { useToken } from "@/hooks/use-token";
import { useuserDetailsContext } from "@/contexts/user-details";
import { CgWebsite } from "react-icons/cg";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { v } from "convex/values";
import { Id } from "../../../convex/_generated/dataModel";
import useStoreUserEffect from "@/app/useStoreUserEffect";

type CreateNewWebsitetype = {
  closeModal: () => void;
};
const CreateNewWebsite: React.FC<CreateNewWebsitetype> = ({ closeModal }) => {
  const router = useRouter();
  const createWebsite = useMutation(api.website.createWebsite);
  const createWebpage = useMutation(api.webpage.createWebpage);

  const { user } = useUserContext();
  const token = useToken();
  let UserDetailsState = useuserDetailsContext();

  let [newWebSetting, setNewWebSetting] = useState({
    webName: "My Website",
  });
  const userId = useStoreUserEffect();

  const createNewWebsite = async () => {
    try {
      if (newWebSetting.webName.length < 1) {
        alert("Website name can not be blank");
        return;
      }
      let __webName = newWebSetting.webName;

      //remove special chars
      __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

      try {
        console.log("hitt dfdsfdsfddsdfed", __webName);
        console.log(userId);
        const websiteId = await createWebsite({
          user: userId as Id<"users">,
          name: __webName,
          bannerImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PGyK_KgPmWmkyh5pAQltCNIxkd5ohgo66t5qROV3sX5wh8yUOuAI5jnI0CPAId25U8c&usqp=CAU",
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
          author: userId as Id<"users">,
          url: "index",
          isPublished: false,
          isDropEnabled: true,
          analyticsId: "",
          fonts: [],
          websiteId: UserDetailsState.editorState?.websiteId as Id<"website">,
          elements: [],
          prevImageUri: "",
        });

        closeModal();
        // create a default web page
        router.push(`/design/${websiteId}/${indexPageId}`);
      } catch (error) {
        console.error(error);
      }
    } catch (err) {}
  };

  return (
    <div className="createNewWebsiteModal">
      <div className="modal_container">
        <div className="modal_title">
          <span>Create New Website</span>
          <button onClick={() => closeModal()}>
            <CgWebsite />
          </button>
        </div>
        <div className="modal_cont">
          <div className="moal-inputs">
            <h5>Website Name:</h5>
            <input
              type="text"
              onChange={(e) =>
                setNewWebSetting((prev) => ({
                  ...prev,
                  webName: e.target.value,
                }))
              }
              value={newWebSetting.webName}
            />
          </div>
          <div className="createNewWebsiteOptions">
            <button onClick={() => createNewWebsite()}>
              {" "}
              Create new website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateNewWebsite;
