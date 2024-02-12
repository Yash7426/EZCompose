import { useState, createContext, useContext } from "react";

interface IdragElemsContext{

}

const dragElemsContext = createContext<IdragElemsContext>({} as IdragElemsContext);


const DragElemsProvider = ({children}:{children: React.ReactNode}) => {
    const InitialDragElemsState = {
        customLayoutOptions: []
    }

    const [__dragElems, __setDragElems] = useState(InitialDragElemsState);




    // useEffect(() => {
    //     
    // }, [design])

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
