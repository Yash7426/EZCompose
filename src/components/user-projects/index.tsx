"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import "./userProjects.css";
import { useUserContext } from "@/contexts/user-context";
import { useToken } from "@/hooks/use-token";
import Link from "next/link";
import { Page } from "@/interfaces/design";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { Id } from "../../../convex/_generated/dataModel";

type IuserProject = {
  loadingProj: boolean;
  currentPage: number;
  perPage: number;
  loadFailed: boolean;
  userProject: {
    _id: Id<"website">;
    pages?: Page[];
    bannerImage?: string;
    description?: string;
    name: string;
    published?: boolean;
    users?: Id<"users">[];
  }[];
};
type UserProjectProps = {
  createNewWeb: () => void;
};

const UserProjects: React.FC<UserProjectProps> = ({ createNewWeb }) => {
  // let navigate = useNavigate();
  // const {user} = useUserContext();
  const [token] = useToken();
  const user = useStoreUserEffect();
  let [userProj, setUserProj] = useState<IuserProject>({
    loadingProj: false,
    currentPage: 1,
    perPage: 10,
    loadFailed: false,
    userProject: [],
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

  return (
    <div>
      <div className="projects_case_container">
        {userProj.loadingProj && <div className="loading-wrap">Loading...</div>}
        {userProj.loadFailed && (
          <div className="loading-failed">Loading failed try again</div>
        )}
        {userProj.userProject.length > 0 ? (
          <div className="project-showcase">
            {userProj.userProject.map((e, i) => {
              return (
                <div key={i} className="projectoption">
                  <Link
                    href={`/design/${e._id}/${e.pages && e.pages.length > 0 && e.pages[0].pageId}/`}
                  >
                    <div className="projimgshowcase">
                      <img
                        src={
                          e.bannerImage
                            ? e.bannerImage
                            : "/assets/images/elements/html/dummyImage.jpg"
                        }
                      />
                    </div>
                    <div className="projectDetails">
                      <div className="projTitle">{e.name}</div>
                      <div className="projDets">
                        {e.pages && e.pages.length} page(s) &nbsp;&nbsp;|{" "}
                        <div className="projStatus">
                          {e.published ? "Live" : "Unpublished"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="createFirstProject">
              <h4>Let's get started with your first website</h4>
              <button onClick={createNewWeb}>Create my first website!</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
