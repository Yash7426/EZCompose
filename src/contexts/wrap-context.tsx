import React from 'react'
import { CssSheetPreviewProvider } from './cssSheetPreview'
import { UserDetailsProvider } from './user-details'
import { PageDesignProvider } from './page-design'
import { DragElemsProvider } from './DragElems'
export default function wrapContexts({children}:{children: React.ReactNode}) {
    return (
        <>
            <CssSheetPreviewProvider>
                <UserDetailsProvider>
                    <PageDesignProvider>
                        <DragElemsProvider>
                            {children}
                        </DragElemsProvider>
                    </PageDesignProvider>
                </UserDetailsProvider>
            </CssSheetPreviewProvider>
        </>
    )
}
