import { useState, useRef, useContext, createContext, Dispatch, SetStateAction } from "react";
// import { useUser } from "../../Component/auth/useUser";
// import { useToken } from "../../Component/auth/useToken";
import axios from 'axios'
import * as htmlToImage from 'html-to-image';
import { useEffect } from "react";
import { useuserDetailsContext } from "@/contexts/user-details";
import { useUserContext } from "../user-context";
import { useToken } from "@/hooks/use-token";
import { useRouter } from "next/router";

// import { useNavigate } from "react-router-dom";

interface IuserDetailsContext{
    design: IdesignState | null;
    setDesign: Dispatch<SetStateAction<IdesignState | null>>   
    webDesignState: IdesignState|null;
    setWebDesignState: Dispatch<SetStateAction<IdesignState | null>>
    tokenTracker: string
    setTokenTracker: Dispatch<SetStateAction<string>>
    dropPosition: React.MutableRefObject<number>
    publishWebPage: ()=>void
    nodeLevel: React.MutableRefObject<any>
    actElLayer: string
    setELLayer: Dispatch<SetStateAction<string>>
    removeWebPage: ()=>void
    getWebPageImageAndSavePage: (type?: string) => Promise<void>
}

const pageDesignPreview = createContext<IuserDetailsContext>({} as IuserDetailsContext);

const PageDesignProvider = ({children}:{children: React.ReactNode}) => {

    const InitialDeisgnState:IdesignState = {
        projectId: null,
        projectAuthor: "",
        pageUri: "",
        websiteSetting: {
            siteName: "My Website",
            favIco: "https://reactjs.org/favicon.ico",
            socialImage: "",
            desc: "Description for the webpage"
        },
        published: false,
        pageMode: 1,
        settingMode: -1,
        isDropEnabled: true,
        analyticsID: "",
        dropIndex: 0,
        fonts: [{
            "font": "Poppins",
            "weights": [
                "300",
                "regular",
                "700"
            ]
        }],
        elements: []
    }

    // const navigate = useNavigate();

    const {editorState, setEditorState,setUserDetails ,userDetails} = useuserDetailsContext();


    const dropPosition = useRef(0)
    const nodeLevel = useRef(null)

    const activeElemLayer = useRef(null);

const router=useRouter()
    const [design, setDesign] = useState<IdesignState | null>(InitialDeisgnState);
    const [actElLayer, setELLayer] = useState<string>("0,");
    const [webDesignState, setWebDesignState] = useState<IdesignState|null>(null );

    const {user }= useUserContext();
    const [token,] = useToken();
// const token="";

    const [tokenTracker, setTokenTracker] = useState<string>(token as string);

    useEffect(() => {
        if (user) {
            let { id } = user;
            if (id) setUserDetails({ ...user,user:user.username, _id: id, id: id })
        }
    }, [user])

    useEffect(() => {

        setTokenTracker(token as string);
    }, [token])


    const saveWebPage = async (status:number, type:string,ImgUri?:string, ) => {

        if (status === 200 && design?.elements && design?.elements?.length > 0) {
            setWebDesignState((prev)=>({ ...prev, prevImgUri: ImgUri }));
            //update the website setting
            await axios.post('/api/save-webprev/', {
                id: user?.id,
                websiteId: editorState?.websiteId,
                imageUri: "" + ImgUri
            }, {
                headers: { Authorization: `Bearer ${tokenTracker}` }
            })
        }

        //go for regular saving of page

        try {
            const __design_data =design ;
            if(__design_data !=null){
                
               if (type === "publish" ) {
                                __design_data.published = !design?.published;
                                setDesign({ ...design, published: !design?.published })
                            }
                delete __design_data['_id'];
                __design_data.settingMode = -1;
                
                
                            await axios.post('/api/save-webpage/', {
                                id: user?.id,
                                pageId: editorState.pageId,
                                pageJso: __design_data
                            }, {
                                headers: { Authorization: `Bearer ${tokenTracker}` }
                            }).then(() => {
                                
                                alert("Saved.")
                
                            }).catch(() => {
                                alert("Can not save the webpage")
                            })
            }

        } catch (e) {

            alert("Unable to save the webpage try again!");
        }
    }

    const removeWebPage = async () => {
        try {

            await axios.post('/api/remove-webpage/', {
                id: user?.id,
                pageId: editorState?.pageId,
                webId: editorState?.websiteId
            }, {
                headers: { Authorization: `Bearer ${tokenTracker}` }
            }).then(response => {
                // 
                alert("Deleted.")

                setEditorState({ ...editorState, pageId: response.data.pageId });
                router.push(`/designer/${editorState?.websiteId}/${response.data.pageId}/`);

            }).catch(() => {
                console.error("Can not delete the webpage")
                alert("Can not delete the webpage")
            })

        } catch (e) {

            alert("Unable to delete the webpage try again!");
        }
    }

    const getWebPageImageAndSavePage = async (type = "save") => {

        try {
            let prevPanel= document.querySelector('[data-prevpanel]');
     if(prevPanel!=null){
     await htmlToImage.toJpeg(prevPanel as HTMLElement, { quality: 0.95, width: prevPanel?.getBoundingClientRect()?.width, height: (205 / 280) * (prevPanel?.getBoundingClientRect()?.width ?? 200), canvasWidth: 280, canvasHeight: 205, backgroundColor: '#ffffff' })

         .then(function (dataUrl) {
        //
        saveWebPage(200, type, dataUrl)
    }).catch(err => {
        saveWebPage(500, "")
    })
}

        } catch (e) {

            alert("Unable to save the webpage! Try again!");
        }
    }


    const publishWebPage = async () => {

        if (design?.elements && design?.elements.length < 1) {
            alert("Can not publish blank page. Add elements to publish.");
            return;
        }
        getWebPageImageAndSavePage("publish");

    }
    // useEffect(() => {
    //     
    // }, [design])

    return (
   
        <pageDesignPreview.Provider value={{
             dropPosition,
             publishWebPage,
             nodeLevel,
             design,
             actElLayer,
             setELLayer,
             removeWebPage ,
             setDesign,
             tokenTracker,
             setTokenTracker,
             webDesignState,
             setWebDesignState,
             getWebPageImageAndSavePage
             }}>
            {children}
        </pageDesignPreview.Provider>
    )
}

const usePageDesignContext = () => {
    const c = useContext(pageDesignPreview)
  
    if (c === undefined) {
      throw new Error("useUserContext must be used within a UserProvider")
    }
  
    return c
  }

export {usePageDesignContext,PageDesignProvider};
