"use client"
import { createContext, useContext, useState } from "react";
interface IcssSheetPreview{
  cssSheet:Allow
  setCssSheet:Allow
}
interface IcssSheetProvider{
  children: React.ReactNode
    
}

 const cssSheetPreview = createContext<IcssSheetPreview>({} as IcssSheetPreview);

const CssSheetPreviewProvider=({children}:IcssSheetProvider)=>{

    const [cssSheet, setCssSheet] = useState("");


    return (
        <cssSheetPreview.Provider value={{ cssSheet, setCssSheet }}>
            {children}
        </cssSheetPreview.Provider>
    )
}


const useCssSheetPreviewContext = () => {
    const c = useContext(cssSheetPreview)
  
    if (c === undefined) {
      throw new Error("useUserContext must be used within a UserProvider")
    }
  
    return c
  }

export {CssSheetPreviewProvider,useCssSheetPreviewContext};
