import React, { useRef, useState, useContext } from 'react'
import sideStyle from './side-column.module.css'

/**
 * Sidepanel
 */
import { usePageDesignContext } from '@/contexts/page-design';
import SideColumnLayout from './layouts';
import HtmlElement from './html-elements';
import ElementLayer from './layers';


export default function SideColumn(props:Allow) {

    const markerpos = useRef<HTMLSpanElement>(null);

    let pageDesignState = usePageDesignContext();

    const [panelMode, setPanelMode] = useState<number>(0);

    const updateMarkerPos = ( e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        markerpos.current && (markerpos.current.style.scale = "1")

        markerpos.current && (markerpos.current.style.top = (e.currentTarget.getBoundingClientRect().top - 40) + "px")
    }



    return (
        <div className={sideStyle["sidebar"]}>
             <div
             className={sideStyle["sidebar_optionsbar"]}
             onMouseEnter={() => { markerpos.current!.style.display = "block" }}
             onMouseLeave={() => { markerpos.current!.style.display = "none" }}>

                <ul className={sideStyle["sidebar_optionbar_options"]}>
                    <li
                        onClick={() => { setPanelMode(0); }}
                        className={panelMode === 0 ? sideStyle["active"] : ""}
                        onMouseEnter={updateMarkerPos}>
                        <a><i className="las la-th-large text-white"></i></a>
                    </li>
                    <li
                        onClick={() => { setPanelMode(1); }}
                        className={panelMode === 1 ? sideStyle["active"] : ""}
                        onMouseEnter={updateMarkerPos}>
                        <a><i className="las la-plus-circle text-white"></i></a>
                    </li>
                    <li
                        onClick={() => { setPanelMode(2); }}
                        className={panelMode === 2 ? sideStyle["active"] : ""}
                        onMouseEnter={updateMarkerPos}>
                        <a><i className="las la-laptop-code text-white"></i></a>
                    </li>
                </ul>

                <span ref={markerpos} className={sideStyle["sidebar_option_highlighter"]}></span>
            </div>
            <div style={props.prevWid} className={sideStyle["sidebar_optionResults"]}>
                {
                    /**
                     * Layout panel
                     */
                    (panelMode === 0) && <SideColumnLayout />
                }
                {
                    /**
                     * Html Elements Panel
                     */
                    (panelMode === 1) && <HtmlElement />
                }
                {
                    /**
                     * Layers
                     */
                    (panelMode === 2) && <ElementLayer  />
                }
            </div>
        </div>
    )
}
