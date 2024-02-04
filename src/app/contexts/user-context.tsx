import React, { useEffect, useRef, useState } from "react"

interface IUserContext {

 

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

  return (
    <Context.Provider
      value={{
 
      }}
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
