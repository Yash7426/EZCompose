import React, { useState, useEffect, useRef, useContext } from 'react'
import { set, get } from "lodash";

import './iframe-setting.css'
import { usePageDesignContext } from '@/contexts/page-design';
enum DisplayUnit {
    "px",
    "auto",
    "%"
}

export default function InlineFrameSetting(props:Allow) {

    let pageDesignState = usePageDesignContext()

    const [iSetting, setISetting] = useState({
        src: "https://google.com",
        width: 200,
        height: 300,
        widthUnit: DisplayUnit.px,
        heightUnit: DisplayUnit.px, 
        allowtransparency: "true",
        gotDetails: false,
    })

    useEffect(() => {
        //set initial values
        initialIframeData();
    }, [])

    useEffect(() => {
        if (iSetting.gotDetails) {
            updateElPrev();
        }
    }, [iSetting]);

    const setNodeData = (elString:string, level:number, data:Allow) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState?.design }

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

    const updateElPrev = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement;
        node.setAttribute("src", iSetting.src);
        node.setAttribute("allowtransparency", iSetting.allowtransparency);

        if (iSetting.heightUnit === DisplayUnit.auto)
            node.setAttribute("height", iSetting.heightUnit as unknown as string)
        else
            node.setAttribute("height", String(iSetting.height + iSetting.heightUnit))

        if (iSetting.widthUnit === DisplayUnit.auto)
            node.setAttribute("width", iSetting.widthUnit as unknown as string)
        else
            node.setAttribute("width", String(iSetting.width + iSetting.widthUnit))
    }

    const initialIframeData = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
        if (node && !iSetting.gotDetails) {

            let WidthUnit = DisplayUnit.px;
           let width= node.getAttribute("width")
           let height= node.getAttribute("height")
           let src=node.getAttribute("src")

            if (width?.indexOf("%") != -1) {
                WidthUnit = DisplayUnit['%'];
            }
            if (isNaN(parseInt(width || "0", 10))) {
                WidthUnit = DisplayUnit.auto;
            }

            let HeightUnit = DisplayUnit.px;
            if (height?.indexOf("%") != -1) {
                HeightUnit = DisplayUnit['%'];
            }
            if (isNaN(parseInt(height || "0", 10))) {
                HeightUnit = DisplayUnit.auto;
            }

            setISetting({
                ...iSetting,
                src: src || "",
                height: parseInt(height||"0" , 10),
                width: parseInt(width || "0", 10),
                gotDetails: true,
                widthUnit: WidthUnit,
                heightUnit: HeightUnit,
                allowtransparency: node.getAttribute("allowtransparency") ||""
            })


        }
    }

    const saveIframeSettings = () => {
        let currentNode = props.currentlyActive.current;

        let __el = getNodeData(currentNode, 0);

        let __new_attr :{
            height?:DisplayUnit,
            src:string,
            allowTransparency:string,
            width?:DisplayUnit
        }= {
            src: iSetting.src,
            allowTransparency: iSetting.allowtransparency,
        } 

        if (iSetting.heightUnit === DisplayUnit.auto)
            __new_attr = { ...__new_attr, height: iSetting.heightUnit }
        else
            __new_attr = { ...__new_attr, height: iSetting.height + iSetting.heightUnit }

        if (iSetting.widthUnit === DisplayUnit.auto)
            __new_attr = { ...__new_attr, width: iSetting.widthUnit }
        else
            __new_attr = { ...__new_attr, width: iSetting.width + iSetting.widthUnit }

        if (__el.attributes.length > 0) {
            __new_attr = { ...__el.attributes, __new_attr }
        }

        __el.attributes = __new_attr;

        setNodeData(currentNode, 0, __el);

        //close panel
        props.closePanel();
    }

    return (
        <div className='iFrameSettingPanel'>
            <div className="iFrameSettingInner">
                <div className="isetGroup">
                    <h5>Iframe link:</h5>
                    <input type={"text"} onChange={(e) => setISetting({ ...iSetting, src: e.target.value })} value={iSetting.src}></input>
                </div>
                <div className="isetGroup">
                    <h5>Transperency:</h5>
                    <select onChange={(e) => setISetting({ ...iSetting, allowtransparency: e.target.value })}>
                        <option value="true">Allow</option>
                        <option value="false">Dont Allow</option>
                    </select>
                </div>
                <div className='imageSizing'>
                    <div className='imgSizeCol imageSizeWid'>
                        <span>Width</span>
                        <div className='innerSizeCol'>
                            {
                                (iSetting.widthUnit !== DisplayUnit.auto) &&
                                <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setISetting({ ...iSetting, width: +e.target.value }) : ""} value={iSetting.width}></input>
                            }



                            <select className={(iSetting.widthUnit === DisplayUnit.auto) ? "fullSizeUnit" : ""} onChange={(e) => setISetting({ ...iSetting, widthUnit: e.target.value as unknown as DisplayUnit })}>
                                <option selected={(iSetting.widthUnit === DisplayUnit.px) ? true : false} value={DisplayUnit.px}>px</option>
                                <option selected={(iSetting.widthUnit === DisplayUnit['%']) ? true : false} value={"%"}>%</option>
                                <option selected={(iSetting.widthUnit === DisplayUnit.auto) ? true : false} value={DisplayUnit.auto}>auto</option>
                            </select>
                        </div>
                    </div>
                    <div className='imgSizeCol imageSizeWid'>
                        <span>Height</span>
                        <div className='innerSizeCol'>
                            {
                                (iSetting.heightUnit !== DisplayUnit.auto) &&
                                <input type={"number"} onChange={(e) => (+e.target.value > 10) ? setISetting({ ...iSetting, height: +e.target.value }) : ""} value={iSetting.height}></input>
                            }

                            <select className={(iSetting.heightUnit === DisplayUnit.auto) ? "fullSizeUnit" : ""} onChange={(e) => setISetting({ ...iSetting, heightUnit: e.target.value as unknown as DisplayUnit })}>
                                <option selected={(iSetting.heightUnit == DisplayUnit.px) ? true : false} value={DisplayUnit.px}>px</option>
                                <option selected={(iSetting.heightUnit == DisplayUnit['%']) ? true : false} value={"%"}>%</option>
                                <option selected={(iSetting.heightUnit == DisplayUnit.auto) ? true : false} value={DisplayUnit.auto}>auto</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='applyImageSettings'>
                    <button onClick={saveIframeSettings}>Apply</button>
                </div>
            </div>
        </div>
    )
}
