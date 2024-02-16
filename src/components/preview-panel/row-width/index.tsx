

import React, { useEffect, useState, useContext } from 'react'
import './row-width.css'
import { set, get } from "lodash";
import { useRef } from 'react';
import { usePageDesignContext } from '@/contexts/page-design';


interface RowWidthState {
    fullRow: boolean;
    marginSide: number;
    containerWidth: number;
}


export default function RowWidth(props:Allow) {


    let pageDesignState = usePageDesignContext();
    let ClassTimer = useRef<NodeJS.Timeout |undefined>(undefined);



    const [rowWidthState, setRowWidthState] = useState({
        fullRow: true,
        marginSide: 0,
        containerWidth: 1200
    })

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


    const applyRowWidth = () => {
        //get the current styles
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };


        let __maxWidth = (rowWidthState.fullRow) ? `calc(100% - ${(2 * rowWidthState.marginSide)}px)` : rowWidthState.containerWidth + "px";
        // node.style.padding = (rowWidthState.fullRow) ? node.style.paddingTop + " " + rowWidthState.marginSide + "px" : node.style.paddingTop + " " + node.style.paddingLeft;
        let __margin = (rowWidthState.fullRow) ? "0px " + rowWidthState.marginSide + "px" : "0px auto";


        __style_prop = { ...__style_prop, maxWidth: __maxWidth, margin: __margin };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem)

        //close panel
        props.closePanel();


    }

    const prevRowWidthFull = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cond:boolean) => {

        setRowWidthState({ ...rowWidthState, fullRow: cond });

        // showPrevWidth();
    }

    useEffect(() => {
        //on load set the values
        setValues();
    }, [])

    useEffect(() => {



        showPrevWidth();

        clearTimeout(ClassTimer.current);

        ClassTimer.current = setTimeout(() => {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
            if(node) node.classList.remove("rowResizeHelper")
        }, 2000)

    }, [rowWidthState.fullRow])

    const setValues = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
        let setPr:{fullRow:boolean;marginSide?:number} = { fullRow: false };

        if (node && node.style.marginLeft === "auto") {
            setPr = { ...setPr, marginSide: 0 };
        } else {
            if(node) setPr = { ...setPr, marginSide: parseFloat(node.style.marginLeft) };
        }


        if (node && (node.style.maxWidth === "100%" || node.style.maxWidth.indexOf("calc") >= 0)) {
            setPr = { ...setPr, fullRow: true }
        } else {
            setPr = { ...setPr, fullRow: false }
            //set current width based of bounding box
        }

        setRowWidthState({ ...rowWidthState, ...setPr });


    }

    const showPrevWidth = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
        if(node){
            node.classList.add("rowResizeHelper");
            node.style.maxWidth = (rowWidthState.fullRow) ? `calc(100% - ${(2 * rowWidthState.marginSide)}px)` : rowWidthState.containerWidth + "px";
            // node.style.padding = (rowWidthState.fullRow) ? node.style.paddingTop + " " + rowWidthState.marginSide + "px" : node.style.paddingTop + " " + node.style.paddingLeft;
            node.style.margin = (rowWidthState.fullRow) ? "0px " + rowWidthState.marginSide + "px" : "0px auto";
        }
    }

    return (
        <div className='rowWidth'>
            <div className='rowWidth_Outer'>


                <div className='rowWidth_inner'>
                    <div className='rowWidth_option'>
                        <h5>Select row width:</h5>
                        <div onClick={(e) => prevRowWidthFull(e, true)} className={(rowWidthState.fullRow) ? "scrollOptionLink active" : "scrollOptionLink"}>
                            <div className='scroll_option'>
                                <img src='/assets/images/layoutRow/fullRow.png' />
                            </div>
                            <div className='scroll_name'>
                                Full
                            </div>
                        </div>
                        <div onClick={(e) => prevRowWidthFull(e, false)} className={(!rowWidthState.fullRow) ? "scrollOptionLink active" : "scrollOptionLink"}>
                            <div className='scroll_option'>
                                <img src='/assets/images/layoutRow/containerRow.png' />
                            </div>
                            <div className='scroll_name'>
                                Container
                            </div>
                        </div>
                    </div>
                    {(rowWidthState.fullRow) && <div className='rowWidth_option'>
                        <h5>Side margins:</h5>
                        <div className='anim_slider_input' data-parentslide>
                            <input onChange={(e) => {
                                setRowWidthState({ ...rowWidthState, marginSide: +e.target.value })
                                showPrevWidth();
                            }} type="range" min="0" max="200" step="1" value={rowWidthState.marginSide} className="slider" />
                            <span >{(rowWidthState.marginSide)} px</span>
                        </div>
                    </div>}

                    {(!rowWidthState.fullRow) && <div className='rowWidth_option'>
                        <h5>Container Max Width:</h5>
                        <div className='anim_slider_input' data-parentslide>
                            <input onChange={(e) => {
                                setRowWidthState({ ...rowWidthState, containerWidth: +e.target.value })
                                showPrevWidth();
                            }} type="range" min="760" max="1400" step="10" value={rowWidthState.containerWidth} className="slider" />
                            <span >{(rowWidthState.containerWidth)} px</span>
                        </div>
                    </div>}
                </div>
            </div>
            <div className='rowWidth_actions'>
                <button onClick={applyRowWidth}>Apply Style</button>
            </div>
        </div>
    )
}
