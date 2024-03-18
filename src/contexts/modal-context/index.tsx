"use client"
/**
 * Provides a modal context and hook for managing modal state in a TypeScript React application.
 *
 * @module ModalProvider
 * @example
 *The ModalProvider component is a context provider that holds the state of a modal. The state includes whether the modal is open (isOpen), the text of a *button (buttonText), an onClick function, an onClose function, and the content and title of the modal (content and title).
 *
 *The useState hook is used to manage the state of the modal. The initial state is set with isOpen as false, buttonText as an empty string, onClick and  *onClose as empty functions, and content and title as empty JSX elements.
 *
 *The useModalContext hook is a custom hook that allows components to access the modal context. It uses the useContext hook to access the context and returns *the context value. If the hook is used outside of a ModalProvider, it throws an error.
 *
 *To use this in your application, wrap your application with the ModalProvider component and use the useModalContext hook in any component where you want to  *access or modify the modal state.
 */

 import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

 interface IModalContext {
   modalData: {
     isOpen: boolean
     onClick: () => void
     buttonText: string
     onClose: () => void
     content: JSX.Element
     title: JSX.Element
   }
   setmodalData: Dispatch<
     SetStateAction<{
       isOpen: boolean
       onClick: () => void
       buttonText: string
       onClose: () => void
       content: JSX.Element
       title: JSX.Element
     }>
   >
    handleClose: () => void
 }
 interface IModalProvider {
   children: React.ReactNode
 }
 
 const Context = createContext<IModalContext>({} as IModalContext)
 
 const ModalProvider = ({ children }: IModalProvider) => {
   const [modalData, setmodalData] = useState({
     isOpen: false,
     buttonText: "",
     onClick: () => {},
     onClose: () => {},
     content: <></>,
     title: <></>,
   })
   const handleClose = () => {
    setmodalData(() => ({
      buttonText: "",
      onClick: () => {},
      content: <></>,
      isOpen: false,
      onClose: () => {},
      title: <></>,
    }))
  }
 
   return <Context.Provider value={{ modalData, setmodalData,handleClose }}>{children}</Context.Provider>
 }

 
 const useModalContext = () => {
   const c = useContext(Context)
 
   if (c === undefined) {
     throw new Error("useUserContext must be used within a UserProvider")
   }
 
   return c
 }
 export { ModalProvider, useModalContext }
 