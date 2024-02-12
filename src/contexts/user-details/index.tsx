import { useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from "react";
import { useUserContext } from "@/contexts/user-context";
// import { useUser } from "../../Component/auth/useUser";

interface IuserDetailsContext{
userDetails:IuserDetails|null;
setUserDetails: Dispatch<SetStateAction<IuserDetails | null>>;
setEditorState: Dispatch<SetStateAction<{}>>
editorState: IeditorState;


}

const userDetailsPreview = createContext<IuserDetailsContext>({} as IuserDetailsContext);

const UserDetailsProvider = ({children}:{children: React.ReactNode}) => {

    const initialUserDetails:IuserDetails = {
        user: "",
        email: "",
        _id: "",
        pageId: "",
        websiteId: "",
        id: ""     
    }
    const [userDetails, setUserDetails] = useState<IuserDetails | null>(initialUserDetails)
    const [editorState, setEditorState] = useState({})
    const {user}= useUserContext();

    useEffect(() => {

        if (user ) {
            setUserDetails({ ...user, user:user.username})

        }
    }, [user])

    useEffect(() => {
        
    }, [editorState])

    return (
        <userDetailsPreview.Provider value={{ userDetails, setUserDetails, editorState, setEditorState }}>
            {children}
        </userDetailsPreview.Provider>
    )
}

const useuserDetailsContext = () =>{
    const c = useContext(userDetailsPreview);
    if (c === undefined) {
        throw new Error("useUserContext must be used within a UserProvider")
      }
    
      return c
}   

export  {UserDetailsProvider, useuserDetailsContext};
