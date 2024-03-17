"use client"
import React, {useState } from "react"


interface IClientContext {
search:boolean;
setSearch:React.Dispatch<React.SetStateAction<boolean>>

}

interface IClientProvider {
  children: React.ReactNode
}

const Context = React.createContext<IClientContext>({} as IClientContext)


const ClientProvider = ({ children }: IClientProvider) => {


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

const [search , setSearch] = useState<boolean>(false);


  return (
    <Context.Provider
      value={{search,setSearch}}
    >
      {children}
    </Context.Provider>
  )
}

const useClientContext = () => {
  const c = React.useContext(Context)

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return c
}

export { ClientProvider, useClientContext }
