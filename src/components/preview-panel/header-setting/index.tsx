import React, { useState, useEffect, useContext, useRef } from 'react'
import { set, get } from "lodash";
import './header-settings.css';
import { usePageDesignContext } from '@/contexts/page-design';
export default function HeaderSettings(props:Allow) {

    const pageDesignState = usePageDesignContext()
    enum IpositionDir {
    "top",
    "bottom"
    }
    enum HeaderSetting {
       "static",
       "absolute",
       "sticky",
       "fixed" 
    }
type IheaderSettingType={
    headerPosition: HeaderSetting;
    positionDir: IpositionDir;
    positions: {
        topEl: number|null;
        bottomEl: number|null;
    };
}
    let [headerSetting, setHeaderSetting] = useState<IheaderSettingType>({
        headerPosition: HeaderSetting.static,
        positionDir: IpositionDir.top,
        positions: {
            topEl: null,
            bottomEl: null
        }
    });

    useEffect(() => {
        loadInitialHeaderSettings();
    }, [])

    useEffect(() => {
        prevHeaderPosition();
    }, [headerSetting])

    useEffect(() => {
        //waits for .2s transition to finish
        setTimeout(() => {
            prevHeaderPosition();
        }, 200);
    }, [pageDesignState?.design?.pageMode])

    const setNodeData = (elString:string, level:number, data:Allow, offset:string) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString:
        string, level:number, offset:string) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, currentNode.length - level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]" + offset
        } else {
            _node_path = "elements[" + currentNodeLast + "]" + offset
        }

        return get(pageDesignState.design, _node_path);
    }

    const loadInitialHeaderSettings = () => {
        let __headerSetting = getNodeData(props.currentlyActive.current, 0, '["styles"]');
        if (__headerSetting && (__headerSetting === HeaderSetting.static || __headerSetting === HeaderSetting.sticky || __headerSetting === HeaderSetting.fixed || __headerSetting === HeaderSetting.absolute)) {

            let __temp_style_setter = { headerPosition: __headerSetting.position,positions:{} as Allow };

            if (__headerSetting !== HeaderSetting.static) {
                if (__headerSetting.hasOwnProperty(IpositionDir.top)) {
                    __temp_style_setter = { ...__temp_style_setter, positions: { topEl: __headerSetting.top } }
                } else if (__headerSetting.hasOwnProperty(IpositionDir.bottom)) {
                    __temp_style_setter = { ...__temp_style_setter, positions: { bottomEl: __headerSetting.bottom } }
                }
            }


            setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
        }
    }


    const prevHeaderPosition = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement |null|undefined;

        //will need to apply this to parent to show it to user
        
        node = (node?.closest("section"));
        if(node && node!==null){
        node.style.position = headerSetting.headerPosition as unknown as string;

        let parentWid = document.querySelector("[data-prevpanel]")?.getBoundingClientRect();
        node.style.width = (headerSetting.headerPosition === HeaderSetting.fixed) ? parentWid?.width + "px" : "100%";
        node.style.zIndex = "200";

        if (headerSetting.headerPosition !== HeaderSetting.static) {

            if (headerSetting.positions.topEl !== null) {
                node.style.bottom = "initial";
                node.style.top = (headerSetting.headerPosition === HeaderSetting.fixed) ? (headerSetting.positions.topEl + 40) + "px" : headerSetting.positions.topEl + "px";
            }
            if (headerSetting.positions.bottomEl !== null) {
                node.style.top = "initial";
                node.style.bottom = headerSetting.positions.bottomEl + "px";
            }
            if (headerSetting.positions.topEl === null && headerSetting.positions.bottomEl === null) {

                node.style.top = (headerSetting.headerPosition === HeaderSetting.fixed) ? "40px" : "0px"
            }
        }
    }
    }


    const setHeaderStyles = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let __temp_style_setter = {};
        let __el;
        if (e.currentTarget.hasAttribute("data-header-position")) {
            __el = e.currentTarget;
        } else {
            __el = e.currentTarget.closest("[data-header-position]")
        }

        if (!__el) {
            return;
        }

        __temp_style_setter = { ...__temp_style_setter, headerPosition: __el.getAttribute("data-header-value") }
        setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
    }


    const setPosValue = (e: React.ChangeEvent<HTMLInputElement>) => {


        let __temp_style_setter = { ...headerSetting };

        if (headerSetting.positionDir === IpositionDir.top) {
            __temp_style_setter.positions.topEl = +e.target.value;
            __temp_style_setter.positions.bottomEl = null;
        }
        if (headerSetting.positionDir === IpositionDir.bottom) {
            __temp_style_setter.positions.topEl = null;
            __temp_style_setter.positions.bottomEl = +e.target.value;
        }

        setHeaderSetting({ ...headerSetting, ...__temp_style_setter })
    }

    const setHeaderType = ( e: React.ChangeEvent<HTMLSelectElement>) => {
        let __temp_style_setter = {};


        if (e.target.value === "top") __temp_style_setter = { positions: { topEl: 0, bottomEl: null } }
        else __temp_style_setter = { positions: { topEl: null, bottomEl: 0 } }


        setHeaderSetting({ ...headerSetting, positionDir: e.target.value as unknown as IpositionDir, ...__temp_style_setter })
    }

    const saveHeaderSettings = () => {
        let __headerSetting = getNodeData(props.currentlyActive.current, 0, '["styles"]');
        //generate styles
        let __temp_style_setter = { ...__headerSetting, position: headerSetting.headerPosition };

        if (headerSetting.positionDir === IpositionDir.top) {
            __temp_style_setter = { ...__temp_style_setter, top: headerSetting.positions.topEl + "px" }
        }
        if (headerSetting.positionDir === IpositionDir.bottom) {
            __temp_style_setter = { ...__temp_style_setter, bottom: headerSetting.positions.bottomEl + "px" }
        }

        setNodeData(props.currentlyActive.current, 0, __temp_style_setter, '["styles"]');

        alert("Saved!");
        //close panel
        props.closePanel();
    }

    return (
        <div className='headerPositionSetting'>
            <div className="hederPositionSettingInner">
                <h5>Select Option</h5>
                <div className='headerPosOps'>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value={HeaderSetting.static} data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/static.jpg' />
                        <span>Static Position</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value={HeaderSetting.absolute} data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/absolute.jpg' />
                        <span>Over Content</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value={HeaderSetting.sticky} data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/sticky.jpg' />
                        <span>Sticky</span>
                    </div>
                    <div className='headerPositionOption' onClick={setHeaderStyles} data-header-value={HeaderSetting.fixed} data-header-position="headerPosition">
                        <img src='/assets/images/headerScroll/fixed.jpg' />
                        <span>Always Show</span>
                    </div>
                </div>
            </div>

            {(headerSetting.headerPosition !== HeaderSetting.static) && <>
                <h5>Position</h5>
                <select onChange={setHeaderType}>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </select>
                <div className='headerPositionValue'>
                    <input onChange={setPosValue} type={"range"} value={(headerSetting.positionDir === IpositionDir.top) ? (headerSetting.positions.topEl === null) ? 0 : headerSetting.positions.topEl : (headerSetting.positions.bottomEl === null) ? 0 : headerSetting.positions.bottomEl} />
                    <span>{(headerSetting.positionDir === IpositionDir.top) ? (headerSetting.positions.topEl === null) ? 0 : headerSetting.positions.topEl : (headerSetting.positions.bottomEl === null) ? 0 : headerSetting.positions.bottomEl}px</span>
                </div>
            </>}

            <div className='applyHeaderSettings'>
                <button onClick={saveHeaderSettings}>Save Header</button>
            </div>
        </div>
    )
}
