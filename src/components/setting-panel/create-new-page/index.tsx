import React, { useState, useContext } from 'react'
import './createNewPage.css'

import { useuserDetailsContext } from '@/contexts/user-details';
import { usePageDesignContext } from '@/contexts/page-design';
import { useRouter } from 'next/navigation';
import { useToken } from '@/hooks/use-token';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import useStoreUserEffect from '@/app/useStoreUserEffect';

export default function CreateNewPage(props:Allow) {

    let UserDetailsState = useuserDetailsContext();
    // let pageDesignState = usePageDesignContext();
    const user = useStoreUserEffect();
    const router = useRouter();

    let [pageName, setPageName] = useState("About")
    let [pageUri, setNewPageUri] = useState("about")
    const [token,] = useToken();
    const createWebpage = useMutation(api.webpage.createWebpage);



    const createNewPage = async () => {


        //remove special chars from the uri
        let _pageUri = pageUri.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");

        if (pageName.length < 5) {
            alert("Page name has to be at least 5 characters");
            return;
        }

        if (_pageUri.length < 5) {
            alert("Page Uri has to be at least 5 characters")
            return;
        }


        try {
            let _pageUri = pageUri.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
            try {
                const pageId = await createWebpage({
                    faviconUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFf_7kDwWnZhDhBoJfNqdCXtceqDMhh5yzMQ&usqp=CAU",
                    description: "",
                    socialImage: "",
                    title: pageName,
                    author: user?._id as Id<'users'>,
                    url:  _pageUri,
                    isPublished: false,
                    isDropEnabled: true,
                    analyticsId: "",
                    fonts: [],
                    settingMode:BigInt(-1),
                    websiteId: UserDetailsState.editorState?.websiteId as Id<'website'>,
                    elements: [],
                    prevImageUri:""
                });
                UserDetailsState.setEditorState({ ...UserDetailsState.editorState, pageId: pageId })

                router.push(`/design/${UserDetailsState.editorState?.websiteId}/${pageId}/`)
                props.closeWin();
              } catch (error) {
                console.error(error);
            }

        

            

        } catch (e) {

            alert("Something went wrong.")
        }
    }

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">
                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Create New Page
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
            </div>
            <div className='googleAnalyticsContent cratenewpage'>

                <div className='googleAnalyticsInner'>
                    <h5>Page Name: </h5>
                    <input type="text" onChange={(e) => setPageName(e.target.value)} value={pageName} placeholder="Page Name" />
                </div>
                <div className='googleAnalyticsInner'>
                    <h5>Page Url: </h5>
                    <div className='url_prev'>
                        <span>yourwebsite.com/</span>
                        <input type="text" onChange={(e) => setNewPageUri(e.target.value)} value={pageUri} placeholder="Url for the webpage" />
                    </div>
                </div>
                <div className='footerStickyFontManager'>

                    <div className='applyFonts'>
                        <button onClick={createNewPage}>Create Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
