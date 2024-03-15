import { useToken } from "@/hooks/use-token";
import React, { useContext, useEffect, useRef, useState } from "react"
import { useuserDetailsContext } from "./user-details";
import { Iuser } from "@/interfaces/user";

interface IUserContext {
user: Iuser;
setUser:React.Dispatch<React.SetStateAction<Iuser>>
 

}

interface IUserProvider {
  children: React.ReactNode
}

const Context = React.createContext<IUserContext>({} as IUserContext)


const UserProvider = ({ children }: IUserProvider) => {


// TO_DO -> When user logs in we have to set the user data here .(sameple provided below)
  
//   useEffect(() => {
//     if (session.data?.user?.name && session.status == "authenticated" && session !== undefined) {
//       const loaddata = async () => {
//         const data = await fetchData("/v1/auth", session?.data?.user?.name as string, "GET")
//         if (data?.error) {
//           signOut({
//             callbackUrl: "/?message=Session Expired.Log In again",
//           })
//         }
//         setuserData(data?.data?.user)
//       }
//       if (session.status == "authenticated") {
//         loaddata()
//       }
//     }
//   }, [session])

const [token] = useToken();
let {setUserDetails,userDetails} =useuserDetailsContext()

const getPayloadFromToken = (token:string) => {
  const encodedPayload = token.split('.')[1];
  return JSON.parse(atob(encodedPayload));
}


const [user, setUser] = useState<Iuser>(() => {
  if (!token) return null;

  return getPayloadFromToken(token as string);
})


useEffect(() => {
  if (!token) {
      setUser(null)
  } else {
      let __userData = getPayloadFromToken(token as string);
      setUser(__userData);

      if (userDetails) 
      setUserDetails({ ...userDetails,
     user: __userData.username, 
     email: __userData.email,
      _id: __userData.id,
      //  id: __userData.id
       })
  }
}, [token]);

  return (
    <Context.Provider
      value={{user, setUser}}
    >
      {children}
    </Context.Provider>
  )
}

const useUserContext = () => {
  const c = React.useContext(Context)

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return c
}

export { UserProvider, useUserContext }
