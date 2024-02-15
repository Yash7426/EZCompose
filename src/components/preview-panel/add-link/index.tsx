import React from 'react'
import { useState, useContext } from 'react';
import './addLink.css';
import { set, get } from "lodash";
import { usePageDesignContext } from '@/contexts/page-design';
import { createEmailHTML, createLinkHTML, createPhoneHTML, createScrollHTML } from './link-utils';

enum IcurrentMode {
    none = "none",
    url = "url",
    email = "email",
    phone = "phone",
    scroll = "scroll"
}
enum TargetType{
    "_self",
    "blank"
}
enum TargetSroll{
    "top",
    "bottom"
}
type Link="nofollow"|"noopener"|"noreferrer"|"sponsored"

type IUrlLink={
    targetURL: string;
    targetType: TargetType;
    rel: {
        opner: boolean;
        refer: boolean;
        follow: boolean;
        sponsored: boolean;
    };
}

type ILinkState={
    currentMode: IcurrentMode;
    urlLink:IUrlLink
    emailLink: {
        targetEmail: string;
        targetSubject: string;
    };
    phoneLink: {
        targetPhone: string
    };
    scrollLink: {
        targetScroll: TargetSroll
    };
}
export default function AddLink(props:any) {
    const pageDesignState = usePageDesignContext()
    const [addLinkState, setAddLinkState] = useState<ILinkState>({
        currentMode: IcurrentMode.url,
        urlLink: {
            targetURL: "",
            targetType: TargetType.blank,
            rel: {
                opner: true,
                refer: true,
                follow: false,
                sponsored: false
            }
        },
        emailLink: {
            targetEmail: "",
            targetSubject: ""
        },
        phoneLink: {
            targetPhone: ""
        },
        scrollLink: {
            targetScroll: TargetSroll.top
        }
    })
    // e.preventDefault();
    // let ws = window.getSelection();
    // if (ws.anchorNode === ws.focusNode && ws.type === "Range") {
    //     if (ws.toString()) {
    //         let a = document.createElement('a');
    //         a.href = 'http://www.google.com';
    //         a.title = 'GOOGLE';
    //         ws.getRangeAt(0).surroundContents(a);
    //     }
    // } else {
    //     /**
    //      * I really hate to use this here, but have no other option after spending a day against it.
    //      * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    //      */
    //     document.execCommand('createLink', false, prompt('URL', ''));
    // }

type IrelstrArray=Array<Allow>
type LinkHTMLType= [__url:string,__type:TargetType,__relStr:IrelstrArray]

    const createLinkHTMLFromURI = ([__url, __type, _relStr]:LinkHTMLType):HTMLAnchorElement => {
        let a = document.createElement('a');
        a.href = __url;
        a.target = __type as unknown as string;
        a.rel = _relStr.join(" ");
        return a;
    }

    

    const applyLinkToSelection = () => {
        let currentNode = props.currentlyActive.current;
        let __currentEl = getNodeData(currentNode, 0);
        let __parentEl = getNodeData(currentNode, -1);


        if (__currentEl.elemEditable) {
            let ws = window.getSelection();
            if (ws && ws.toString().length < 1) {
                alert("Unable to add hyperlink: Empty selection");
                return;
            }
            if (ws && ws.anchorNode === ws.focusNode && ws.type === "Range") {

                if (ws.toString()) {
                    let ws = window.getSelection();
                    let __a;
                    switch (addLinkState.currentMode) {
                        case "none":
                            //remove the link if exist

                            /**
                             * some function to remove the link
                             */
                            return;
                            break;
                        case "url":
                            __a = createLinkHTML(addLinkState);
                            break;
                        case "email":
                            __a = createEmailHTML(addLinkState);
                            break;
                        case "phone":
                            __a = createPhoneHTML(addLinkState);
                            break;
                        case "scroll":
                            __a = createScrollHTML(addLinkState);
                            break;
                  }
             if(__a){
            ws?.getRangeAt(0).surroundContents(createLinkHTMLFromURI(__a));
            }


                    //Todo [done]: also will need to update in the object

                    //set the current elem 
                    let __before_node = getNodeData(props.currentlyActive.current, 0);
                    let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                    if(node) setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })

                    props.closePanel();
                    return;
                } else {
                    alert("Unable to create hyperlink: selection is empty string")
                    return;
                }



            } else {

                let __a;
                switch (addLinkState.currentMode) {
                    case "none":
                        //remove the link if exist

                        /**
                         * some function to remove the link
                         */
                        return;
                        break;
                    case "url":
                        __a = createLinkHTML(addLinkState);
                        break;
                    case "email":
                        __a = createEmailHTML(addLinkState);
                        break;
                    case "phone":
                        __a = createPhoneHTML(addLinkState);
                        break;
                    case "scroll":
                        __a = createScrollHTML(addLinkState);
                        break;
                }

                /**
                 * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
                 */
if(__a){

    document.execCommand('createLink', false, __a[0]);
}

                /* update the datain object */
                //set the current elem 
                let __before_node = getNodeData(props.currentlyActive.current, 0);
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                if(node) setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })

                props.closePanel();
                return;
            }
        } else {
            // let currentNode = props.currentlyActive.current;
            // let __currentEl = getNodeData(currentNode, 0);
            // let __parentEl = getNodeData(currentNode, -1);

            let __a;
            switch (addLinkState.currentMode) {
                case "none":
                    //remove the link if exist

                    /**
                     * some function to remove the link
                     */
                    return;
                    break;
                case "url":
                    __a = createLinkHTML(addLinkState);
                    break;
                case "email":
                    __a = createEmailHTML(addLinkState);
                    break;
                case "phone":
                    __a = createPhoneHTML(addLinkState);
                    break;
                case "scroll":
                    __a = createScrollHTML(addLinkState);
                    break;
            }

            if(__a){


            let attribs = { href: __a[0],target:TargetType.blank,rel:"" }

            if ((__a[1])) attribs.target=__a[1];

            if (__a[2].length > 0) {
                attribs = { ...attribs, rel: __a[2].join(" ") }
            }

            if (__parentEl.elementType === "a") {
                //update the param elem only
                setNodeData(props.currentlyActive.current, -1, { ...__parentEl, attributes: attribs })


            } else {
                //insert the a node inside

                let __newLinkNode = __parentEl

                //insertIndex
                let __hrefIndex = props.currentlyActive.current.split(",");
                __hrefIndex = __hrefIndex[__hrefIndex.length - 1];
                __newLinkNode.elements[__hrefIndex] = {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "anchorLink",
                    inHTML: "",
                    desc: "AnchorLink",
                    attributes: attribs,
                    elementType: "AnchorLink",
                    classList: "",
                    styles: { color: "#000000" },
                    elemType: "a",
                    elemEditable: true,
                    enableDropping: false,
                    elements: [__parentEl.elements[__hrefIndex]]
                }

                //no need for inner html as state has to be 
                setNodeData(props.currentlyActive.current, -1, __newLinkNode)

            }
        }
            props.closePanel();
            return;
        }

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

    const selectAllText = () => {

        //node
        let currentNode = props.currentlyActive.current;
        let selectTextCls = getNodeData(currentNode, 0).elemEditable;

        if (selectTextCls) {
            requestAnimationFrame(() => {
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement | null;
                node?.focus();
                // @ts-ignore
                if (document.selection) {
                // @ts-ignore
                    const range = document.body.createTextRange();
                    range.moveToElementText(node);
                    range.select();
                } else if (window.getSelection) {
                    const range = document.createRange();
                    if(node)
                    range.selectNodeContents(node);
                    window.getSelection()?.removeAllRanges();
                    window.getSelection()?.addRange(range);
                }
            });
        } else {
            requestAnimationFrame(() => {
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement
                node.focus();
            });
        }
    }

    interface LinkType {
        mode: IcurrentMode;
        label: string;
    }
    
    interface LinkTypeListProps {
        linkTypes: LinkType[];
        currentMode: string;
        setCurrentMode: (mode: IcurrentMode) => void;
        selectAllText: () => void;
    }
    const linkTypes: LinkType[] = [
        { mode: IcurrentMode.url, label: 'Web Address' },
        { mode: IcurrentMode.email, label: 'Email' },
        { mode: IcurrentMode.phone, label: 'Phone number' },
        { mode: IcurrentMode.scroll, label: 'Top / Bottom of page' },
    ];
    
   
    const LinkTypeList: React.FC<LinkTypeListProps> = ({ linkTypes, currentMode, setCurrentMode, selectAllText }) => {
        return (
            <div className='linkBox-types'>
                <ul>
                    {linkTypes.map((linkType) => (
                        <li
                            key={linkType.mode}
                            className={currentMode === linkType.mode ? 'active':"" }
                            onClick={() => {
                                setCurrentMode(linkType.mode);
                                selectAllText();
                            }}
                        >
                            {linkType.label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    
    interface ScrollLinkPanelProps {
        targetScroll: TargetSroll;
        setTargetScroll: (scroll: TargetSroll) => void;
        applyLinkToSelection: () => void;
    }
    
    const ScrollLinkPanel: React.FC<ScrollLinkPanelProps> = ({ targetScroll, setTargetScroll, applyLinkToSelection }) => {
        return (
            <div className='hyperlink'>
                <div className='link_url_scroll'>
                    <div className='link_url_input'>
                        <h5>Link visitors to the top/bottom of the page (whichever page they're on).</h5>
                        <div
                            className={targetScroll === TargetSroll.top ? 'scrollOptionLink active' : 'scrollOptionLink'}
                            onClick={() => setTargetScroll(TargetSroll.top)}
                        >
                            <div className='scroll_option'>
                                <img src='/assets/images/link/top.png' />
                            </div>
                            <div className='scroll_name'>
                                Top
                            </div>
                        </div>
                        <div
                            className={targetScroll === TargetSroll.bottom ? 'scrollOptionLink active' : 'scrollOptionLink'}
                            onClick={() => setTargetScroll(TargetSroll.bottom)}
                        >
                            <div className='scroll_option'>
                                <img src='/assets/images/link/bottom.png' />
                            </div>
                            <div className='scroll_name'>
                                Bottom
                            </div>
                        </div>
                    </div>
                </div>
                <div className='button_footer_wrap_link'>
                    <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Scroll Link</button>
                </div>
            </div>
        );
    }
    
    interface PhoneLinkPanelProps {
        targetPhone: string;
        setTargetPhone: (phone:string ) => void;
        applyLinkToSelection: () => void;
    }

    const PhoneLinkPanel: React.FC<PhoneLinkPanelProps> = ({ targetPhone, setTargetPhone, applyLinkToSelection }) => {
        return (
            <div className='hyperlink'>
                <div className='link_url_scroll'>
                    <div className='link_url_input'>
                        <h5>Add the phone number along with country and area code</h5>
                        <input 
                            type="tel" 
                            onChange={(e) => setTargetPhone(e.target.value)} 
                            value={targetPhone} 
                            required
                        />
                        <span className='link_description'>
                            ( When people click on the link from mobile or tablet, the link will take them to dialpad with the number. )
                        </span>
                    </div>
                </div>
                <div className='button_footer_wrap_link'>
                    <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Phone Link</button>
                </div>
            </div>
        );
    }  
    interface EmailLinkPanelProps {
        targetEmail: string;
        targetSubject: string;
        setTargetEmail: (email: string) => void;
        setTargetSubject: (subject: string) => void;
        applyLinkToSelection: () => void;
    }
    const EmailLinkPanel: React.FC<EmailLinkPanelProps> = ({ targetEmail, targetSubject, setTargetEmail, setTargetSubject, applyLinkToSelection }) => {
        return (
            <div className='hyperlink'>
                <div className='link_url_scroll'>
                    <div className='link_url_input'>
                        <h5>What is the email?</h5>
                        <input 
                            type="email" 
                            onChange={(e) => setTargetEmail(e.target.value)} 
                            value={targetEmail} 
                            required
                        />
                    </div>
                    <div className='link_url_input'>
                        <h5>What is the subject for the email?</h5>
                        <input 
                            type="text" 
                            onChange={(e) => setTargetSubject(e.target.value)} 
                            value={targetSubject} 
                        />
                    </div>
                </div>
                <div className='button_footer_wrap_link'>
                    <button className='link_gen_btn' onClick={applyLinkToSelection}>Add Email Link</button>
                </div>
            </div>
        );
    }
    interface URLLinkPanelProps {
        targetURL: string;
        targetType: TargetType;
        rel: {
            opner: boolean;
            refer: boolean;
            follow: boolean;
            sponsored: boolean;
        };
        setTargetURL: (url: string) => void;
        setTargetType: (type: TargetType) => void;
        setRel: (rel: { opner: boolean; refer: boolean; follow: boolean; sponsored: boolean }) => void;
        applyLinkToSelection: () => void;
    }

const URLLinkPanel: React.FC<URLLinkPanelProps> = ({ targetURL, targetType, rel, setTargetURL, setTargetType, setRel, applyLinkToSelection }) => {
    return (
            <div className='hyperlink'>
                <div className='link_url_scroll'>
                    <div className='link_url_input'>
                        <h5>What's the web address{" (URL)"}?</h5>
                        <input 
                            type="text" 
                            onChange={(e) => setTargetURL(e.target.value)} 
                            value={targetURL} 
                            required 
                            placeholder='Paste the URL here..' 
                        />
                    </div>
                    <div className='link_url_input'>
                        <h5>How do you want to open the link?</h5>
                        <select onChange={(e)  => setTargetType(e.target.value as unknown as TargetType)} value={targetType}>
                            <option value={TargetType._self}>Open in current window</option>
                            <option value={TargetType.blank}>Open in new tab</option>
                        </select>
                    </div>
                    <div className='link_url_input'>
                        <h5>Link relations</h5>
                        <div className='link_checkbox'>
                            <input 
                                type="checkbox" 
                                id="inp_noopener" 
                                checked={rel.opner} 
                                onChange={(e) => setRel({ ...rel, opner: !rel.opner })} 
                            />
                            <label htmlFor="inp_noopener">Block access to source</label>
                        </div>
                        <div className='link_checkbox'>
                            <input 
                                type="checkbox" 
                                id="inp_noreferrer" 
                                checked={rel.refer} 
                                onChange={(e) => setRel({ ...rel, refer: !rel.refer })} 
                            />
                            <label htmlFor="inp_noreferrer">Hide information about source</label>
                        </div>
                        <div className='link_checkbox'>
                            <input 
                                type="checkbox" 
                                id="inp_nofollow" 
                                checked={rel.follow} 
                                onChange={(e) => setRel({ ...rel, follow: !rel.follow })} 
                            />
                            <label htmlFor="inp_nofollow">Skip by search engine</label>
                        </div>
                        <div className='link_checkbox'>
                            <input 
                                type="checkbox" 
                                id="inp_sponsored" 
                                checked={rel.sponsored} 
                                onChange={(e) => setRel({ ...rel, sponsored: !rel.sponsored })} 
                            />
                            <label htmlFor="inp_sponsored">Paid / Sponsor/ Affiliate link</label>
                        </div>
                    </div>
                </div>
                <div className='button_footer_wrap_link'>
                    <button className='link_gen_btn' onClick={applyLinkToSelection}>Add URL Link</button>
                </div>
            </div>
    );
}
    
const NoLinkPanel: React.FC = () => {
    return (
        <div className='no-link'>
            <p className='no-link-descriptor'>
                Choose from the left list which type of link you wish to apply.
            </p>
        </div>
    );
}

          

    return (
        <div className='LinkBoxOptions'>
            <LinkTypeList
                linkTypes={linkTypes}
                currentMode={addLinkState.currentMode}
                setCurrentMode={(mode) => setAddLinkState((prev)=>({ ...prev, currentMode: mode }))}
                selectAllText={selectAllText}
            />
         
            <div className='linkbox-settings'>
                <div className='linkbox_inner_panel'>
                   {addLinkState.currentMode === "none" && (
                    <NoLinkPanel />
                    )}
                   {addLinkState.currentMode === 'url' && (
                    <URLLinkPanel
                    targetURL={addLinkState.urlLink.targetURL}
                    targetType={addLinkState.urlLink.targetType}
                    rel={addLinkState.urlLink.rel}
                    setTargetURL={(url) => setAddLinkState((prev)=>({ ...prev, urlLink: { ...addLinkState.urlLink, targetURL: url } }))}
                    setTargetType={(type) => setAddLinkState((prev)=>({ ...prev, urlLink: { ...addLinkState.urlLink, targetType: type } }))}
                    setRel={(rel) => setAddLinkState((prev)=>({ ...prev, urlLink: { ...addLinkState.urlLink, rel: rel } }))}
                    applyLinkToSelection={applyLinkToSelection}
                   />
                   )}

                   {addLinkState.currentMode === 'email' && (
                    <EmailLinkPanel
                    targetEmail={addLinkState.emailLink.targetEmail}
                    targetSubject={addLinkState.emailLink.targetSubject}
                    setTargetEmail={(email) => setAddLinkState({ ...addLinkState, emailLink: { ...addLinkState.emailLink, targetEmail: email } })}
                    setTargetSubject={(subject) => setAddLinkState({ ...addLinkState, emailLink: { ...addLinkState.emailLink, targetSubject: subject } })}
                    applyLinkToSelection={applyLinkToSelection}
                    />
                    )}


                     {addLinkState.currentMode === 'phone' && (
                     <PhoneLinkPanel
                     targetPhone={addLinkState.phoneLink.targetPhone}
                     setTargetPhone={(phone) => setAddLinkState((prev)=>({ ...prev, phoneLink: { ...addLinkState.phoneLink, targetPhone: phone } }))}
                     applyLinkToSelection={applyLinkToSelection}
                     />
                     )}
                    
                    
                    {addLinkState.currentMode === 'scroll' && (

                   <ScrollLinkPanel
                    targetScroll={addLinkState.scrollLink.targetScroll}
                    setTargetScroll={(scroll) => setAddLinkState((prev)=>({ ...prev, scrollLink: { ...addLinkState.scrollLink, targetScroll: scroll } }))}
                    applyLinkToSelection={applyLinkToSelection}
                   />
                    )}
                     {addLinkState.currentMode === "none" && (
                   <NoLinkPanel />
                    )}

                </div>
            </div>
        </div>
    )
}
