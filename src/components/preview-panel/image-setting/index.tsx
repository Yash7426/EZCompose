import React, { useState, useEffect, useRef } from 'react'
import { Photo, Photos, PhotosWithTotalResults, createClient } from 'pexels';
import { set, get } from "lodash";
import './image-setting.css';
import { usePageDesignContext } from '@/contexts/page-design';
import { IoMdSearch } from "react-icons/io";
enum DisplayUnit {
    "px",
    "auto",
    "%"
}
enum loadType{
    "curated",
    "search"
}

interface IimageSearchSetting {
    imageAlt:string,
    imageWidth: number,
    imageHeight: number,
    isLoading: boolean,
    imageWidthUnit: DisplayUnit,
    imageHeightUnit: DisplayUnit,
    rType: string,
    q: string,
    cURI: string,
    page: number,
    perPage: number,
    totalResult: number,
    nextURI: number,
    loadType: loadType,
    panelMode: number,
    gotDetails: boolean
}
export default function ImageSetting(props:Allow) {

    let pageDesignState = usePageDesignContext();

    let loadMoreImages = useRef<HTMLDivElement>(null);
    const [imageList, setImageList] = useState<Partial<Photo>[]>([]);
    const [imageSearchSetting, setImageSearchSetting] = useState<IimageSearchSetting>({
        imageAlt: "",
        imageWidth: 300,
        imageHeight: 500,
        isLoading: false,
        imageWidthUnit: DisplayUnit.px,
        imageHeightUnit: DisplayUnit.px,
        rType: "Loading..",
        q: "",
        cURI: "",
        page: 1,
        perPage: 20,
        totalResult: 0,
        nextURI: -1,
        loadType: loadType.curated,
        panelMode: 0,
        gotDetails: false
    })

    useEffect(() => {
        //load initial images

        getElemValues();
    }, [])

    useEffect(() => {
        updatePrevs();

    }, [imageSearchSetting])

    const setNodeData = (elString:string, level:number, data:Allow) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString:string, level:number) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }

    const loadImages = async (type:loadType) => {



        if (type === loadType.curated) {
            if (!imageSearchSetting.isLoading && loadMoreImages.current) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                let client ;
                if(process.env.NEXT_PUBLIC_PEXELS_API_KEY){
                    client= createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

                }
                await client?.photos.curated({ per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                   if('photos' in photos  && loadMoreImages.current){
                       setImageList([...photos.photos])
                       
                                           if (photos.next_page ) {
                                               loadMoreImages.current.style.display = "block";
                                           } else {
                                               loadMoreImages.current.style.display = "none";
                                           }

                                           setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.photos.length, loadType: loadType.curated, isLoading: false, rType: "Popular Images" });
                   }



                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    if(loadMoreImages.current) loadMoreImages.current.style.display = "none";
                });
            }
        } else {
            //search uri
            if (!imageSearchSetting.isLoading && loadMoreImages.current) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: `Currently showing: ${imageSearchSetting.q}` });
                let client; 
                 if(process.env.NEXT_PUBLIC_PEXELS_API_KEY) client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
                const query = imageSearchSetting.q;

                await client?.photos.search({ query, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    if('photos' in photos && loadMoreImages.current){
                        setImageList((prev)=>([...prev,photos.photos as Partial<Photo>]))

                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                        setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page , page: (photos.page + 1), totalResult: photos.total_results, loadType: loadType.search, isLoading: false, rType: `Currently showing: ${imageSearchSetting.q}` });
                    }

                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    if(loadMoreImages.current) loadMoreImages.current.style.display = "none";
                });

            }
        }
    }

    const loadMore = async () => {

        if (imageSearchSetting.loadType === loadType.curated && loadMoreImages.current) {
            if (!imageSearchSetting.isLoading && loadMoreImages.current) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: "Popular Images" });
                //latest uri
                let client ;
                if (process.env.NEXT_PUBLIC_PEXELS_API_KEY) client= createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

                await client?.photos.curated({ page: imageSearchSetting.page, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    if( 'photos' in photos){
                        setImageList([...imageList, ...photos.photos])
                       if(photos.next_page && loadMoreImages.current){
                        loadMoreImages.current.style.display = "block";
                       }else{
                           if(loadMoreImages.current) loadMoreImages.current.style.display = "none";
                       }
                       
                       setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page , page: (photos.page + 1), totalResult: photos.photos.length, loadType: loadType.curated, isLoading: false, rType: "Popular Images" });


                    }
                }).catch(err => {
                    console.error(err);
                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    if(loadMoreImages.current)
                    loadMoreImages.current.style.display = "none";
                });
            }
        } else {
            //search uri
            if (!imageSearchSetting.isLoading && loadMoreImages.current) {
                loadMoreImages.current.style.display = "none";
                setImageSearchSetting({ ...imageSearchSetting, isLoading: true, rType: `Currently showing: ${imageSearchSetting.q}` });

                let client ;
                if(process.env.NEXT_PUBLIC_PEXELS_API_KEY) client =createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
                const query = imageSearchSetting.q;

                client?.photos.search({ page: imageSearchSetting.page, query, per_page: imageSearchSetting.perPage, orientation: "landscape" }).then(photos => {
                    if('photos' in photos && loadMoreImages.current){

                        setImageList((prev)=>([...prev, ...photos.photos]))
                        if (photos.next_page && loadMoreImages.current) {
                            loadMoreImages.current.style.display = "block";
                        } else {
                            loadMoreImages.current.style.display = "none";
                        }
                        setImageSearchSetting({ ...imageSearchSetting, nextURI: photos.next_page, page: (photos.page + 1), totalResult: photos.total_results, loadType: loadType.search, isLoading: false, rType: `Currently showing: ${imageSearchSetting.q}` });
                    }
                }).catch(() => {

                    setImageSearchSetting({ ...imageSearchSetting, isLoading: false, rType: "Something went wrong!" });
                    if(loadMoreImages.current) loadMoreImages.current.style.display = "none";
                });

            }
        }
    }

    const getElemValues = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (node && !imageSearchSetting.gotDetails) {
            const width=node.getAttribute("width")
            let WidthUnit = DisplayUnit.px
            if (width?.indexOf("%") != -1) {
                WidthUnit = DisplayUnit['%'];
            }
            if (width && isNaN(parseInt(width, 10))) {
                WidthUnit = DisplayUnit.auto;
            }
            const height=node.getAttribute("height")
            let HeightUnit = DisplayUnit.px;
            if (height?.indexOf("%") != -1) {
                HeightUnit = DisplayUnit['%'];
            }
            if (height && isNaN(parseInt(height, 10))) {
                HeightUnit = DisplayUnit.auto;
            }
        
            const src=node.getAttribute("src")
            const alt=(node.getAttribute("alt"))
          
            setImageSearchSetting({
                ...imageSearchSetting,
                cURI:src || "",
                imageAlt: alt ? alt : "",
                imageHeight: (height) ? parseInt(height, 10) : 500,
                imageWidth: (width) ? parseInt(width, 10) : 300,
                gotDetails: true,
                imageWidthUnit: WidthUnit,
                imageHeightUnit: HeightUnit
            })

            // loadImages("curated");
        }
    }

    const updatePrevs = () => {
        if (imageSearchSetting.gotDetails) {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement| null;
            if (node) {
                node.setAttribute("src", imageSearchSetting.cURI);
                node.setAttribute("alt", imageSearchSetting.imageAlt);
                if (imageSearchSetting.imageHeightUnit === DisplayUnit.auto)
                    node.setAttribute("height", imageSearchSetting.imageHeightUnit as unknown as string)
                else
                    node.setAttribute("height", imageSearchSetting.imageHeight + imageSearchSetting.imageHeightUnit as unknown as string)
    
                if (imageSearchSetting.imageWidthUnit === DisplayUnit.auto)
                    node.setAttribute("width", imageSearchSetting.imageWidthUnit as unknown as string)
                else
                    node.setAttribute("width", imageSearchSetting.imageWidth + imageSearchSetting.imageWidthUnit as unknown as string)

            }
        }
    }

    const updateImgPath = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (imageSearchSetting.gotDetails) {

            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
            const src=e.currentTarget.getAttribute("data-src")
            const alt=e.currentTarget.getAttribute("data-alt")
            if(node && src && alt){

                node.setAttribute("src", src);
                node.setAttribute("alt", alt);
                setImageSearchSetting({ ...imageSearchSetting, cURI: src, imageAlt: alt, panelMode: 1 })
            }

            //set the setting for it
        }

    }

    const saveImageSettings = () => {

        let currentNode = props.currentlyActive.current;

        let __el = getNodeData(currentNode, 0);

        let __new_attr = {
            src: imageSearchSetting.cURI,
            alt: imageSearchSetting.imageAlt
        } as {
            src:string;
            alt:string;
            height:DisplayUnit;
            width:DisplayUnit;
        }

        if (imageSearchSetting.imageHeightUnit === DisplayUnit.auto)
            __new_attr = { ...__new_attr, height: imageSearchSetting.imageHeightUnit }
        else
            __new_attr = { ...__new_attr, height: imageSearchSetting.imageHeight + imageSearchSetting.imageHeightUnit }

        if (imageSearchSetting.imageWidthUnit === DisplayUnit.auto)
            __new_attr = { ...__new_attr, width: imageSearchSetting.imageWidthUnit }
        else
            __new_attr = { ...__new_attr, width: imageSearchSetting.imageWidth + imageSearchSetting.imageWidthUnit }

        if (__el.attributes.length > 0) {
            __new_attr = { ...__el.attributes, __new_attr }
        }

        __el.attributes = __new_attr;

        setNodeData(currentNode, 0, __el);

        //close panel
        props.closePanel();

    }

    return (
        <div className='imageSettingPanel'>
            <div className='imagePanel'>
                <div className='imageListOption'>
                    <ul>
                        <li className={(imageSearchSetting.panelMode === 0) ? "active" : ""} onClick={() => { setImageSearchSetting({ ...imageSearchSetting, panelMode: 0 }) }}>Online Images</li>
                        <li className={(imageSearchSetting.panelMode === 1) ? "active" : ""} onClick={() => { setImageSearchSetting({ ...imageSearchSetting, panelMode: 1 }) }}>Custom Image</li>
                    </ul>
                </div>
                {
                    /**
                     * Online images
                     */
                    (imageSearchSetting.panelMode === 0) &&
                    <div className="imageOnlineSuggest">
                        {(imageList.length === 0) && <h3 className='emptyImageList'> Search the images you are looking for..</h3>}

                        <div className='image_search'>
                            <div className='bgImageSearchbar'>
                                <input className={"sbarImg"} type={"text"} onKeyDown={(e) => { if (e.key === "Enter") { loadImages(loadType.search) } }} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, q: e.target.value })} placeholder="Search images.."></input>
                                <button className='ImgSearchAct' onClick={() => loadImages(loadType.search)}><IoMdSearch /> </button>
                            </div>
                        </div>
                        <div className='image_results'>
                            {
                                (imageList.length > 0) ?
                                    imageList.map((e) => {
                                        return (<div className='BgImageItem' onClick={updateImgPath} key={e.id} style={{ backgroundImage: `url(${e?.src?.small})` }} data-alt={e.alt + " by " + e.photographer} data-src={e?.src?.large2x}></div>)
                                    })

                                    : null
                            }
                        </div>
                        <div ref={loadMoreImages} style={{ display: "none" }} className='show-more-images'>
                            <button onClick={loadMore}>Load more..</button>
                        </div>
                    </div>
                }
                {
                    /**
                     * Custom Image & settings
                     */
                    (imageSearchSetting.panelMode === 1) &&
                    <>
                        <div className='customImageApply'>
                            <div className='imageInputGroup'>
                                <h5>Image source:</h5>
                                <input type={"text"} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, cURI: e.target.value })} value={imageSearchSetting.cURI} />
                            </div>
                            <div className='imageInputGroup'>
                                <h5>Image Alt:</h5>
                                <input type={"text"} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageAlt: e.target.value })} value={(imageSearchSetting.imageAlt) ? imageSearchSetting.imageAlt : ""} />
                            </div>
                            <div className='imageSizing'>
                                <div className='imgSizeCol imageSizeWid'>
                                    <span>Width</span>
                                    <div className='innerSizeCol'>
                                        {
                                            (imageSearchSetting.imageWidthUnit !== DisplayUnit.auto) &&
                                            <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setImageSearchSetting({ ...imageSearchSetting, imageWidth: +e.target.value }) : ""} value={imageSearchSetting.imageWidth}></input>
                                        }



                                        <select className={(imageSearchSetting.imageWidthUnit === DisplayUnit.auto) ? "fullSizeUnit" : ""} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageWidthUnit: e.target.value as unknown as DisplayUnit })}>
                                            <option selected={(imageSearchSetting.imageWidthUnit === DisplayUnit.px) ? true : false} value={"px"}>px</option>
                                            <option selected={(imageSearchSetting.imageWidthUnit === DisplayUnit['%'])  ? true : false} value={"%"}>%</option>
                                            <option selected={(imageSearchSetting.imageWidthUnit === DisplayUnit.auto) ? true : false} value={"auto"}>auto</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='imgSizeCol imageSizeWid'>
                                    <span>Height</span>
                                    <div className='innerSizeCol'>
                                        {
                                            (imageSearchSetting.imageHeightUnit !== DisplayUnit.auto) &&
                                            <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setImageSearchSetting({ ...imageSearchSetting, imageHeight: +e.target.value }) : ""} value={imageSearchSetting.imageHeight}></input>
                                        }

                                        <select className={(imageSearchSetting.imageHeightUnit === DisplayUnit.auto) ? "fullSizeUnit" : ""} onChange={(e) => setImageSearchSetting({ ...imageSearchSetting, imageHeightUnit: e.target.value as unknown as DisplayUnit })}>
                                            <option selected={(imageSearchSetting.imageHeightUnit == DisplayUnit.px) ? true : false} value={"px"}>px</option>
                                            <option selected={(imageSearchSetting.imageHeightUnit == DisplayUnit['%']) ? true : false} value={"%"}>%</option>
                                            <option selected={(imageSearchSetting.imageHeightUnit == DisplayUnit.auto) ? true : false} value={"auto"}>auto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='applyImageSettings'>
                                <button onClick={saveImageSettings}>Apply</button>

                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
