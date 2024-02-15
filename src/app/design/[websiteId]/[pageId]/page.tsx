"use client"
import { useEffect, useContext, useRef, useState } from 'react';
import AppStyles from './designApp.module.css';
import { FaGripLinesVertical } from "react-icons/fa";
import axios from 'axios'
import { usePageDesignContext } from '@/contexts/page-design';
import { useuserDetailsContext } from '@/contexts/user-details';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import useStoreUserEffect from '@/app/useStoreUserEffect';
import SettingPanel from '@/components/setting-panel';
import { useToken } from '@/hooks/use-token';
import SideColumn from '@/components/side-column';
import PreviewPanel from '@/components/preview-panel';
function DesignApp() {

    const __webpageParams = useSearchParams();

    const router = useRouter()



    let pageDesignState = usePageDesignContext();
    const UserDetailsState =useuserDetailsContext();

    // { currentWidth: "300px", isDragStarted: false }
    const resizer = useRef<HTMLDivElement & {
        isDragStarted: boolean;
        currentWidth: "300px";
    }>(null);

    const [sideWid, setSideWid] = useState({ width: "300px" })
    const [prevWid, prevContWid] = useState({ width: "240px" });

    const updateSettingsWidth = (e: React.DragEvent<HTMLDivElement>) => {
        // resizePanel.current.style.width = e.pageX + "px";
        if (e.pageX > 239 && e.pageX < (window.innerWidth * 0.6)) {
            setSideWid({ width: e.pageX + "px" });
            prevContWid({ width: (e.pageX - 60) + "px" });
        }

        //update the position of element if visib;e
        //check if any element is active at the moment
        if (document.querySelectorAll(".temp_infocus").length > 0) {
            let dockl = document.querySelector("[data-operation]") as HTMLElement;
            if (dockl) {
                let parentPosition = document.querySelector("[data-panelmain]")?.getBoundingClientRect();
                let dockSize = document.querySelector(".temp_infocus")?.getBoundingClientRect();
                if(parentPosition && dockSize){
                    dockl.style.left = (dockSize?.x - parentPosition.x - 26) + "px";
                    dockl.style.top = (dockSize?.y - parentPosition.y) + "px";
                }
              
               
            }
        }
    }



    const userId=useStoreUserEffect();
    const token = useToken();


    useEffect(() => {
        UserDetailsState.setEditorState((prev)=>({ ...prev, ...__webpageParams }));
    }, [])

    useEffect(() => {
        if (UserDetailsState.editorState.pageId !== __webpageParams.get("pageId") || UserDetailsState.editorState.websiteId !== __webpageParams.get("websiteId")) {
            UserDetailsState.setEditorState((prev)=>({ ...prev, ...__webpageParams }));
        }
    }, [__webpageParams])

    useEffect(() => {
        if (UserDetailsState.editorState.websiteId && UserDetailsState.editorState.pageId)
         setPageState(UserDetailsState.editorState.pageId, UserDetailsState.editorState.websiteId);

    }, [UserDetailsState.editorState.websiteId, UserDetailsState.editorState.pageId])

    const setPageState = async (pid:any, wid:any) => {
        let _pid = pid;
        let _wid = wid;
        try {
            // 
            await axios.post('/api/getWebPage/', {
                id:userId,
                pageId: _pid,
                websiteId: _wid
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // 
                if (response.data.result) {
                    pageDesignState.setDesign(response.data.result)
                    pageDesignState.setWebDesignState(response.data.webResult)

                } else {
                    router.push("/my-websites")
                }


            }).catch(() => {
                router.push("/my-websites")
            })

        } catch (err) {

            // navigate("/my-websites")
        }

    }



    return (
        <div className={AppStyles["app"]}>
            {/* <div className={AppStyles["NavBar"]}>
                <Navbar />
            </div> */}
            <div className={AppStyles["container"]}>
                <aside style={sideWid}
                 className={AppStyles["options_menu"]} >
                    <div
                     className={AppStyles["options_menu_main"]}>
                        <SideColumn prevWid={prevWid} key={"sideCol"} />
                    </div>
                    <div 
                    draggable 
                    ref={resizer} 
                    onDragStart={() => {if(resizer.current) resizer.current.isDragStarted = true}} 
                    onDrag={updateSettingsWidth} 
                    onDragEnd={() => {if(resizer.current) resizer.current.isDragStarted = false}}
                     className={AppStyles["options_resizer"]}><FaGripLinesVertical /></div>
                </aside>
                <main className={AppStyles["preview_panel"]}>
                    <PreviewPanel/>
                </main>
                <SettingPanel/>
            </div>
        </div>
    );
}

export default DesignApp;
