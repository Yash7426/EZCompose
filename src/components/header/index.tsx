'use client'
import React, { useRef, useEffect } from 'react';
import nvstyle from './navbar.module.css';
import './navbar.css';
import { usePageDesignContext } from '@/contexts/page-design';
import { useuserDetailsContext } from '@/contexts/user-details';
import { useUserContext } from '@/contexts/user-context';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FaAngleDown ,FaExternalLinkAlt} from "react-icons/fa";
import { IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { Page } from '@/interfaces/design';
import { Id } from '../../../convex/_generated/dataModel';

const Navbar: React.FC = () => {
    const parentDropDownSlide = useRef<HTMLDivElement>(null);
    const dropdownSlide = useRef<HTMLDivElement>(null);
    const selectPageList = useRef<HTMLDivElement>(null);

    const {webDesignState,setDesign,design,publishWebPage,getWebPageImageAndSavePage,removeWebPage} = usePageDesignContext();
    const {setEditorState,editorState} =useuserDetailsContext();
    const params = useParams<{websiteId:string,pageId:string}>()
    const router=useRouter()
    // const isPageDesign= true;
    
    const isPageDesign = (params.pageId && params.websiteId) ? true:false 
    const isPageDesignEmpty = (params.pageId && params.websiteId) ? true:false
    console.log("DE ",isPageDesignEmpty)
    console.log("DE2 ",isPageDesign)

    const {user} = useUserContext();

    useEffect(() => {
        // Additional side effects can be added here
    }, [webDesignState]);

    const currentActiveMenu = ( e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const b=e.currentTarget.closest("li")?.getAttribute("data-elementId")
        let elpos=b ? +b:null;
        
   

        let allListEl = parentDropDownSlide.current?.querySelectorAll("li[data-elementid]");
     

        if (elpos!=null && elpos - 2 > -1 && allListEl) {
            //prev elem

            const a = allListEl[elpos - 2].querySelector("ul")
            if (a) {
                a.style.transform  = `translateX(${allListEl[elpos - 2].getBoundingClientRect().width}px) `;
                a.style.scale = "0";
            }
        }

        if (elpos!=null && allListEl && (elpos) < (allListEl.length)) {
            (allListEl[elpos].querySelector("ul") as HTMLUListElement).style.transform = `translateX(-${allListEl[elpos].getBoundingClientRect().width}px) `;
            (allListEl[elpos].querySelector("ul") as HTMLUListElement).style.scale = "0";
        }

        //set current active elem
        let el = e.currentTarget.closest("li")?.querySelector("ul");
        if (el) {
            el.style.transform = `translateX(0px) rotateY(0deg)`
            el.style.scale = "1";
        }

        //get child heigh
        let ht = e.currentTarget.closest("li")?.getAttribute("data-dropheight");
        if(ht && dropdownSlide.current && parentDropDownSlide.current){

            dropdownSlide.current.style.transform = `translateX(${(e.currentTarget.getBoundingClientRect().x - parentDropDownSlide.current.getBoundingClientRect().x - 10)}px)`;
            dropdownSlide.current.style.height = ht + 'px';
        }

    }

    const elementLeaveRemove = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        let el = e.currentTarget.closest("li")?.querySelector("ul");
        if (el) {
            el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`
            el.style.scale ="0";
        }
    }

    const handlePageChange = (pageId: Id<"webpage">) => {
        setEditorState((prev)=>({ ...prev, pageId }))
    };

    const handleSliderBoxShow = () => {
        if(dropdownSlide.current!=null ){
            dropdownSlide.current.style.opacity = '1';
            dropdownSlide.current.style.scale = '1';
        }
    };

    const handleSliderBoxRemove = () => {
        if(dropdownSlide.current!=null ){
        dropdownSlide.current.style.scale = '0';
        dropdownSlide.current.style.opacity = '0';
        }
    };

    const createNewPage = () => {
        setDesign((prev)=>({ ...prev, settingMode: BigInt(4) }));
    };
    const elementInnerLeaveRemove = ( e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {

        if (e.clientY > 40) {
            let el = e.currentTarget.closest("li[data-elementid]")?.querySelector("ul");
            if (el) {
                el.style.transform = `translateX(0px) rotateY(0deg) scale(0)`
                el.style.scale = "0";
                el.style.height = "0";
            }
        }
    }


    const renderPageOptions = (pages: Page[]) => {
        return (
            <ul className='selectPage'>
                <div className='inList'>
                    {pages.map((page, index) => (
                        <li key={index} className={editorState?.pageId === page.pageId ? 'active menuPagesList' : 'menuPagesList'}>
                            <Link className='pageOption' href={`/design/${editorState?.websiteId}/${page.pageId}`} data-page-id={page.pageId} onClick={() => handlePageChange(page.pageId)}>
                                {page.pageName}
                            </Link>
                        </li>
                    ))}
                </div>
                <hr />
                <button onClick={createNewPage}>+ Create New Page</button>
            </ul>
        );
    };

    useEffect(()=>{},[webDesignState])


    console.log("hello",isPageDesign)
    console.log(webDesignState)
    return (
        <nav className={nvstyle["navbar"]}>
            <div className={nvstyle["navbar_header_logo"]}>WebPage Builder</div>
            {(isPageDesign && webDesignState?.pages && webDesignState.pages.length > 0) && (
                <div className={nvstyle["navbar_header_logo"]}>
                    <span className='pageSelectorSpan' onClick={() => selectPageList.current?.classList.toggle("show")}>
                        {webDesignState.pages.map((page) => (editorState?.pageId === page?.pageId ? page.pageName : null))}
                    </span>
                    <>
                        <button className='selectPage' onClick={() => selectPageList.current?.classList.toggle("show")}>
                        <FaAngleDown />
                        </button>
                        <div ref={selectPageList} className='subPagesList'>
                            {renderPageOptions(webDesignState.pages)}
                        </div>
                    </>
                </div>
            )}
            <div ref={parentDropDownSlide} className={clsx( nvstyle["navbar_menu_bar"],(isPageDesign || isPageDesignEmpty) && nvstyle["expanded"])}>
                <ul className={nvstyle["navbar_menu_level_one"]} onMouseEnter={handleSliderBoxShow} onMouseLeave={handleSliderBoxRemove}>
                    {(isPageDesign || isPageDesignEmpty) ? (
                        <>
                        <li data-elementid="1" data-dropheight="115" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <a href='#'>WebPage</a>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li><button onClick={createNewPage}>New Page</button></li>
                                <li><button onClick={()=>getWebPageImageAndSavePage("Save")}>Save Page</button></li>
                                <li><button onClick={publishWebPage} >Publish Page</button></li>
                                {(webDesignState?.pages && webDesignState.pages.length > 1) && <li><button onClick={removeWebPage}>Delete Page</button></li>}
                                <li><Link href='/my-websites'>Exit editor</Link></li>
                            </ul>
                        </li>
                        <li data-elementid="2" data-dropheight="86" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <button onClick={()=>router.push('#')}>Settings</button>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li className={nvstyle["pointerHover"]}><button onClick={() => { setDesign((prev)=>({ ...prev, settingMode: BigInt(3) }))}}>Settings & Meta</button></li>
                                <li className={nvstyle["pointerHover"]}><button onClick={() => { setDesign((prev)=>({ ...prev, settigMode: BigInt(1) })) }}>Font Manager</button></li>
                                {/* <li className={nvstyle["pointerHover"]}><a href='/'>Social Links</a></li> */}
                                <li className={nvstyle["pointerHover"]}><a onClick={() => { setDesign((prev)=>({ ...prev, settingMode: BigInt(2) })) }} >Google Analytics</a></li>
                            </ul>
                        </li>

                        <li data-elementid="3" data-dropheight="57" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <a href='/'>About</a>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li><a href='https://github.com/abhibagul/Wix-Clone' target="_blank">Project Link</a></li>
                                <li><a href='/'>Donate</a></li>
                            </ul>
                        </li>
                    </> 
                    ) : (
                        <li data-elementid="1" data-dropheight="57" onMouseEnter={currentActiveMenu} onMouseLeave={elementLeaveRemove}>
                            <Link href='/'>About</Link>
                            <ul className={nvstyle["navbar_menu_level_two"]} onMouseLeave={elementInnerLeaveRemove}>
                                <li><Link href='https://github.com/abhibagul/Wix-Clone'>Project Link</Link></li>
                                <li><Link href='/'>Donate</Link></li>
                            </ul>
                        </li>
                    )}
                </ul>
                <div ref={dropdownSlide} className={nvstyle["spanning_menu_box"]}></div>
            </div>
            {(isPageDesign || isPageDesignEmpty) && (
                <>
                <div className='user-web-link'>
                    <span>{`http://${window.location.hostname}/web/${webDesignState?._id}${design?.url}`}</span>
                    <Link className='external-open'  href={(!design?.isPublished) ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/` : `/web/${webDesignState?._id}${design?.url}`}><FaExternalLinkAlt /></Link>
                </div>

                
                <div className={nvstyle["user_persistant_actions"]}>
                    <ul className={nvstyle["navbar_menu_level_one"]}>
                        <li><Link onClick={() => setDesign((prev)=>({ ...prev, pageMode: 1 }))} className={clsx(nvstyle["btn_responsive"] ,"responsive_mobile" , ((design?.pageMode) ? nvstyle["active"] : null))} href='#'><IoDesktopOutline /></Link></li>
                        <li><Link onClick={() => setDesign((prev)=>({ ...prev, pageMode: 0 }))} className={clsx(nvstyle["btn_responsive"] ," responsive_pc" , ((!design?.pageMode) ? nvstyle["active"] : null))} href='#'><FaMobileAlt /></Link></li>
                    </ul>
                </div>

                <div className={nvstyle["user_persistant_actions"]}>
                    <ul className={nvstyle["navbar_menu_level_one"]}>
                        <li><Link className={nvstyle["highlight_btn_light_prev"]} href={(!design?.isPublished) ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/` : `/web/${webDesignState?._id}${design.url}`} target="_blank">{(!design?.isPublished) ? "Preview" : "Open"}</Link></li>
                        <li><button className={nvstyle["highlight_btn_light"]} onClick={()=>getWebPageImageAndSavePage((!design?.isPublished) ? "Save" : "Update")}>{(!design?.isPublished) ? "Save" : "Update"}</button></li>
                        <li><button onClick={publishWebPage} className={nvstyle["highlight_btn"]}>{(!design?.isPublished) ? "Publish" : "UnPublish"}</button></li>
                    </ul>
                </div>
                </>
            )}
            <div className={nvstyle["navbar_user_details"]}>
                <ul className={nvstyle["navbar_user_details"]}>
                    <li>
                        <Link href='/' className={nvstyle["navbar_user_profile"]}>{user?.name ? user?.name.charAt(0).toUpperCase() : 'U'}</Link>
                        <ul>
                            <li><Link href='/my-websites'>My Websites</Link></li>
                            <li><div onClick={() => { localStorage.removeItem('token'); router.push("/") }}>Logout</div></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
