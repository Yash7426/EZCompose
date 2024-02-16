import React, { useContext, useState, useEffect, useRef } from 'react'
import { set, get } from "lodash";
import EmojiPicker from 'emoji-picker-react';

import './list-setting.css'
import { usePageDesignContext } from '@/contexts/page-design';
enum ListType{
    "ul",
    "ol"
}
enum ListStyleType{
    "custom",
    "customTxt",
    "initial"
}
enum listStylePosition{
    "outside",
    "inside",
}
type ulOptions= "disc" | "circle" | "square" | "custom" | "customTxt"
type olOptions="upper-roman" | "lower-alpha" | "custom" | "customTxt"

export default function ListSettings(props:Allow) {

    let pageDesignState = usePageDesignContext();
    let [listSetting, setListSetting] = useState({
        elemType: ListType.ul,
        listStyleType: ListStyleType.initial,
        listStylePosition: listStylePosition.outside,
        preFix: "😊",
        showPicker: false,
        textPreFix: "-"
    })

    let showEmojiOptions = useRef<HTMLDivElement>(null);

    const directChangeListType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== "none") {
            let currentNode = props.currentlyActive.current;
            let __current_elem = getNodeData(currentNode, 0)
            __current_elem.elemType = e.target.value;
            setNodeData(currentNode, 0, __current_elem);
        }
    }

    useEffect(() => {
        prevListStyle();
    }, [listSetting])

    const prevListStyle = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement| null;
        if(node){

            if (listSetting.listStyleType === ListStyleType.custom) {
                node.style.listStyleType = '"' + listSetting.preFix + '"';
            } else if (listSetting.listStyleType === ListStyleType.customTxt) {
                node.style.listStyleType = '"' + listSetting.textPreFix + '"';
            }
            else {
                node.style.listStyleType = listSetting.listStyleType as unknown as string;
            }
            node.style.listStylePosition = listSetting.listStylePosition as unknown as string;
        }
    }

    const getCurrentListType = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)
        if (__current_elem) return __current_elem.elemType as ListType;
        else return null
    }

    const applyStylingAndPosition = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };
        let __apply_bg;
        if (listSetting.listStyleType === ListStyleType.custom) {
            __apply_bg = {
                listStylePosition: listSetting.listStylePosition,
                listStyleType: '"' + listSetting.preFix + '"'
            }
        } else if (listSetting.listStyleType === ListStyleType.customTxt) {
            __apply_bg = {
                listStylePosition: listSetting.listStylePosition,
                listStyleType: '"' + listSetting.textPreFix + '"'
            }
        } else {
            __apply_bg = {
                listStyleType: listSetting.listStyleType,
                listStylePosition: listSetting.listStylePosition
            }
        }

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }

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

    return (
        <div className='ListSettingsPanel'>
            <div className="ListSettingsPanelInner">
                <h5>List Type</h5>
                <select onChange={directChangeListType}>
                    <option selected={(getCurrentListType() === ListType.ul) ? true : false} value={ListType.ul}>Unordered List</option>
                    <option selected={(getCurrentListType() === ListType.ol) ? true : false} value={ListType.ol}>Ordered List 2</option>
                </select>

                <h5>List Styling</h5>
                <select onChange={(e) => setListSetting({ ...listSetting, listStyleType: e.target.value as unknown as ListStyleType})}>
                    {

                        (getCurrentListType() === ListType.ul) && <>

                            <option value={"disc"}>Disc</option>
                            <option value={"circle"}>Circle</option>
                            <option value={"square"}>Square</option>
                            <option value={"custom"}>Custom Emoji</option>
                            <option value={"customTxt"}>Custom Text</option>
                        </>
                    }

                    {
                        (getCurrentListType() === ListType.ol) && <>
                            <option value={"upper-roman"}>Roman</option>
                            <option value={"lower-alpha"}>Alphabet</option>
                            <option value={"custom"}>Custom Emoji</option>
                            <option value={"customTxt"}>Custom Text</option>
                        </>
                    }
                </select>

                {
                    (listSetting.listStyleType === ListStyleType.custom) && <>
                        <div className="emojiPickerOuter">
                            <h5>Select custom prefix</h5>
                            <button onClick={() => { showEmojiOptions.current?.classList.toggle("show") }}>{listSetting.preFix}</button>
                            <div className='emojiPicker' ref={showEmojiOptions}>
                            {/* size="12" */}
                                <EmojiPicker height="200px" width="100%"  onEmojiClick={(e) => { setListSetting({ ...listSetting, preFix: e.emoji }) }} />
                            </div>
                        </div>
                    </>
                }

                {
                    (listSetting.listStyleType === ListStyleType.customTxt) && <>
                        <div className="textPreFix">
                            <h5>Custom text prefix</h5>
                            <input value={listSetting.textPreFix} onChange={(e) => setListSetting({ ...listSetting, textPreFix: e.target.value })}></input>
                        </div>
                    </>
                }

                <h5>List Bullet Position</h5>
                <select onChange={(e) => setListSetting({ ...listSetting, listStylePosition: e.target.value as unknown as listStylePosition})}>
                    <option value={listStylePosition.outside}>Outside</option>
                    <option value={listStylePosition.inside}>Inside</option>
                </select>


                <div className='applyStyle'>
                    <button onClick={applyStylingAndPosition}>Save Styling and Position</button>
                </div>
            </div>
        </div>
    )
}
