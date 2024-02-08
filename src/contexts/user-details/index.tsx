import { useState, useEffect, createContext, useContext } from "react";
// import { useUser } from "../../Component/auth/useUser";

interface IuserDetailsContext{

}

const userDetailsPreview = createContext<IuserDetailsContext>({} as IuserDetailsContext);

const UserDetailsProvider = ({children}:{children: React.ReactNode}) => {

    const initialUserDetails:IuserDetailsContext = {
        user: "",
        email: "",
        _id: "",
        pageId: "",
        websiteId: "",
        id: ""
    }
    const [user, setUserDeatils] = useState<IuserDetailsContext | null>(initialUserDetails)
    const [editorState, setEditorState] = useState({})

    // const userId = useUser();

    // useEffect(() => {

    //     if (userId) {
    //         setUserDeatils({ ...userId, user: userId.username })

    //     }
    // }, [userId])

    // useEffect(() => {
    //     
    // }, [editorState])

    return (
        <userDetailsPreview.Provider value={{ user, setUserDeatils, editorState, setEditorState }}>
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
