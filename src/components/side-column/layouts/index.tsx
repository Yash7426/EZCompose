import { useState, useContext } from 'react'
import '../elemental-styles.css';
// import DirtyData from './dirtyData';
// import { Set, Get } from "react-lodash"
// import set from "lodash.set";
import { set, get } from "lodash";

import './sideColumnLayout.css'
import { useEffect } from 'react';
import { usePageDesignContext } from '@/contexts/page-design';
import { useDragElemContext } from '@/contexts/DragElems';
import { useModalContext } from '@/contexts/modal-context';
import CreateRowsLayout from '@/components/setting-panel/create-rows-layout';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
export default function SideColumnLayout() {

    const pageDesignState = usePageDesignContext()
    const { handleClose, setmodalData } = useModalContext()
    const [isCreateCustomLayoutOpen, setisCreateCustomLayoutOpen] = useState(false)
    const dragElOptions = useDragElemContext()
    //  const {__dragElems,__setDragElems}=dragElOptions

    let layout = [
        {
            previmg: "/assets/images/elements/layouts/header.jpg",
            elid: "layout_12_col_header",
            desc: "Header Layout",
            classList: "wd-row",
            elementType: "Header Layout",
            attributes: {},
            elemType: "header",
            styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px", position: "static" },
            enableDropping: false,
            elemEditable: false,
            elements: [
                {
                    classList: ["wd wd-12"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemType: "div", elemEditable: false, styles: { color: "#dddddd", padding: "30px 0px" }, enableDropping: true, inHTML: "Column 1", elementType: "tempElem", elements: [] }]
                },
            ]
        },
        {
            previmg: "/assets/images/elements/layouts/1col.jpg",
            elid: "layout_12_col",
            desc: "1 Column Layout [12]",
            classList: "wd-row",
            elementType: "Row Layout",
            attributes: {},
            elemType: "div",
            styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
            enableDropping: false,
            elemEditable: false,
            elements: [
                {
                    classList: ["wd wd-12"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemType: "div", elemEditable: false, styles: { color: "#dddddd", padding: "30px 0px" }, enableDropping: true, inHTML: "Column 1", elementType: "tempElem", elements: [] }]
                },
            ]
        },
        {
            previmg: "/assets/images/elements/layouts/2col.jpg",
            elid: "layout_6_6_col",
            desc: "2 Column Layout [6,6]",
            elementType: "Row Layout",
            classList: "wd-row",
            elemType: "div",
            styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
            elemEditable: false,
            attributes: {},
            enableDropping: false,
            elements: [
                { classList: ["wd wd-6"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
                { classList: ["wd wd-6"], elemType: "div", styles: { padding: "5px" }, elemEditable: false, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
            ]
        },
        {
            previmg: "/assets/images/elements/layouts/3col.jpg",
            elid: "layout_4_4_4_col",
            desc: "3 Column Layout [4,4,4]",
            elementType: "Row Layout",
            classList: "wd-row",
            elemType: "div",
            attributes: {},
            styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
            elemEditable: false,
            enableDropping: false,
            elements: [
                { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 1", elementType: "tempElem", elements: [] }] },
                { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 2", elementType: "tempElem", elements: [] }] },
                { classList: ["wd wd-4"], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column 3", elementType: "tempElem", elements: [] }] },
            ]
        }
    ]

    if (dragElOptions.__dragElems.customLayoutOptions.length > 0) {
        layout = [...dragElOptions.__dragElems.customLayoutOptions, ...layout];
    }

    const [layoutOptions, setLayoutOptions] = useState(layout);

    const removeDuplicates = (myArr: Array<Allow>, prop: string) => {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
        })
    }

    useEffect(() => {

        let __new_options = [...layout];


        if (dragElOptions.__dragElems.customLayoutOptions.length > 0) {
            __new_options = [...dragElOptions.__dragElems.customLayoutOptions, ...__new_options]
        }

        setLayoutOptions(removeDuplicates(__new_options, "elid"));


    }, [dragElOptions]);

    const AddSubElement = (elNode: Allow, index: number) => {
        //lets deal with the sub elems!
        elNode = elNode.substr(0, [elNode.length - 1]).split(',');
        let _depth = { ...pageDesignState.design }
        let tempOpt = [...layoutOptions]

        // let _parent_el = get(_depth, 'elements[' + parentNode.join('].elements[') + '].elements')
        let _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + ']');


        if (!_earlier_options.enableDropping) {
            //remove the last elem might help

            elNode = elNode.slice(0, -1);
            if (elNode.length > 0) {
                _earlier_options = get(_depth, 'elements[' + elNode.join('].elements[') + '].elements');
                _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            } else {
                _earlier_options = get(_depth, 'elements');
                _depth = set(_depth, 'elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
            }


        } else {

            _earlier_options = _earlier_options.elements
            _depth = set(_depth, 'elements[' + elNode.join('].elements[') + '].elements', [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]);
        }

        pageDesignState.setDesign(_depth);



        /**
         *   obj 
         *   -elem
         *      -elem
         *         - elem
         *              - elem
         *                  - elem
         */

    }

    const AddDroppedElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.DragEvent<HTMLDivElement>) => {
        //lets get new context
        // let pageDesignStateNew = useContext(pageDesignContext)
        
        if (pageDesignState.design?.isDropEnabled && pageDesignState.design?.elements) {

            //reset the insert position
            const __attr = e.currentTarget.closest(".item_drag")?.getAttribute("data-elementindex")

            if (pageDesignState.nodeLevel.current === null) {

                let _elems = [];
                let tempOptions = [...layoutOptions];
                _elems = [...pageDesignState.design.elements];

                //insert at index

                //e.target.closest("").getAttribute("data-elementindex")
                // if(pageDesignState.dropPosition.current && __attr) {
                if (pageDesignState.dropPosition.current != undefined && pageDesignState.dropPosition.current != null && __attr) {

                    _elems.splice(pageDesignState.dropPosition.current, 0, JSON.parse(JSON.stringify(tempOptions[Number(__attr)])));
                }
                // if (!pageDesignState.design.elements[pageDesignState.dropPosition.current].enableDropping) {
                //     alert("Can not add sub element to this element");
                //     return;
                // }
                pageDesignState.setDesign({ ...pageDesignState.design, elements: _elems });
                pageDesignState.dropPosition.current = null;

            } else {

                if (pageDesignState.nodeLevel.current && __attr) {
                    AddSubElement(pageDesignState.nodeLevel.current, +__attr);
                    pageDesignState.nodeLevel.current = null;
                }
            }
        }
    }
    const handleCreateCustomLayout = () => {
        setmodalData(() => ({
            buttonText: "Generate Layout",
            content: (
                <>
                    <CreateRowsLayout closeWin={handleClose} />
                </>
            ),
            onClick: () => {
            },
            isOpen: true,
            onClose: () => {
                handleClose()
            },
            title: <>Create custom Layout</>,
        }))
setisCreateCustomLayoutOpen(true)

    }

    return (
        <>
          <Modal
            isOpen={isCreateCustomLayoutOpen}
            onClose={() => setisCreateCustomLayoutOpen(false)}
            className=""
          >
            <div className="bg-[#18181c] text-center text-[#bebec2] p-[15px] rounded-3xl flex flex-col gap-3">
              <div
                className="relative flex w-full bg-transparent rounded-md h-[19px]"
                onClick={() => setisCreateCustomLayoutOpen(false)}
              >
                <IoClose className="absolute right-0 cursor-pointer fill-light hover:fill-secondary flex-end"  />
                {/* <CloseIcon className="absolute right-0 cursor-pointer fill-light hover:fill-secondary flex-end" /> */}
              </div>
              <CreateRowsLayout closeWin={handleClose} />
              {/* <Filter
                key={"album"}
                inputType={"text"}
                title={"Album name"}
                placeholder={"Enter Album Name"}
                value={newAlbum.title}
                onChange={(value) =>
                  setnewAlbum((prevState) => ({ ...prevState, title: value as string }))
                }
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
              />
              <Filter
                key={"album"}
                inputType={"tags"}
                title={"Album keywords"}
                placeholder={"Enter Keywords"}
                onTagsChange={(tags) =>
                  setnewAlbum((prevState) => ({ ...prevState, AlbumKeywords: tags }))
                }
                selectOptions={initialKeywords.map((i) => ({ label: i, value: i }))}
                value={newAlbum.AlbumKeywords}
                className={"w-full bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
                initialtags={newAlbum.AlbumKeywords}
              />

              <Filter
                key={"album"}
                inputType={"file"}
                title={"Album Cover"}
                accept="image/*"
                multiple={false}
                value={newAlbum.banner as string}
                onChange={(value) =>
                  setnewAlbum((prevState) => ({ ...prevState, banner: value as File }))
                }
                className={"bg-transparent rounded-md"}
                Variant="flex flex-col items-start gap-[10px] text-[14px] "
                fullScreen={false}
              />
              <Button
                disabled={createAlbum}
                onClick={() => handlecreateAlbum()}
                className="border-secondary border-[0.1px] py-[10px] px-[20px] font-medium rounded-xl w-[40%] mx-auto mt-1"
              >
                {createAlbum ? "Uploading..." : newAlbum.isEdit ? "Edit Album" : "Create Album"}
              </Button> */}
            </div>
          </Modal>
            <div className='custom-row bg-ui1'>
                <button onClick={() => { handleCreateCustomLayout() }}>Create custom Layout</button>
            </div>
            <div className='custom-layouts'>
                {/* <h5>Frequently used,</h5> */}
                {(layoutOptions.length > 0) ?

                    layoutOptions.map((e, i) => {
                        return (<div data-elementindex={i} className="item_drag half"
                            style={{ MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none", userSelect: "none" }}

                            key={e.elid + "-" + i} onDoubleClick={AddDroppedElement} onDragEnd={AddDroppedElement}>
                            <Image className="text-center max-w-[100%]" src={e.previmg} alt='' width={400} height={400}/>
                            <p className="item_drag_desc text-slate-300">{e.desc}</p>
                        </div>)
                    })

                    : ""}
            </div>
        </>
    )
}
