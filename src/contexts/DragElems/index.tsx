"use client"
import { useState, createContext, useContext } from "react";

interface IdragElemsContext{
    __dragElems:IdragElemsState;
    __setDragElems:Allow
}

const dragElemsContext = createContext<IdragElemsContext>({} as IdragElemsContext);
type IdragElemsState={
    customLayoutOptions:Array<Allow>
}

const DragElemsProvider = ({children}:{children: React.ReactNode}) => {
    const InitialDragElemsState = {
            customLayoutOptions: []
    }

    const [__dragElems, __setDragElems] = useState<IdragElemsState>(InitialDragElemsState);

    return (
        <dragElemsContext.Provider value={{ __dragElems, __setDragElems }}>
            {children}
        </dragElemsContext.Provider>
    )
}

const useDragElemContext = () => {
    const c = useContext(dragElemsContext)
  
    if (c === undefined) {
      throw new Error("useUserContext must be used within a UserProvider")
    }
  
    return c
  }

export {useDragElemContext,DragElemsProvider};
