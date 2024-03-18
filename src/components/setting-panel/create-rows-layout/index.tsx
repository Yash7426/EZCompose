import React, { useContext, useState, useRef } from 'react'
import { useEffect } from 'react';
import * as htmlToImage from 'html-to-image';

import './create-rows-layout.css'
import { useDragElemContext } from '@/contexts/DragElems';
import { useModalContext } from '@/contexts/modal-context';



interface Column {
    width: number;
}

interface ColumnData {
    activeCol: number;
    column: Column[];
}
interface IgenRowLayoutType extends Partial<ILinkElement>{
    elements:Allow
}

export default function CreateRowsLayout(props:Allow) {

    let dragEleSt = useDragElemContext();
   


    let imageCaptureMode = useRef<HTMLDivElement>(null);

    let [columnData, setColumnData] = useState<ColumnData>({
        activeCol: 1,
        column: [{
            width: 12
        }]
    })

 

  
    const genRowLayout = (imageURI:string):IgenRowLayoutType => {
        let __col_wd = [];

        let __colStr = [];
        let __colNums = 0;
        for (let i = 0; i < columnData.column.length; i++) {
            let __new_col = { classList: ["wd wd-" + columnData.column[i].width], elemType: "div", elemEditable: false, styles: { padding: "5px" }, enableDropping: true, elementType: "Column", elements: [{ classList: ["temp_elem"], elemEditable: false, enableDropping: true, styles: { color: "#dddddd", padding: "30px 0px" }, elemType: "div", inHTML: "Column " + (i + 1), elementType: "tempElem", elements: [] }] }
            __colStr.push(columnData.column[i].width);
            __colNums++;
            __col_wd.push(__new_col);
        }


        return {
            previmg: imageURI,
            elid: "layout_" + __colStr.join("_") + "_col",
            desc: __colNums + " Column Layout [" + __colStr.join(",") + "]",
            classList: "wd-row",
            attributes:null,
            elementType: "Row Layout",
            elemType: "div",
            styles: { maxWidth: "1100px", margin: "0 auto", padding: "5px" },
            enableDropping: false,
            elemEditable: false,
            elements: __col_wd
        }

    }

    const saveNewLayout = async () => {
        imageCaptureMode.current?.classList.add("captureImg");
        const prevImg=document.getElementById('prevImg')
        setTimeout(() => {
            if(prevImg) htmlToImage.toJpeg(prevImg, { quality: 0.2, canvasWidth: 128, canvasHeight: 50, backgroundColor: '#ffffff' })
                .then(function (dataUrl) {
                    addRowLayout(dataUrl);
                    imageCaptureMode.current?.classList.remove("captureImg");
                }).catch(err => {
                    alert("something went wrong!" + err)
                    imageCaptureMode.current?.classList.remove("captureImg");
                })
        }, 100)
    }

    const addRowLayout = (imageURI:string) => {
        let __add_el = genRowLayout(imageURI);

        if (dragEleSt.__dragElems.customLayoutOptions.length > 0) {


            dragEleSt.__setDragElems({ ...dragEleSt.__dragElems, customLayoutOptions: [...dragEleSt.__dragElems.customLayoutOptions, __add_el] })
        } else {
            dragEleSt.__setDragElems({ ...dragEleSt.__dragElems, customLayoutOptions: [__add_el] })

        }

        props.closeWin();
    }

    const adjustColumnWidth = ( e: React.ChangeEvent<HTMLInputElement>) => {
        let __all_cols = columnData.column;
        const __attr=e.target.getAttribute("data-col-index")
        if(__attr) __all_cols[+__attr].width = +e.target.value;

        let sum = 0;
        for (let i of __all_cols) {
            sum += i.width;
        }

        if (sum > 12) {
            alert("All columns sum can not be more then 12");
            return;
        }


        (+e.target.value > 0) && setColumnData({ ...columnData, column: __all_cols });

    }

    const addNewColumn = () => {

        let __all_cols = columnData.column;

        let sum = 0;
        for (let iSUM of __all_cols) {
            sum += iSUM.width;
        }

        if (sum > 12) {
            alert("Max column width is 12");
            return;
        }


        if (sum === 12) {

            /**
             * Create some space
             */
            let reduceIdx = null;
            let maxSplit = 0;
            for (let i = 0; i < __all_cols.length; i++) {

                if (__all_cols[i].width > 1) {
                    if (__all_cols[i].width > maxSplit) {
                        reduceIdx = i;
                        maxSplit = __all_cols[i].width;
                    }
                }
            }

            //new widths one small and one great
            if (reduceIdx === null) {
                alert("No space to add the column");
                return;
            }



            __all_cols[reduceIdx].width = __all_cols[reduceIdx].width - Math.floor(maxSplit / 2);

            __all_cols.push({
                width: Math.floor(maxSplit / 2)
            })


        } else {
            __all_cols.push({
                width: (12 - sum)
            })
        }

        setColumnData({ ...columnData, column: __all_cols });

    }

    const updateSelectionCol = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
       const data= e.currentTarget.getAttribute("data-col-index")
        if(data) setColumnData({ ...columnData, activeCol: +data });
    }

    const removeSelectedCol = () => {

        let __all_cols = columnData.column;
        if (__all_cols.length < 2) {
            alert("There has to be at least one column");
            return;
        }
        __all_cols.splice(columnData.activeCol, 1);
        setColumnData({ ...columnData, column: __all_cols });
    }

    return (
        <div className='layoutCreator'>
            <div className='layoutCreatorHeader'>
                <div className='layoutCreatorTitle flex justify-center items-center text-slate-300 !bg-ui1'>
                    Create rows layout
                </div>
                <div className='layoutCreatorAction !bg-ui1'>
                    <button onClick={props.closeWin} className="!bg-ui1 text-white"><i className="text-white las la-times"></i></button>
                </div>
            </div>
            <div className='layoutCreatorContent'>
                <div className="layourCrInner">
                    <div className="layoutColumnAdd">
                        <button onClick={addNewColumn} className="text-white !bg-ui1"><i className="las la-plus"></i> Add Column</button>
                    </div>
                    <div className='columnPrev' id="prevImg" ref={imageCaptureMode}>
                        <div className='columnPrevInner'>
                            {
                                columnData.column.map((e, i) => {
                                    return (
                                        <div key={i} onClick={updateSelectionCol} data-col-index={i} className={(columnData.activeCol === i) ? "prev-col activeCol" : "prev-col"} style={{ width: (8.333333333333333333333 * e.width) + "%", flexGrow: 0, flexShrink: 1 }}>
                                            <span data-col-index={i}>{"Column " + (i + 1)}</span>
                                            <input max={12} min={1} onChange={adjustColumnWidth} data-col-index={i} type={"number"} value={e.width} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='columnActions'>
                        <button className='colGenLay !bg-ui1 !text-white' onClick={saveNewLayout}><i className="las la-check text-white"></i> Generate Layout</button>
                        <div className='al-lft'>
                            <button className='colDelInd !bg-ui1 text-white' onClick={() => setColumnData({ ...columnData, column: [{ width: 12 }] })}><i className="text-white las la-sync-alt"></i></button>
                            <button className='colDelInd !bg-ui1 text-white' onClick={removeSelectedCol}><i className="las text-white la-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
