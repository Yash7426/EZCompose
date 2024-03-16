import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject } from 'react'
import { set, get } from "lodash";
import './navigation-setting.css'
import { usePageDesignContext } from '@/contexts/page-design';

interface ILinkElement {
    previmg: string;
    elid: string;
    inHTML: string;
    desc: string;
    attributes: {
        href: string;
        target: string;
        linktype:IlinkType;
    }|null;

    elementType: string;
    linktype?:IlinkType;
    classList: string;
    styles: {
        [key: string]: string;
    };
    elemType: string;
    elemEditable: boolean;
    enableDropping: boolean;
    elements: ILinkElement[]; // This property is occurring recursively
}

enum IlinkType {
    "url",
    "tel",
    "mail",


}

export default function NavigationSettings(props:Allow) {

    let pageDesignState = usePageDesignContext()

    let [linksState, setLinksState] = useState<{navEl:ILinkElement[]}>({
        navEl: []
    });

    let dragPositionRef = useRef<number>(null) as MutableRefObject<number>
    let dragPositionStart = useRef<number>(null) as MutableRefObject<number>


    useEffect(() => {


        loadLinkStructure();
    }, [])

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

    const getNodeData = (elString:string, level:number, offset:string) => {
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

    const loadLinkStructure = () => {

        let __nav = getNodeData(props.currentlyActive.current, 0, "");

        if (__nav.elemType !== "ul" && __nav.elemType !== "li" && __nav.elemType !== "a" && __nav.elemType !== "nav") {
            props.closePanel()
        }

        if (__nav.elemType === "ul") {
            __nav = getNodeData(props.currentlyActive.current, 1, "");
        }


        if (__nav.elemType === "li" || __nav.elemType === "a") {
            let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement;
            if(node){
                let curr = node.closest("nav")?.getAttribute("data-path");
                if(curr) __nav = getNodeData(curr.slice(0, -1), 0, "");

            }

        }

        if (__nav) {

            setLinksState({ ...linksState, navEl: __nav.elements[0].elements });
        }
    }


    const openUrlOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.currentTarget.closest("[data-link-idx]")?.querySelector(".linkModifyPanel")?.classList.toggle("open");
    }

    const addNewLink = () => {
        let __newLink:ILinkElement = {
            previmg: "/assets/images/elements/layouts/2col.png",
            elid: "NavLinkItem",
            inHTML: "",
            desc: "NavLinkItem",
            attributes:null,
            elementType: "NavLinkItem",
            classList: "",
            styles: { padding: "5px" },
            elemType: "li",
            elemEditable: false,
            enableDropping: false,
            elements: [
                {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "NavInerLinkItem",
                    inHTML: "Link Item " + linksState.navEl.length,
                    desc: "NavInnerLinkItem",
                    attributes: { href: "#", target: "_blank",linktype:IlinkType.mail },
                    elementType: "NavInnerLinkItem",
                    classList: "",
                    linktype: IlinkType.url,
                    styles: { color: "#000000", padding: "5px", textDecoration: "none" },
                    elemType: "a",
                    elemEditable: false,
                    enableDropping: false,
                    elements: [

                    ]
                }
            ]
        }

        setLinksState({ ...linksState, navEl: [...linksState.navEl, JSON.parse(JSON.stringify(__newLink))] })
    }

    const handleLinkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let __linkState = { ...linksState };
        let __attr=e.target.getAttribute("data-link-idx") as number|string
        if(__attr) __attr=Number(__attr)
        __linkState.navEl[+__attr].elements[0].inHTML = e.target.value;
        setLinksState(__linkState)
    }

    const handleLinkAttributeChange = (e:( React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) ) => {
        let __linkState = { ...linksState };
        let __attr=e.currentTarget.getAttribute("data-link-idx")
        let __linkProp=e.currentTarget.getAttribute("data-link-prop")
        // @ts-expect-error
        if(__attr && __linkProp) __linkState.navEl[+__attr].elements[0].attributes[+__linkProp] = e.currentTarget.value;
        setLinksState(__linkState)
    }

    const handleLinkTypeChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
        let __linkState = { ...linksState };
        let __attr=e.target.getAttribute("data-link-idx")
if(!__attr) return
        __linkState.navEl[+__attr].elements[0].linktype = e.target.value as  unknown as IlinkType;
        setLinksState(__linkState)
    }

    const getEmailDataFromLink = (uri:string|undefined):string[] => {

        if (uri?.indexOf("mailto:") !== -1) {

            let uriN = uri?.split("mailto:")[1];

            if (uriN?.indexOf("?subject=") !== -1) {
                return (uriN?.split("?subject=")) as string[];
            }

            return [uriN, ""];

        }

        return ["", ""];
    }

    const updateEmailLink = (e: React.ChangeEvent<HTMLInputElement>, type:string) => {

        //get the current link
        const __attr=e.target.getAttribute("data-link-idx")
        let _linkUri;
        if(__attr)
         _linkUri = linksState.navEl[+__attr].elements[0].attributes?.href;
        let _emailData = getEmailDataFromLink(_linkUri);
    let __linkState = { ...linksState };
        
if(_emailData){
    let _newLink;
    if (type == "email") {
        _newLink = `mailto:${e.target.value}?subject=${_emailData[1]}`
    } else {
        _newLink = `mailto:${_emailData[0]}?subject=${e.target.value}`
    }

    if(__attr){
let x=__linkState.navEl[+__attr].elements[0].attributes
        if(x) x["href"] = _newLink;
    }

}
        setLinksState(__linkState)

    }

    const moveElementUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let __linkState = { ...linksState };
        let _rm_el_pos=-1;
        const __linkAttr=e.currentTarget.getAttribute("data-link-idx")
        const __linkClosetAttr=e.currentTarget.closest("[data-link-idx]")?.getAttribute("data-link-idx")

        if (e.currentTarget.hasAttribute("data-link-idx") && __linkAttr) {
            _rm_el_pos = +__linkAttr;
        } else {
          if(__linkClosetAttr)  _rm_el_pos = +__linkClosetAttr
        }
        let _rm_el = __linkState.navEl.splice(_rm_el_pos, 1)[0];
        __linkState.navEl.splice(_rm_el_pos - 1, 0, _rm_el);
        setLinksState(__linkState);
    }

    const moveElementDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let __linkState = { ...linksState };
        let _rm_el_pos=0;
        let __attr=e.currentTarget.getAttribute("data-link-idx")
        let __closestAttr=e.currentTarget.closest("[data-link-idx]")?.getAttribute("data-link-idx")
        if (e.currentTarget.hasAttribute("data-link-idx") && __attr) {
            _rm_el_pos = +__attr;
        } else {
           if(__closestAttr) _rm_el_pos = +__closestAttr;
        }
        let _rm_el = __linkState.navEl.splice(_rm_el_pos, 1)[0];
        __linkState.navEl.splice(_rm_el_pos + 1, 0, _rm_el);
        setLinksState(__linkState);
    }

    const arrangeElemsDragged = () => {
if(!dragPositionStart.current) return
if(!dragPositionRef.current) return
        if (dragPositionStart.current > -1 && dragPositionRef.current > -1) {
            let __linkState = { ...linksState };
            /**
             * Array.prototype.swapItems = function(a, b){
                    this[a] = this.splice(b, 1, this[a])[0];
                    return this;
                }
            */

            __linkState.navEl[dragPositionStart.current] = __linkState.navEl.splice(dragPositionRef.current, 1, __linkState.navEl[dragPositionStart.current])[0]

            // let _rm_el = __linkState.navEl.splice(dragPositionStart.current, 1)[0];
            // __linkState.navEl.splice(dragPositionRef.current, 0, _rm_el);
            setLinksState(__linkState);
        }
    }

    const updateDragEnterPosition = ( e: React.DragEvent<HTMLDivElement>) => {
        const __attr=e.currentTarget.getAttribute("data-link-idx") 
        const __attrClosest=e.currentTarget.closest("[data-link-idx]")?.getAttribute("data-link-idx") 

        if (e.currentTarget.hasAttribute("data-is-dragel")) {
            if (__attr !== null) {
                dragPositionRef.current = +__attr;
            }
        } else {
         if(__attrClosest) {
            if (__attrClosest !== null) {
                dragPositionRef.current = +__attrClosest;
            }
        }
        }
    }
 
    const getPhoneFromLink = (uri:string |undefined) => {
        if (uri?.indexOf("tel:") !== -1) {
            return uri?.split("tel:")[1]
        }
        return "";
    }

    const updatePhoneLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        let _newLink = `tel:${e.target.value}`;
        let __linkState = { ...linksState };
        const __attr=e.target.getAttribute("data-link-idx")
        if(__attr){
            let x=__linkState.navEl[+__attr].elements[0].attributes
            if(x) x["href"] = _newLink;
        }
        setLinksState(__linkState)
    }

    const saveNavigationMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        let __nav = { ...getNodeData(props.currentlyActive.current, 0, "") };
        let __isParent = 0;

        if (__nav.elemType === "ul") {
            __nav = { ...getNodeData(props.currentlyActive.current, 1, "") };
            __isParent = 1;
        }

        __nav.elements[0].elements = linksState.navEl;

        setNodeData(props.currentlyActive.current, __isParent, __nav.elements, '["elements"]')
        // setLinksState({ ...linksState, navEl: __nav.elements[0].elements });
        props.closePanel()
    }

    const deleteLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        let __nodeID = null;
        if (e.currentTarget.hasAttribute("data-link-idx")) {
            __nodeID = e.currentTarget.getAttribute("data-link-idx");
        } else {
            __nodeID = e.currentTarget.closest("[data-link-idx]")?.getAttribute("data-link-idx");
        }

        let __new_links = [...linksState.navEl];
if(__nodeID)
        __new_links.splice(+__nodeID, 1);

        setLinksState({ ...linksState, navEl: __new_links });

    }

    return (
        <div className='linksManager'>
            <div className="linksManagerInner">

                <div className='LinksOptions'>

                    {
                        (linksState.navEl) &&
                        linksState.navEl.map((e, i) => {
                            return (
                                <div key={i} data-is-dragel draggable
                                    onDragStart={(e) => {
                                        let X=e.currentTarget?.getAttribute("data-link-idx")
                                         if(X) dragPositionStart.current = +X }}
                                    onDragEnter={updateDragEnterPosition}
                                    onDragEnd={arrangeElemsDragged}
                                    className='linkModify' data-link-idx={i} >
                                    <div className="linktext">
                                        <div className='flex-link-arrange' >
                                            {(i !== 0) ? <button onClick={moveElementUp} data-link-idx={i}><i className="las la-caret-up"></i></button> : <span className='filler'></span>}
                                            <button><i className="las la-bars"></i></button>
                                            {(i !== (linksState.navEl.length - 1)) ? <button onClick={moveElementDown} data-link-idx={i}><i className="las la-caret-down"></i></button> : <span className='filler'></span>}
                                        </div>
                                        <div className='flex-link-left'>
                                            <span className='linktitle'>{e.elements[0].inHTML}</span>
                                            <span className='linkURL'>{e.elements[0].attributes?.href}  {e.elements[0].attributes?.target}</span>
                                        </div>
                                        <div className='flex-link-action-right'>
                                            <button onClick={openUrlOptions}><i className="las la-chevron-circle-down"></i></button>
                                            <button className='btnDelLink' onClick={deleteLink} data-link-idx={i}><i className="las la-trash-alt"></i></button>
                                        </div>
                                    </div>
                                    <div className='linkModifyPanel'>
                                        <div className="panelmodifylinkinner">
                                            <h5>Link name</h5>
                                            <input type="text" onChange={handleLinkNameChange} data-link-idx={i} value={e.elements[0].inHTML} />

                                            <h5>What you want the link to do?</h5>
                                            <select onChange={handleLinkTypeChange} data-link-idx={i}>
                                                <option value={IlinkType.url} selected={((e.elements[0].attributes?.linktype) === IlinkType.url) ? true : false}>Go to another page</option>
                                                <option value={IlinkType.mail} selected={((e.elements[0].attributes?.linktype) === IlinkType.mail) ? true : false}>Send Email</option>
                                                <option value={IlinkType.tel} selected={((e.elements[0].attributes?.linktype) === IlinkType.tel) ? true : false}>Call a number</option>
                                            </select>
                                            {
                                                (e.elements[0].linktype === IlinkType.mail) && <>
                                                    <h5></h5>
                                                </>
                                            }

                                            {
                                                (e.elements[0].linktype === IlinkType.mail) && <>
                                                    <h5>Email to:</h5>
                                                    <input type="text" onChange={(e) => updateEmailLink(e, "email")} data-link-idx={i} value={getEmailDataFromLink(e.elements[0].attributes?.href)[0] }  />

                                                    <h5>Subject:</h5>
                                                    <input type="text" onChange={(e) => updateEmailLink(e, "subject")} data-link-idx={i} value={getEmailDataFromLink(e.elements[0].attributes?.href)[1]} />
                                                </>
                                            }

                                            {
                                                (e.elements[0].linktype === IlinkType.tel) && <>
                                                    <h5>Phone number:</h5>
                                                    <input type="text" onChange={updatePhoneLink} data-link-idx={i} value={getPhoneFromLink(e.elements[0].attributes?.href)} />

                                                </>
                                            }

                                            {(e.elements[0].linktype === IlinkType.url) && <>
                                                <h5>URL</h5>
                                                <input type="text" onChange={handleLinkAttributeChange} data-link-prop="href" data-link-idx={i} value={e.elements[0].attributes?.href} />


                                                <h5>How you want to open the link?</h5>
                                                <select onChange={(e)=>handleLinkAttributeChange} data-link-prop="target" data-link-idx={i} >
                                                    <option selected={(e.elements[0].attributes?.target === "_blank") ? true : false} value="_blank">Open in new tab</option>
                                                    <option selected={(e.elements[0].attributes?.target === "_self") ? true : false} value="_self">Open in same tab</option>
                                                </select>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='addMoreLink'>
                        <button onClick={addNewLink}>Add new link</button>
                        <button onClick={saveNavigationMenu}>Save All Links</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
