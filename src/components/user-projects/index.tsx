import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./userProjects.css";
import { useUserContext } from "@/contexts/user-context";
import { useToken } from "@/hooks/use-token";
import Link from "next/link";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { Page } from "@/interfaces/design";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type IuserProject = {
  loadingProj: boolean;
  currentPage: number;
  perPage: number;
  loadFailed: boolean;
  userProject: {
    _id: number;
    pages: Page[];
    prevImgUri?: string;
    websiteName: string;
    published: boolean;
  }[];
};
type UserProjectProps = {
  createNewWeb: () => void;
};

const UserProjects: React.FC<UserProjectProps> = ({ createNewWeb }) => {
  const userId = useStoreUserEffect();
  console.log(userId);

  // let navigate = useNavigate();
  const [token] = useToken();

  let [userProj, setUserProj] = useState<IuserProject>({
    loadingProj: false,
    currentPage: 1,
    perPage: 10,
    loadFailed: false,
    userProject: [],
  });
  //   if(userId)
  const website = useQuery(api.website.listuserSites, 
    // user: "j97b4px98aj4bna7wvsb9236wd6n7ppk" as Id<"users">
    userId ? { user: userId as Id<"users"> } : "skip",
  );

  console.log("first", website);
  useEffect(() => {
    loadUserProject();
  }, []);

  const loadUserProject = async () => {
    setUserProj((prev) => ({ ...prev, loadingProj: true }));

    try {
      // console.log("website",website)
      // await axios.post('/api/my-projects/', {
      //     id:user?.id,
      //     pageNum: userProj.currentPage,
      //     perPage: userProj.perPage
      // }, {
      //     headers: { Authorization: `Bearer ${token}` }
      // }).then(response => {
      //     setUserProj((prev)=>({ ...prev, loadingProj: false, loadFailed: false, userProject: response.data.result, currentPage: userProj.currentPage + 1 }))
      // }).catch(() => {
      //     setUserProj((prev)=>({ ...prev, loadingProj: false, loadFailed: true }))
      // })
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
                  <Link href={`/designer/${e._id}/${e.pages[0]._id}/`}>
                    <div className="projimgshowcase">
                      <img
                        src={
                          e.prevImgUri
                            ? e.prevImgUri
                            : "/assets/images/elements/html/dummyImage.jpg"
                        }
                      />
                    </div>
                    <div className="projectDetails">
                      <div className="projTitle">{e.websiteName}</div>
                      <div className="projDets">
                        {e.pages.length} page(s) &nbsp;&nbsp;|{" "}
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
