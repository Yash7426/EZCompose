"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'next/navigation';
import parse from 'html-react-parser';
import SetStyle from './setStyle';

import './previewPage.css'
import { useUserContext } from '@/contexts/user-context';
import { useCssSheetPreviewContext } from '@/contexts/cssSheetPreview';
import FontLoader from '../preview-panel/font-loader';
import { useToken } from '@/hooks/use-token';
import { useQuery } from 'convex/react';
import { Id } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
export default function PreviewPage() {

    const user = useUserContext();
    const [token,] = useToken();
    const __webpageParams = useParams();
    let cssSheetPreviewState = useCssSheetPreviewContext()

    const webpage = useQuery(
        api.webpage.getWebpage,
        __webpageParams.pageId ? { id:  __webpageParams.pageId as Id<"webpage">}:"skip"
    );

    const pageStyle = useRef([`html,body{border: 0;padding: 0;margin: 0;outline: 0;}`]);
    const scrollPosition = useRef(0);

    type IpreviewPageType={
        loaded:boolean;
        page:Partial<ILinkElement>;
        authorized:boolean;
    }
    const [prevPage, setPrevPage] = useState<IpreviewPageType>({
        loaded: false,
        page: {} as ILinkElement,
        authorized: false
    });




    useEffect(() => {
        getCurrentScollPosition();

        bindScrollingListeners();
    }, [prevPage])



    useEffect(() => {


        getPagePrev();

        bindScrollingListeners();

        let ele=document.querySelector('.webPagePrev')
        if(ele){
            ele.addEventListener('scroll', getCurrentScollPosition);
        }


        return () => {
            window.removeEventListener('scroll', getCurrentScollPosition);
        }


    }, [webpage]);


  

    const getPagePrev = async () => {
        try {
            if(webpage){
                setPrevPage({ ...prevPage, page: webpage, authorized: true, loaded: true })
            }
            else{
                setPrevPage({ ...prevPage, authorized: false, loaded: true })
            }

        } catch (e) {

            setPrevPage({ ...prevPage, authorized: false, loaded: true })
        }
    }
    interface MultiHTMLCompProps {
        e: Allow[]; // Define the type for the array of elements
        datapath: string;
    }

    const MultiHTMLComp = (props:MultiHTMLCompProps) => {

        return (
            <>
                {
                    props.e.map((el, i) => {
                        let htmlCon = "";
                        if (el.hasOwnProperty("inHTML")) htmlCon = el.inHTML;
                        return (<GenerateHTMLComp element={el} datapath={props.datapath + i + ','} key={i} >{htmlCon}</GenerateHTMLComp>)
                    })
                }
            </>
        )
    }

    // const getClassNames = (e, __clsName) => {



    //     if (typeof e == 'string') {
    //         return e + " " + __clsName;
    //     }

    //     if (typeof e == 'object') {
    //         return [...e, __clsName].join(" ");
    //     }
    //     return e;
    // }
    const getClassNames = (e: string | string[], __clsName: string): string => {
        if (typeof e === 'string') {
            return e + " " + __clsName;
        }
    
        if (Array.isArray(e)) {
            return [...e, __clsName].join(" ");
        }
        
        return e;
    }

    // const styleToString = (style) => {
    //     return Object.keys(style).reduce((acc, key) => (
    //         acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
    //     ), '');
    // };
    type StyleKey = keyof React.CSSProperties;

    const styleToString = (style: React.CSSProperties): string => {
        return Object.keys(style).reduce((acc, key) => {
            const cssKey = key as StyleKey; // Assert key as StyleKey
            return acc + cssKey.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[cssKey] + ';';
        }, '');
    };

    const GenerateHTMLComp = (props:Allow) => {

        let e = props.element;
        let formatStyle = { ...e.styles };
        //create class
        let __dp = props.datapath;
        __dp = __dp.split(",")
        let __clsName = "bld_" + __dp.join("_");
        let _all_classes = getClassNames(e.classList, __clsName);
        let __temp__styling = `.${__clsName}{${styleToString(formatStyle)}}`;
        let elProp = { ...e.attributes, className: _all_classes };

        if (!pageStyle.current.includes(__temp__styling)) {
            if (formatStyle.hasOwnProperty("animationName")) {

                let animateClassName = __clsName + ".animate";

                let __anim__styling = `.${animateClassName}{animation-name:${formatStyle["animationName"]};animation-fill-mode: forwards;}`;

                delete formatStyle["animationName"];

                let __temp__styling = `.${__clsName}{${styleToString(formatStyle)};}`;
                if (!pageStyle.current.includes(__temp__styling)) {
                    pageStyle.current = [...pageStyle.current, __temp__styling, __anim__styling];
                }

                elProp = { ...elProp, ["data-has-animation"]: "true" }

            } else {
                pageStyle.current = [...pageStyle.current, __temp__styling]
            }
        }

        // let elProp = { className: e.classList, "data-path": props.datapath };
        if (e.elements.length > 0) {
            //has sub elem

            if (e.elements.length < 2) {
                //single element
                let htmlCon = "";
                if (e.hasOwnProperty("inHTML")) htmlCon = e.inHTML;

                return React.createElement(e.elemType, elProp, <GenerateHTMLComp datapath={props.datapath + '0,'} element={e.elements[0]} >{htmlCon}</GenerateHTMLComp>);
            } else {
                //more then one element
                let allElems = [];
                return React.createElement(e.elemType, elProp, <MultiHTMLComp datapath={props.datapath} e={e.elements} />);
            }

        } else {
            let htmlCon = "";
            if (e.hasOwnProperty("inHTML")) htmlCon = decodeURIComponent(e.inHTML);

            if (e.elemType === "img") {

                return React.createElement(e.elemType, elProp);
            }


            return React.createElement(e.elemType, elProp, [parse(htmlCon)]);

        }
    }

    const pageFunctionMoveToTop = () => {
        let a1=document.querySelector(".webPagePrev") as HTMLElement
        a1.scrollTop = 0;
    }

    // const bindScrollingListners = () => {
    //     let _els = document.querySelectorAll(`a[href="modify:pageFunctionMoveToTop"]`);
    //     for (let _e of _els) {
    //         _e.removeAttribute("href");
    //         _e.addEventListener("onclick", () => {
    //             pageFunctionMoveToTop();
    //         })
    //     }
    // }
    const bindScrollingListeners = () => {
        let _els = document.querySelectorAll(`a[href="modify:pageFunctionMoveToTop"]`);
        for (let i = 0; i < _els.length; i++) {
            let _e = _els[i] as HTMLAnchorElement;
            _e.removeAttribute("href");
            _e.addEventListener("click", () => {
                pageFunctionMoveToTop();
            });
        }
    };

    const getCurrentScollPosition = () => {
        // const position = window.pageYOffset;
        // scrollPosition.current = (position);
        let webPageEle=document.querySelector('.webPagePrev')
        if(webPageEle==null){
            return
        }
        let __posTop = webPageEle.scrollTop;

        let __elm = document.querySelectorAll('[data-has-animation]');
        let __wh = window.innerHeight;


        // for (let __e of __elm) {
        //     if (__posTop > (__e.getBoundingClientRect().top - (__wh * 0.9))) {
        //         if (!__e.classList.contains("animate")) __e.classList.add("animate");
        //     }
        // }
        for (let i = 0; i < __elm.length; i++) {
            let __e = __elm[i];
            if (__posTop > (__e.getBoundingClientRect().top - (__wh * 0.9))) {
                if (!__e.classList.contains("animate")) __e.classList.add("animate");
            }
        }
    }


    return (<>
        <div className='webPagePrev'>
            <div className='preview_panel_bar'>
                ⚠ This is just a preview of your website, the link will not work for any other user.<br /> Actual link can be opened when page is published.
            </div>
            {(prevPage.loaded && prevPage.authorized) ?
                <>
                    <div className='web_page_preview'>
                    <FontLoader fontList={prevPage.page.fonts ?? []} />
                        {
                            prevPage.page.elements?.map((e, i) => {

                                if (prevPage.page.elements?.length == (i + 1)) {
                                    cssSheetPreviewState.setCssSheet(pageStyle.current.join("\n"))
                                }

                                return (

                                    <GenerateHTMLComp key={i} datapath={i + ','} element={e} />

                                );
                            })


                        }
                    </div>
                </>
                :
                <>
                    {(prevPage.loaded) ? "Loading" : "Unauthorized"}
                </>
            }

        </div>
        <SetStyle />

    </>
    )
}
