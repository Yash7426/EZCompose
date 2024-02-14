import React, {useEffect } from 'react'
import { useCssSheetPreviewContext } from '@/contexts/cssSheetPreview'

export default function SetStyle(props:Allow) {

    let cssSheetPreviewState = useCssSheetPreviewContext();

    useEffect(() => {
    }, [cssSheetPreviewState.cssSheet])

    return (
        <style>
            {cssSheetPreviewState.cssSheet}
        </style>
    )
}
