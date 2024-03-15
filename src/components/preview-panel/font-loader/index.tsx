import { FontOption } from '@/interfaces/design';
import React, { useEffect } from 'react'
import GoogleFontLoader from 'react-google-font-loader';

interface IFontLoaderProps {
    fontList:FontOption[]
}
const  FontLoader:React.FC<IFontLoaderProps> =({fontList})=> {

    useEffect(() => {
    }, [fontList])

    return (
        <>
            {(fontList.length > 0) && <GoogleFontLoader fonts={fontList} />}
        </>
    )
}

export default FontLoader