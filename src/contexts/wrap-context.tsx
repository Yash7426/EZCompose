import React from 'react'
import { CssSheetPreviewProvider } from './cssSheetPreview'
import { UserDetailsProvider } from './user-details'
import { PageDesignProvider } from './page-design'
import { DragElemsProvider } from './DragElems'
import { ClientProvider } from './client-context'
import { ModalProvider } from './modal-context'
export default function WrapContexts({children}:{children: React.ReactNode}) {
    return (
        <>
        <ModalProvider>
        <ClientProvider>
            <CssSheetPreviewProvider>
                <UserDetailsProvider>
                    <PageDesignProvider>
                        <DragElemsProvider>
                            {children}
                        </DragElemsProvider>
                    </PageDesignProvider>
                </UserDetailsProvider>
            </CssSheetPreviewProvider>
            </ClientProvider>
            </ModalProvider>
        </>
    )
}
