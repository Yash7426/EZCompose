'use client'
import React, { useRef, useEffect, useState } from 'react';
import nvstyle from './navbar.module.css';
import './navbar.css';
import { usePageDesignContext } from '@/contexts/page-design';
import { useuserDetailsContext } from '@/contexts/user-details';
import { useUserContext } from '@/contexts/user-context';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FaAngleDown, FaExternalLinkAlt } from "react-icons/fa";
import { IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { Page } from '@/interfaces/design';
import { Id } from '../../../convex/_generated/dataModel';
import Filter from '../mainfilter/filter';
import Button from '../ui/button';
import { IoMdAddCircle } from "react-icons/io";
import DropdownMenu from '../ui/dropdown';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Switch } from '../ui/switch';
interface MenuItem {
    name: string;
    href: string;
}

interface DropdownItem {
    name: string;
    onClick?: () => void;
    href?: string;
    target?: string;
}

interface Props {
    pages?: Page[];
    isPageDesign?: boolean;
    isPageDesignEmpty?: boolean;
}



const Navbar: React.FC = () => {
    const parentDropDownSlide = useRef<HTMLDivElement>(null);
    const dropdownSlide = useRef<HTMLDivElement>(null);

    const { webDesignState, setDesign, design, publishWebPage, getWebPageImageAndSavePage, removeWebPage } = usePageDesignContext();
    const { setEditorState, editorState } = useuserDetailsContext();
    const [checked, setChecked] = useState(false);
    const params = useParams<{ websiteId: string, pageId: string }>()
    const router = useRouter()
    // const isPageDesign= true;

    const isPageDesign = (params.pageId && params.websiteId) ? true : false
    const isPageDesignEmpty = (params.pageId && params.websiteId) ? true : false
    console.log("DE ", isPageDesignEmpty)
    console.log("DE2 ", isPageDesign)

    const { user } = useUserContext();





    const handleSliderBoxShow = () => {
        if (dropdownSlide.current != null) {
            dropdownSlide.current.style.opacity = '1';
            dropdownSlide.current.style.scale = '1';
        }
    };

    const handleSliderBoxRemove = () => {
        if (dropdownSlide.current != null) {
            dropdownSlide.current.style.scale = '0';
            dropdownSlide.current.style.opacity = '0';
        }
    };



    const createNewPage = () => {
        setDesign((prev) => ({ ...prev, settingMode: BigInt(4) }));
    };
    const handlePageChange = (pageId: Id<"webpage"> | undefined) => {
        setEditorState((prev) => ({ ...prev, pageId }))
        router.push(`/design/${editorState?.websiteId}/${pageId}`)
    };
    const handlePageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const value = e.target.value;
        // const filteredPages = webDesignState?.pages?.filter((page) => page.pageName.toLowerCase().includes(value.toLowerCase()));
        // setDesign((prev)=>({ ...prev, pages: filteredPages }));
    }

    const menuItems = [

        { id: 1, name: 'New Page', onClick: createNewPage, icon: <CiCirclePlus /> },
        { id: 2, name: 'Save Page', onClick: () => getWebPageImageAndSavePage('Save'), icon: <CiCirclePlus /> },
        { id: 3, name: 'Publish Page', onClick: publishWebPage, icon: <CiCirclePlus /> },
        { id: 4, name: 'Delete Page', onClick: removeWebPage, icon: <CiCirclePlus /> },
        { id: 5, name: 'Exit editor', href: '/my-websites', icon: <CiCirclePlus /> },
    ]
    const SettingsItems = [
        { id: 1, name: 'Settings & Meta', onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(3) })), icon: <CiCirclePlus /> },
        { id: 2, name: 'Font Manager', onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(1) })), icon: <CiCirclePlus /> },
        { id: 3, name: 'Google Analytics', onClick: () => setDesign((prev) => ({ ...prev, settingMode: BigInt(2) })), icon: <CiCirclePlus /> },
    ]
    const AboutItems = [
        { id: 1, name: 'Project Link', href: 'https://github.com/Yash7426/EZCompose', icon: <CiCirclePlus /> },
        { id: 2, name: 'Donate', href: 'https://github.com/Yash7426/EZCompose', icon: <CiCirclePlus /> },
    ]
    const PageItems = [

    ]

    useEffect(() => { }, [webDesignState])


    console.log("hello", isPageDesign)
    console.log(webDesignState)
    return (
        <nav className={nvstyle["navbar"]}>
            {/* <div className={nvstyle["navbar_header_logo"]}>WebPage Builder</div> */}
            {(isPageDesign && webDesignState?.pages && webDesignState.pages.length > 0) && (
                <>
                    <Filter
                        key={Math.random() * 1000}
                        inputType={"select"}
                        placeholder={"Enter Name of Page"}
                        value={"filter.value"}
                        onChange={(e) => { handlePageSearch }}
                        selectOptions={webDesignState.pages.map((page) => ({ value: page.pageId, label: page.pageName }))}
                        onOptionClick={(option) => { console.log("working ", option); handlePageChange(option.value as Id<"webpage">) }}

                        //   className={filter.className}
                        Variant="flex flex-col items-start  text-[14px] "
                    />
                </>
            )}
            <Button variant='outline' className='flex items-center gap-2 !bg-black !text-white' onClick={createNewPage}>
                <IoMdAddCircle />
                Create New
            </Button>
            <div ref={parentDropDownSlide} className={clsx(nvstyle["navbar_menu_bar"], (isPageDesign || isPageDesignEmpty) && nvstyle["expanded"])}>
                <ul className={clsx(nvstyle["navbar_menu_level_one"])} onMouseEnter={handleSliderBoxShow} onMouseLeave={handleSliderBoxRemove}>
                    {(isPageDesign || isPageDesignEmpty) ? (
                        <>

                            <DropdownMenu items={menuItems} />
                            <DropdownMenu items={SettingsItems} />
                            <DropdownMenu items={AboutItems} />
                        </>
                    ) : (
                        <DropdownMenu items={AboutItems} />
                    )
                    }
                </ul>
                <div ref={dropdownSlide} className={nvstyle["spanning_menu_box"]}></div>
            </div>
            {(isPageDesign || isPageDesignEmpty) && (
                <>
                    <div className='user-web-link'>
                        <span>{`http://${window.location.hostname}/web/${webDesignState?._id}/${design?.url}`}</span>
                        <Link className='external-open' href={(!design?.isPublished) ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/` : `/web/${webDesignState?._id}/${design?.url}`}><FaExternalLinkAlt /></Link>
                    </div>

                    <Switch
                        checked={!!design?.pageMode} // Convert BigInt to boolean
                        setChecked={(isChecked) => {
                            const newPageMode = isChecked ? BigInt(1) : BigInt(0); // Convert boolean to BigInt
                            setDesign((prev) => ({ ...prev, pageMode: newPageMode }));
                        }}
                    />
                    <div className={nvstyle["user_persistant_actions"]}>
                        {/* Here you can render the dropdown for Save/Update and Publish/Unpublish */}
                        <DropdownMenu items={[
                            { id: 1, name: (!design?.isPublished) ? 'Save' : 'Update', onClick: () => getWebPageImageAndSavePage((!design?.isPublished) ? "Save" : "Update"), icon: <CiCirclePlus /> },
                            { id: 2, name: (!design?.isPublished) ? 'Publish' : 'Unpublish', onClick: publishWebPage, icon: <CiCircleMinus /> },
                        ]} />
                    </div>
                    <div className={nvstyle["user_persistant_actions"]}>

                        <ul className={nvstyle["navbar_menu_level_one"]}>
                            <li>
                                <Link className={nvstyle["highlight_btn_light_prev"]} href={(!design?.isPublished) ? `/preview/${editorState?.websiteId}/${editorState?.pageId}/` : `/web/${webDesignState?._id}/${design.url}`} target="_blank">{(!design?.isPublished) ? "Preview" : "Open"}
                                </Link>
                            </li>
                            <li>
                                <button className={nvstyle["highlight_btn_light"]} onClick={() => getWebPageImageAndSavePage((!design?.isPublished) ? "Save" : "Update")}>{(!design?.isPublished) ? "Save" : "Update"}
                                </button>
                            </li>
                            <li>
                                <button onClick={publishWebPage} className={nvstyle["highlight_btn"]}>{(!design?.isPublished) ? "Publish" : "UnPublish"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}

        </nav>
    );
};

export default Navbar;
