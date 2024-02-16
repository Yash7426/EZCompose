import React, { useContext } from "react";
import { usePageDesignContext } from "@/contexts/page-design";
import prvp from "./previewpanel.module.css";
import "./commonPrev.css";
import "./builderstyle.css";
import { useRef } from "react";
import { set, get } from "lodash";

/**Element utiities */

/**Element utiities */
import AnimationOptionsPanel from "@/components/preview-panel/add-animation";
import AddLink from "@/components/preview-panel/add-link";
import RowWidth from "@/components/preview-panel/row-width";
import EditSettings from "@/components/preview-panel/EditSettings";
import AlignItems from "@/components/preview-panel/align-items";
import HeadingSettings from "@/components/preview-panel/heading-setting";
import ListSettings from "@/components/preview-panel/list-settings";
import ImageSetting from "@/components/preview-panel/image-setting";
import InlineFrameSetting from "@/components/preview-panel/inline-frame-setting";
import ColumnWidthSetting from "@/components/preview-panel/column-width-setting";
import NavigationSettings from "@/components/preview-panel/navigation-settings";
import HeaderSettings from "@/components/preview-panel/header-setting";
import GetNodeData from "@/components/preview-panel/get-node-data";
import ToolTip from "@/components/preview-panel/tooltip";

/** Google font loader */
import FontLoader from "@/components/preview-panel/font-loader";

// import * as ReactDOM from 'react-dom/client';
import parse from "html-react-parser";
import { useState } from "react";
import { useEffect } from "react";
import { FontOption } from "@/interfaces/design";

export default function PreviewPanel() {
  let pageDesignState = usePageDesignContext();
  let ElementSwitcher = useRef<HTMLDivElement>(null);
  let ElementNodeSelector = useRef<Allow>(null);
  let dragEnterSelector = useRef<Allow>(null);
  let elChangeTimer = useRef<Allow>(null);
  let elementalOptions = useRef<HTMLDivElement>(null);
  let elementalOptionsSettings = useRef<HTMLDivElement>(null);
  let elementalHeightResizer = useRef<HTMLDivElement>(null);
  let showRowOption = useRef<HTMLLIElement>(null);
  let showColOption = useRef<HTMLLIElement>(null);
  let showHeaderOption = useRef<HTMLLIElement>(null);
  let showListOption = useRef<HTMLLIElement>(null);
  let showImageSetting = useRef<HTMLLIElement>(null);
  let iframeSettings = useRef<HTMLLIElement>(null);
  let columnWidthSetting = useRef<HTMLLIElement>(null);
  let naviagtionMenuSettings = useRef<HTMLLIElement>(null);
  let headerPositionSettings = useRef<HTMLLIElement>(null);
  let creatorDevMode = useRef<boolean>(true);
  let [panelSettings, setPanelSettings] = useState({
    panelTitle: "Animation",
    panelMode: "animation",
    rowMode: "",
  });

  let [rCount, setRCount] = useState({ refreshCount: 0 });

  useEffect(() => {
    //refresh helper
  }, [rCount]);

  useEffect(() => {
    updateSelectNodeFromLayers();
  }, [pageDesignState.actElLayer]);

  let colorsRange = ["#bbbbbb"];
  let colorPallets = [
    "#072ac8",
    "#1e96fc",
    "#f95738",
    "#2ec4b6",
    "#80ed99",
    "#36ca00",
    "#b744b8",
  ];

  let prevW = { width: "500px", minWidth: "800px" };
  if (pageDesignState.design?.pageMode) {
    prevW = {
      minWidth: "1200px",
      width: "100%",
    };
  }

  const enableNewAdding = (e: React.MouseEvent) => {
    // if (e.target.classList.value.indexOf("temp_elem") > -1 && e.target.classList.value.indexOf("temp_infocus") < 0) {

    pageDesignState.nodeLevel.current =
      e.currentTarget.getAttribute("data-path");
    const targetPath = e.currentTarget.getAttribute("data-path");
    if (targetPath) dragEnterSelector.current = targetPath;
    // e.target.classList.add("temp_infocus");
    // }
  };

  const updateInsertPosition = (e: React.DragEvent<HTMLElement>) => {
    let _msg = document.createElement("div");

    if (_msg) {
      _msg.classList.add("temp_add_here"); // Use add() method to add classes
      _msg.innerHTML = '<i class="las la-plus-circle"></i>';
      // _msg.onmouseenter = enableNewAdding; // Use onmouseenter instead of onMouseEnter
      _msg.addEventListener("mouseenter", (e)=>enableNewAdding(e as unknown as React.MouseEvent)); // Use onmouseenter instead of onMouseEnter

    }

    removeGuides();

    let _sizes = e.currentTarget.closest("section")?.getBoundingClientRect();

    if (_sizes && e.clientY <= _sizes.y + 15) {
      // TODO : Element Adding helper
      // e.target.closest("div[data-prevpanel]").insertBefore(_msg, e.target.closest("section"));

      let y = e.currentTarget
        ?.closest("section")
        ?.getAttribute("data-elposition");
      let dropIndex: number;
      if (y) {
        dropIndex = +y;

        pageDesignState.dropPosition.current = dropIndex;
      }
      pageDesignState.nodeLevel.current = null;
    } else if (_sizes && e.clientY >= _sizes.y + (_sizes.height - 15)) {
      // TODO : Element Adding helper
      // e.target.closest("section").insertAdjacentElement("afterend", _msg);

      let y = e.currentTarget
        .closest("section")
        ?.getAttribute("data-elposition");
      let dropIndex;
      if (y) {
        dropIndex = +y;
        pageDesignState.dropPosition.current = dropIndex + 1;
      }
      pageDesignState.nodeLevel.current = null;
    } else {
      //insert it inside the element
      let dpa;

      const isdataPath = e.currentTarget.hasAttribute("data-path");
      const dataPath = e.currentTarget.getAttribute("data-path");
      if (isdataPath) {
        dpa = dataPath;
      } else {
        if (isdataPath) dpa = dataPath;
        else
          dpa = e.currentTarget
            .querySelector("[data-path]")
            ?.getAttribute("data-path");
      }
      pageDesignState.nodeLevel.current = dpa;
      pageDesignState.dropPosition.current = null;
    }
  };

  const removeGuides = () => {
    let _rem_elems = document.querySelectorAll(".temp_add_here");
    for (let j = 0; j < _rem_elems.length; j++) {
      _rem_elems[j].remove();
    }
  };

  /**
   * we need to use React.createElement instead
   * So, this was a good waste of time :|
   */
  // const generateHTMLComp = (e, p) => {

  //     let _el = document.createElement(e.elemType);
  //     _el.className = e.classList;
  //     _el.onMouseEnter = enableNewAdding;
  //     _el.setAttribute("data-node", p);
  //     if (e.hasOwnProperty("inHTML")) _el.append(e.inHTML);

  //     // //check if has subelement
  //     if (e.elements.length > 0) {
  //         //has sub elem
  //         for (let i = 0; i < e.elements.length; i++) {
  //             _el.append(generateHTMLComp(e.elements[i], p + `${i},`));
  //         }
  //     }
  //     return _el;
  // }

  interface MultiHTMLCompProps {
    e: Array<{ inHTML?: string }>;
    datapath: string;
  }

  const MultiHTMLComp = (props: MultiHTMLCompProps) => {
    return (
      <>
        {props.e.map((el, i) => {
          let htmlCon = "";
          if (el.hasOwnProperty("inHTML")) htmlCon = el.inHTML as string;
          return (
            <GenerateHTMLComp
              element={el}
              datapath={props.datapath + i + ","}
              key={props.datapath + i + ","}
            >
              {htmlCon}
            </GenerateHTMLComp>
          );
        })}
      </>
    );
  };
  const GenerateHTMLComp = (props: Allow) => {
    let e = props.element;
    let formatStyle = { ...e.styles };
    if (formatStyle.hasOwnProperty("animationIterationCount"))
      formatStyle.animationIterationCount = 0;

    if (formatStyle.hasOwnProperty("position"))
      formatStyle.position = "relative";

    let elProp = {
      ...e.attributes,
      className: e.classList,
      "data-path": props.datapath,
      onClick: (e: React.MouseEvent<HTMLElement>) =>
        selectElementActive(e),
      onDragEnter: (e: React.MouseEvent<HTMLDivElement>) => enableNewAdding(e),
      onKeyUp: (e: React.KeyboardEventHandler<HTMLDivElement>) =>
        handleContentEdit(e),
      contentEditable: e.elemEditable,
      "data-optionstype": e.elementType,
      suppressContentEditableWarning: e.elemEditable,
      style: formatStyle,
    };
    // let elProp = { className: e.classList, "data-path": props.datapath };
    if (e.elements.length > 0) {
      //has sub elem

      if (e.elements.length < 2) {
        //single element
        let htmlCon = "";
        if (e.hasOwnProperty("inHTML")) htmlCon = e.inHTML;

        return React.createElement(
          e.elemType,
          elProp,
          <GenerateHTMLComp
            datapath={props.datapath + "0,"}
            element={e.elements[0]}
          >
            {htmlCon}
          </GenerateHTMLComp>
        );
      } else {
        //more then one element
        let allElems = [];
        return React.createElement(
          e.elemType,
          elProp,
          <MultiHTMLComp datapath={props.datapath} e={e.elements} />
        );
      }
    } else {
      let htmlCon = "";
      if (e.hasOwnProperty("inHTML")) htmlCon = decodeURIComponent(e.inHTML);

      if (e.elemType === "img") {
        return React.createElement(e.elemType, elProp);
      }
      return React.createElement(e.elemType, elProp, [parse(htmlCon)]);
    }
  };
  const commonSelectionnProcedure = (_elm: HTMLElement) => {
    let elms = document.querySelectorAll(".temp_infocus");

    if (elms.length) {
      for (let i = 0; i < elms.length; i++) {
        elms[i].classList.remove("temp_infocus");
      }
    }
    if (showRowOption.current) {
      if (_elm.classList.contains("wd-row")) {
        showRowOption.current.style.display = "block";
      } else {
        showRowOption.current.style.display = "none";
      }
    }

    if (showColOption.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Column"
      ) {
        showColOption.current.style.display = "block";
      } else {
        showColOption.current.style.display = "none";
      }
    }

    if (showHeaderOption.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Headings"
      ) {
        showHeaderOption.current.style.display = "block";
      } else {
        showHeaderOption.current.style.display = "none";
      }
    }

    if (showListOption.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "List"
      ) {
        showListOption.current.style.display = "block";
      } else {
        showListOption.current.style.display = "none";
      }
    }

    if (showImageSetting.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Image"
      ) {
        showImageSetting.current.style.display = "block";
      } else {
        showImageSetting.current.style.display = "none";
      }
    }

    if (iframeSettings.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Iframe"
      ) {
        iframeSettings.current.style.display = "block";
      } else {
        iframeSettings.current.style.display = "none";
      }
    }

    if (columnWidthSetting.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Column"
      ) {
        columnWidthSetting.current.style.display = "block";
      } else {
        columnWidthSetting.current.style.display = "none";
      }
    }
    if (naviagtionMenuSettings.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "navListedItem"
      ) {
        naviagtionMenuSettings.current.style.display = "block";
      } else {
        naviagtionMenuSettings.current.style.display = "none";
      }
    }

    if (headerPositionSettings.current) {
      if (
        _elm.hasAttribute("data-optionstype") &&
        _elm.getAttribute("data-optionstype") === "Header Layout"
      ) {
        headerPositionSettings.current.style.display = "block";
      } else {
        headerPositionSettings.current.style.display = "none";
      }
    }

    let elmsEd = document.querySelectorAll(".editable_infocus");
    if (elmsEd.length) {
      for (let i = 0; i < elmsEd.length; i++) {
        const el = elmsEd[i];

        if (el instanceof HTMLElement) {
          el.style.outline = "none";
          el.classList.remove("editable_infocus");
        }
      }
    }

    //closes settings panel only when clicked on different element
    let _dpcompare;
    if (_elm.hasAttribute("data-path")) {
      _dpcompare = _elm.getAttribute("data-path");
    } else {
      _dpcompare = _elm.closest("[data-path]")?.getAttribute("data-path");
    }
    if (_dpcompare !== ElementNodeSelector.current + ",") {
      /**
       *
       *  JUST A TRYING to fix the column width option error!
       *
       */
      if (elementalOptionsSettings.current) {
        if (
          _elm.getAttribute("contenteditable") === "false" &&
          elementalOptionsSettings.current.style.display === "block"
        ) {
          setPanelSettings({
            ...panelSettings,
            panelTitle: "",
            panelMode: "none",
          });
        }
        elementalOptionsSettings.current.style.display = "none";
      }
    }

    if (
      (_elm.getAttribute("contenteditable") === "true" &&
        _elm.hasAttribute("data-path")) ||
      (_elm.closest("[data-path]")?.getAttribute("contenteditable") ===
        "true" &&
        !_elm.hasAttribute("data-path"))
    ) {
      if (_elm.hasAttribute("data-path")) {
        _elm.classList.add("editable_infocus");
        //lets make consistancy for the color
        let _dp = _elm.getAttribute("data-path");

        if (_dp) {
          _dp = _dp.substring(0, _dp.length - 1);
          let _dp1 = _dp.split(",");
          let _dp2 = _dp1.reduce((a, b) => (a += b));
          let _dp3 = +_dp2 % colorPallets.length;
          // _elm.style.outline = "2px solid " + colorPallets[Math.floor(Math.random() * colorPallets.length)]
          _elm.style.outline = "2px solid " + colorPallets[_dp3];
        }
      } else {
        _elm.closest("[data-path]")?.classList.add("editable_infocus");
        //lets make consistancy for the color
        let _dp = _elm.closest("[data-path]")?.getAttribute("data-path");

        if (_dp) {
          _dp = _dp.substring(0, _dp.length - 1);
          let _dp2 = _dp.split(",");
          let _dp3 = _dp2.reduce((a, b) => (a += b));
          let _dp4 = +_dp3 % colorPallets.length;
          // _elm.style.outline = "2px solid " + colorPallets[Math.floor(Math.random() * colorPallets.length)]
          (_elm.closest("[data-path]") as HTMLElement).style.outline =
            "2px solid " + colorPallets[_dp4];
        }
      }
    }
    if (_elm.getAttribute("contenteditable") === "false") {
      _elm.classList.add("temp_infocus");
    }
    if (ElementSwitcher.current)
      ElementSwitcher.current.style.display = "block";
    let a111 = document.querySelector("[data-panelmain]");
    let parentPosition;
    if (a111) {
      parentPosition = a111.getBoundingClientRect();
    }
    //scroll top fix
    let scrlTop = (document.querySelector("[data-panelmain]") as HTMLElement)
      .scrollTop;
    //fixed when you click on sub element it is still going to be a top level position
    let boxPosition = _elm.hasAttribute("data-path")
      ? _elm.getBoundingClientRect()
      : (_elm.closest("[data-path]") as HTMLElement).getBoundingClientRect();
    let posLeft = boxPosition.x - parentPosition!.x - 30;
    let posBottom = boxPosition.y - parentPosition!.y;

    let PosX =
      posLeft + parentPosition!.left < parentPosition!.left
        ? posLeft + 30
        : posLeft;

    if (ElementSwitcher.current) {
      ElementSwitcher.current.style.left = PosX + "px";

      // ElementSwitcher.current.style.left = (boxPosition.x > parentPosition.x) ? PosX + "px" : (PosX) + "px";
      ElementSwitcher.current.style.top = scrlTop + posBottom + "px";
    }

    //;

    /**
     *
     * This shows respective options for the element!
     */
    //make the optios visible on elemental click
    if (elementalOptions.current)
      elementalOptions.current.style.display = "block";
    //now get element width
    let optionsPanelWidth = elementalOptions.current?.getBoundingClientRect();
    if (optionsPanelWidth) {
      let optionLeft =
        optionsPanelWidth.right > window.innerWidth
          ? window.innerWidth - +optionsPanelWidth + "px"
          : posLeft + 40;
      if (elementalOptions.current && parentPosition) {
        elementalOptions.current.style.left =
          scrlTop + posBottom - optionsPanelWidth.height < parentPosition.top
            ? +optionLeft + 40 + "px"
            : optionLeft + "px";
        elementalOptions.current.style.top =
          scrlTop + posBottom - optionsPanelWidth.height < parentPosition.top
            ? scrlTop + posBottom + boxPosition.height + "px"
            : scrlTop + posBottom - optionsPanelWidth.height + "px";
      }
    }
    if (elementalHeightResizer.current) {
      elementalHeightResizer.current.style.display = "inline-block";
      if (optionsPanelWidth)
        elementalHeightResizer.current.style.left =
          optionsPanelWidth.right > window.innerWidth
            ? window.innerWidth - +optionsPanelWidth + "px"
            : posLeft + 40 + "px";
      elementalHeightResizer.current.style.top =
        scrlTop + posBottom + boxPosition.height - 10 + "px";
    }

    let nodeP;
    if (_elm.hasAttribute("[data-path]")) {
      nodeP = _elm.getAttribute("data-path");
    } else {
      nodeP = _elm.closest("[data-path]")?.getAttribute("data-path");
    }

    //181

    ElementNodeSelector.current = nodeP?.substring(0, nodeP.length - 1);
    if(nodeP){
      pageDesignState.activeElemLayer.current = nodeP.substring(
        0,
        nodeP.length - 1
        );
        pageDesignState.setELLayer(nodeP.substring(0, nodeP.length - 1));
    } 
    // /layout_panel_options
  };

  const updateSelectNodeFromLayers = () => {
    let _elm = document.querySelector(
      '[data-path="' + pageDesignState.actElLayer + ',"]'
    ) as HTMLDivElement;

    if (!_elm) return;

    commonSelectionnProcedure(_elm);
  };

  const selectElementActive = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    commonSelectionnProcedure(e.currentTarget);
  };

  const moveElUp = () => {
    //moves element one step up
    let _elNode = ElementNodeSelector.current;
    _elNode = _elNode.split(",");
    let _elNodeLast = _elNode[_elNode.length - 1];
    if (_elNodeLast < 1) {
      alert("Cant move up, as It is already a first element of the section");
      return;
    }

    _elNode = _elNode.slice(0, -1);
    let _depth = { ...pageDesignState.design };

    if (_elNode.length > 0) {
      //get parent node
      let _parent_node = get(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements"
      );

      //switch the elements
      // from=> _elNodeLast
      let from = _elNodeLast;
      // to => _elNodeLast - 1
      let to = _elNodeLast - 1;

      const _el = _parent_node.splice(from, 1)[0];
      _parent_node.splice(to, 0, _el);

      //remove last element
      // _parent_node.splice(_elNodeLast, 1);

      //remove the node
      set(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements",
        _parent_node
      );

      pageDesignState.setDesign(_depth);
    } else {
      let _parent_node = get(_depth, "elements");

      if (_parent_node) {
        //from
        let from = ElementNodeSelector.current;
        let to = ElementNodeSelector.current - 1;

        const _el = _parent_node.splice(from, 1)[0];
        _parent_node.splice(to, 0, _el);

        //directly set to empty element
        set(_depth, "elements", _parent_node);
      }
      pageDesignState.setDesign(_depth);
    }
    //update position for the elemenNode
    if (_elNode.length > 0) {
      ElementNodeSelector.current =
        _elNode.join(",") + "," + (_elNodeLast - 1) + "";
      pageDesignState.activeElemLayer.current =
        _elNode.join(",") + "," + (_elNodeLast - 1) + "";
      pageDesignState.setELLayer(
        _elNode.join(",") + "," + (_elNodeLast - 1) + ""
      );
    } else {
      ElementNodeSelector.current = _elNodeLast - 1 + "";
      pageDesignState.activeElemLayer.current = _elNodeLast - 1 + "";
      pageDesignState.setELLayer(_elNodeLast - 1 + "");
    }

    //select the element again after render
    let selectorStr = `[data-path="${ElementNodeSelector.current}`;
    if (selectorStr.charAt(selectorStr.length - 1) !== ",") {
      selectorStr += ',"]';
    } else {
      selectorStr += '"]';
    }

    document.querySelector(selectorStr)?.classList.add("temp_infocus");

    let scrlTop = document.querySelector("[data-panelmain]")?.scrollTop;

    //update the position of the selector
    let parentPosition = (
      document.querySelector("div[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();
    let boxPosition = (
      document.querySelector(selectorStr) as HTMLElement
    ).getBoundingClientRect();

    if (ElementSwitcher.current) {
      ElementSwitcher.current.style.left =
        boxPosition.x - parentPosition.x - 26 + "px";
      ElementSwitcher.current.style.top =
        "" + (scrlTop ?? 0) + (boxPosition.y - parentPosition.y) + "px";
    }

    if (elementalOptions.current) {
      elementalOptions.current.style.display = "none";
    }
    if (elementalOptionsSettings.current) {
      elementalOptionsSettings.current.style.display = "none";
    }
  };

  const moveElDown = () => {
    //moves element one step up
    let _elNode = ElementNodeSelector.current;
    _elNode = _elNode.split(",");
    let _elNodeLast = _elNode[_elNode.length - 1];
    _elNode = _elNode.slice(0, -1);
    let _depth = { ...pageDesignState.design };

    if (_elNode.length > 0) {
      //get parent node
      let _parent_node = get(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements"
      );

      if (_elNodeLast > _parent_node.length - 2) {
        alert(
          "Can push below the element, it is the bottommost element in the div"
        );
        return;
      }
      //switch the elements
      // from=> _elNodeLast
      let from = _elNodeLast;
      // to => _elNodeLast + 1
      let to = _elNodeLast + 1;

      const _el = _parent_node.splice(from, 1)[0];
      _parent_node.splice(to, 0, _el);

      //remove last element
      // _parent_node.splice(_elNodeLast, 1);

      //remove the node
      set(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements",
        _parent_node
      );

      pageDesignState.setDesign(_depth);
    } else {
      let _parent_node = get(_depth, "elements");

      if (_parent_node) {
        //from
        let from = ElementNodeSelector.current;
        let to = +ElementNodeSelector.current + 1;

        if (to > _parent_node.length - 1) {
          alert(
            "Can push below the element, it is the bottommost element in the div"
          );
          return;
        }

        const _el = _parent_node?.splice(from, 1)[0];
        _parent_node?.splice(to, 0, _el);

        //directly set to empty element
        set(_depth, "elements", _parent_node);
      }
      pageDesignState.setDesign(_depth);
    }

    //update position for the elemenNode
    if (_elNode.length > 0) {
      ElementNodeSelector.current =
        _elNode.join(",") + "," + (+_elNodeLast + 1) + "";
      pageDesignState.activeElemLayer.current =
        _elNode.join(",") + "," + (+_elNodeLast + 1) + "";
      pageDesignState.setELLayer(
        _elNode.join(",") + "," + (+_elNodeLast + 1) + ""
      );
    } else {
      ElementNodeSelector.current = +_elNodeLast + 1 + "";
      pageDesignState.activeElemLayer.current = +_elNodeLast + 1 + "";
      pageDesignState.setELLayer(+_elNodeLast + 1 + "");
    }

    let selectorStr = `[data-path="${ElementNodeSelector.current}`;
    if (selectorStr.charAt(selectorStr.length - 1) !== ",") {
      selectorStr += ',"]';
    } else {
      selectorStr += '"]';
    }

    //select the element again after render
    document.querySelector(selectorStr)?.classList.add("temp_infocus");

    let scrlTop = document.querySelector("[data-panelmain]")?.scrollTop;
    //update the position of the selector
    let parentPosition = (
      document.querySelector("div[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();
    let boxPosition = (
      document.querySelector(selectorStr) as HTMLElement
    ).getBoundingClientRect();

    if (ElementSwitcher.current) {
      ElementSwitcher.current.style.left =
        boxPosition.x - parentPosition.x - 26 + "px";
      ElementSwitcher.current.style.top =
        "" + (scrlTop ?? 0) + (boxPosition.y - parentPosition.y) + "px";
    }

    if (elementalOptions.current) {
      elementalOptions.current.style.display = "none";
    }

    if (elementalOptionsSettings.current) {
      elementalOptionsSettings.current.style.display = "none";
    }
  };

  const removeSubNode = () => {
    let _elNode = ElementNodeSelector.current;
    _elNode = _elNode.split(",");
    let _elNodeLast = _elNode[_elNode.length - 1];
    _elNode = _elNode.slice(0, -1);
    let _depth = { ...pageDesignState.design };

    //clear panel before removing the elements
    setPanelSettings({ ...panelSettings, panelTitle: "", panelMode: "none" });

    if (_elNode.length > 0) {
      //get parent node
      let _parent_node = get(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements"
      );

      //remove last element

      _parent_node.splice(_elNodeLast, 1);

      //remove the node
      set(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements",
        _parent_node
      );

      pageDesignState.setDesign(_depth);
    } else {
      let _parent_node = get(_depth, "elements");
      _parent_node?.splice(ElementNodeSelector.current, 1);

      //directly set to empty element
      set(_depth, "elements", _parent_node);
      pageDesignState.setDesign(_depth);
    }
    if (ElementSwitcher.current) {
      ElementSwitcher.current.style.display = "none";
    }
    if (elementalOptions.current) {
      elementalOptions.current.style.display = "none";
    }
    if (elementalOptionsSettings.current) {
      elementalOptionsSettings.current.style.display = "none";
    }
    if (elementalHeightResizer.current) {
      elementalHeightResizer.current.style.display = "none";
    }
  };

  const handleContentEdit = (e) => {
    if (e.target.getAttribute("contentEditable") === "true") {
      //update the state of app

      let _elPath;
      let $e;

      let _depth = { ...pageDesignState.design };

      if (
        e.target.getAttribute("data-optionstype") === "ListItem" &&
        e.key === "Enter" &&
        !e.shiftKey
      ) {
        e.preventDefault();

        // let parentPos = e.target.closest('[data-optionstype="List"]').getAttribute("data-path");
        let $elms = e.target
          .closest('[data-optionstype="List"]')
          .querySelectorAll("li");

        //node
        let setNodePath = e.target
          .closest('[data-optionstype="List"]')
          .getAttribute("data-path");
        setNodePath = setNodePath.substring(0, setNodePath.length - 1);
        setNodePath = setNodePath.split(",");

        if (setNodePath.length > 0) {
          setNodePath = "elements[" + setNodePath.join("].elements[") + "]";
        } else {
          setNodePath = "elements";
        }

        let existingItmes = get(_depth, setNodePath);

        if (existingItmes.elements.length < $elms.length + 1) {
          if (elChangeTimer.current) clearTimeout(elChangeTimer.current);
          set(_depth, setNodePath + ".elements", [
            ...existingItmes.elements,
            {
              previmg: "/assets/images/elements/layouts/2col.png",
              elid: "listItem",
              inHTML: "List item" + existingItmes.elements.length,
              desc: "List Item",
              elementType: "ListItem",
              classList: "",
              styles: { color: "#000000" },
              elemType: "li",
              elemEditable: true,
              enableDropping: false,
              elements: [],
            },
          ]);

          pageDesignState.setDesign(_depth);

          //need to update the element to next added element, or hide showing the tools
          if (ElementSwitcher.current) {
            ElementSwitcher.current.style.display = "none";
          }
          return;
        }
      }

      if (e.target.hasAttribute("data-path")) {
        _elPath = e.target.getAttribute("data-path");
        $e = e.target;
      } else {
        _elPath = e.target.closest("data-path").getAttribute("data-path");
        $e = e.target.closest("data-path");
      }
      _elPath = _elPath.substring(0, _elPath.length - 1);
      _elPath = _elPath.split(",");

      //let _depth = { ...pageDesignState.design };

      if (_elPath.length > 1) {
        // _elPath = _elPath.slice(0, -1);

        set(
          _depth,
          "elements[" + _elPath.join("].elements[") + "].inHTML",
          encodeURIComponent($e.innerHTML)
        );
      } else {
        set(
          _depth,
          "elements[" + _elPath[0] + "].inHTML",
          encodeURIComponent($e.innerHTML)
        );
      }
      //elChangeTimer
      //clear existing timeout
      if (elChangeTimer.current) clearTimeout(elChangeTimer.current);
      if (elChangeTimer.current) {
        elChangeTimer.current = setTimeout(() => {
          pageDesignState.setDesign(_depth);
        }, 2000);
      }
    }
    1;
  };

  const updateDragPosition = (e: React.MouseEvent<HTMLLIElement>) => {
    let scrlTop = document.querySelector("[data-panelmain]")?.scrollTop;
    //position
    let parentPosition = document
      .querySelector("div[data-panelmain]")
      ?.getBoundingClientRect();
    let ElBox = ElementSwitcher.current?.getBoundingClientRect();
    if (ElementSwitcher.current && ElBox && parentPosition) {
      ElementSwitcher.current.style.left =
        e.clientX + ElBox.width * 0.5 - parentPosition.x - 26 + "px";
      if (scrlTop)
        ElementSwitcher.current.style.top =
          scrlTop + (e.clientY - ElBox.height * 0.5 - parentPosition.y) + "px";
    }
  };

  const moveDraggedElem = (e: React.MouseEvent<HTMLLIElement>) => {
    let scrlTop = (document.querySelector("[data-panelmain]") as HTMLElement)
      .scrollTop;

    //position of box
    let parentPosition = (
      document.querySelector("div[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();
    let ElBox = ElementSwitcher.current?.getBoundingClientRect();
    if (ElementSwitcher.current && ElBox) {
      ElementSwitcher.current.style.left =
        e.clientX + ElBox.width * 0.5 - parentPosition.x - 26 + "px";
      ElementSwitcher.current.style.top =
        scrlTop + (e.clientY - ElBox.height * 0.5 - parentPosition.y) + "px";
    }

    //Append the selected element to that node
    //Current Node

    if (!ElementNodeSelector.current || !dragEnterSelector.current) {
      alert("Cant arrange in the invalid zone");
      return;
    }

    let _elNode = ElementNodeSelector.current;

    // _elNode = _elNode.substring(0, _elNode.length - 1);
    _elNode = _elNode.split(",");
    let _elNodeLast = _elNode[_elNode.length - 1];
    _elNode = _elNode.slice(0, -1);

    //To Place Node
    let _dSel = dragEnterSelector.current;
    _dSel = _dSel.substring(0, _dSel.length - 1);
    let _dSelArr = _dSel.split(",");
    let _dSelLast = _dSelArr[_dSelArr.length - 1];
    _dSelArr = _dSelArr.slice(0, -1);

    //depth
    let _depth = { ...pageDesignState.design };

    //add the removed node

    if (_dSelArr.length > 0 && _elNode.length > 0) {
      //get parent
      let toPlaceNodeContent = get(
        _depth,
        "elements[" + _dSelArr.join("].elements[") + "]"
      );
      let currentNodeContent = get(
        _depth,
        "elements[" + _elNode.join("].elements[") + "].elements"
      );

      if (!toPlaceNodeContent.enableDropping) {
        //TODO: Add this element next to this element!
        alert("Can not add sub element to this element");
        return;
      }

      toPlaceNodeContent = toPlaceNodeContent.elements;

      let currentAppendElem = currentNodeContent[_elNodeLast];
      currentNodeContent.splice(_elNodeLast, 1);

      //remove content from the current node
      set(_depth, "elements[" + _elNode.join("].elements[") + "].elements", [
        ...currentNodeContent,
      ]);
      //add the node into depth of new position
      set(_depth, "elements[" + _dSelArr.join("].elements[") + "].elements", [
        ...toPlaceNodeContent,
        currentAppendElem,
      ]);

      pageDesignState.setDesign(_depth);
    } else {
      //add on the primary level, hmm..

      //placer
      let toPlaceNodeContent;
      let currentNodeContent;

      if (_dSelArr.length > 0) {
        toPlaceNodeContent = get(_depth, "elements");
        if (!_depth.enableDropping) {
          //TODO: Add this element next to this element!
          alert("Can not add sub element to this element");
          return;
        }
      } else {
        toPlaceNodeContent = get(
          _depth,
          "elements[" + _dSelArr.join("].elements[") + "]"
        );

        if (!toPlaceNodeContent.enableDropping) {
          //TODO: Add this element next to this element!
          alert("Can not add sub element to this element");
          return;
        }

        toPlaceNodeContent = toPlaceNodeContent.elements;
      }

      //getter
      if (_elNode.length > 0) {
        currentNodeContent = get(
          _depth,
          "elements[" + _elNode.join("].elements[") + "].elements"
        );
      } else {
        currentNodeContent = get(_depth, "elements");
      }

      if (_elNode.length < 1 && _dSelArr.length < 1) {
        //shift the positions in the same space
        //both parent content will be same in this case. just need to switch the positions now
        //let currentAppendElem = currentNodeContent[_elNodeLast];

        currentNodeContent[_dSelLast] = currentNodeContent.splice(
          _elNodeLast,
          1,
          currentNodeContent[_dSelLast]
        )[0];

        set(_depth, "elements", [...currentNodeContent]);
        pageDesignState.setDesign(_depth);
      } else {
        //shifting hell

        //get the appending node
        let currentAppendElem = currentNodeContent[_elNodeLast];
        currentNodeContent.splice(_elNodeLast, 1);

        //set the appending node
        if (_dSelArr.length > 0) {
          // set(_depth, 'elements[' + _dSelArr.join('].elements[') + '].elements', [...toPlaceNodeContent, JSON.parse(JSON.stringify(currentAppendElem))]);
          set(
            _depth,
            "elements[" + _dSelArr.join("].elements[") + "].elements",
            [currentAppendElem]
          );
        } else {
          set(_depth, "elements", [currentAppendElem]);
        }

        //set the getter node
        if (_elNode.length > 0) {
          set(
            _depth,
            "elements[" + _elNode.join("].elements[") + "].elements",
            [...currentNodeContent]
          );
        } else {
          set(_depth, "elements", [...currentNodeContent]);
        }

        pageDesignState.setDesign(_depth);
      }
    }

    //select the active element
    //update position for the elemenNode
    if (_dSelArr.length > 0) {
      ElementNodeSelector.current =
        _dSelArr.join(",") + "," + (+_dSelLast + 1) + "";

      pageDesignState.activeElemLayer.current =
        _dSelArr.join(",") + "," + (+_dSelLast + 1) + "";
      pageDesignState.setELLayer(
        _dSelArr.join(",") + "," + (+_dSelLast + 1) + ""
      );
    } else {
      ElementNodeSelector.current = +_dSelLast + 1 + "";
      pageDesignState.activeElemLayer.current = +_dSelLast + 1 + "";
      pageDesignState.setELLayer(+_dSelLast + 1 + "");
    }

    //select the element again after render
    document
      .querySelector(`div[data-path="${dragEnterSelector.current}"]`)
      ?.classList.add("temp_infocus");

    let scrlTopp = document.querySelector("[data-panelmain]")?.scrollTop;

    //update the position of the selector
    let parentPositionBlock = document
      .querySelector("div[data-panelmain]")
      ?.getBoundingClientRect();
    let boxPosition;
    if (dragEnterSelector.current) {
      boxPosition = document
        .querySelector(`[data-path="${dragEnterSelector.current}"]`)
        ?.getBoundingClientRect();
    }
    if (ElementSwitcher.current) {
      if (boxPosition && parentPositionBlock)
        ElementSwitcher.current.style.left =
          boxPosition.x - parentPositionBlock?.x - 26 + "px";
      if (scrlTopp && boxPosition && parentPositionBlock)
        ElementSwitcher.current.style.top =
          scrlTopp + (boxPosition.y - parentPositionBlock.y) + "px";
    }

    if (elementalOptions.current)
      elementalOptions.current.style.display = "none";
    if (elementalOptionsSettings.current)
      elementalOptionsSettings.current.style.display = "none";
  };

  const removeActiveElemStyle = () => {
    let elms = document.querySelectorAll(".temp_infocus");
    if (elms.length) {
      for (let i = 0; i < elms.length; i++) {
        const el = elms[i] as HTMLElement; // Ensure type is HTMLElement

        // el.style.outline = "none";
        el.classList.remove("temp_infocus");
      }
    }

    let elmsAct = document.querySelectorAll(".editable_infocus");
    if (elmsAct.length) {
      for (let i = 0; i < elmsAct.length; i++) {
        const el = elmsAct[i] as HTMLElement; // Ensure type is HTMLElement

        // el.style.outline = "none";
        el.classList.remove("editable_infocus");
      }
    }
  };

  const showSettingsPanel = (
    e: React.MouseEvent<HTMLElement>,
    name: string,
    type: string,
    selectText: boolean
  ) => {
    setPanelSettings({ ...panelSettings, panelTitle: name, panelMode: type });

    let scrlTopp = (document.querySelector("[data-panelmain]") as HTMLElement)
      .scrollTop;
    let panelSize = (
      document.querySelector("[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();
    if (elementalOptionsSettings.current) {
      elementalOptionsSettings.current.style.left =
        e.clientX - panelSize.left + "px";
      elementalOptionsSettings.current.style.top =
        scrlTopp + e.clientY + 20 - panelSize.top + "px";
      elementalOptionsSettings.current.style.display = "block";
    }

    //select text
    if (!selectText) {
      return;
    }

    //node
    let currentNode = ElementNodeSelector.current;
    currentNode = currentNode.split(",");
    let currentNodeLast = currentNode[currentNode.length - 1];
    //currentNode = currentNode.slice(0, -1);

    let _node_path;
    if (currentNode.length > 0) {
      _node_path =
        "elements[" + currentNode.join("].elements[") + "].elemEditable";
    } else {
      _node_path = "elements[" + currentNodeLast + "].elemEditable";
    }

    let selectTextCls = get(pageDesignState.design, _node_path);

    //check the node about which type of link has to be added

    if (selectTextCls) {
      requestAnimationFrame(() => {
        let node = document.querySelector(
          '[data-path="' + ElementNodeSelector.current + ',"]'
        ) as HTMLElement;
        if (node) {
          node.focus();
        }
        if (document.selection) {
          var range = document.body.createTextRange();
          range.moveToElementText(node);
          range.select();
        } else if (window.getSelection) {
          var range = document.createRange();
          range.selectNodeContents(node);
          window.getSelection()?.removeAllRanges();
          window.getSelection()?.addRange(range);
        }
      });
    } else {
      requestAnimationFrame(() => {
        let node = document.querySelector(
          '[data-path="' + ElementNodeSelector.current + ',"]'
        ) as HTMLElement;
        if (node) {
          node.focus();
        }
      });
    }
  };

  const getNodeData = (elString: string, level: number) => {
    let currentNode = elString.split(",");
    let currentNodeLast = currentNode[currentNode.length - 1];
    currentNode = level === 0 ? currentNode : currentNode.slice(0, level);

    let _node_path;
    if (currentNode.length > 0) {
      _node_path = "elements[" + currentNode.join("].elements[") + "]";
    } else {
      _node_path = "elements[" + currentNodeLast + "]";
    }

    return get(pageDesignState.design, _node_path);
  };

  const setNodeData = (elString: string, level: number, data: any) => {
    let currentNode = elString.split(",");
    let currentNodeLast = currentNode[currentNode.length - 1];
    currentNode = level === 0 ? currentNode : currentNode.slice(0, level);
    let __temp_structure = { ...pageDesignState.design };

    let _node_path;
    if (currentNode.length > 0) {
      _node_path = "elements[" + currentNode.join("].elements[") + "]";
    } else {
      _node_path = "elements[" + currentNodeLast + "]";
    }

    set(__temp_structure, _node_path, data);
    pageDesignState.setDesign(__temp_structure);
  };
  const setElementHeight = (e: React.MouseEvent<HTMLDivElement>) => {
    let scrlTopp = (document.querySelector("[data-panelmain]") as HTMLElement)
      .scrollTop;
    let panelSize = (
      document.querySelector("[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();

    //lets first update its position
    //elementalHeightResizer.current.style.left = e.clientX - panelSize.left - 14.5 + "px";
    let dragTopPos = scrlTopp + e.clientY - panelSize.top - 12;
    if (elementalHeightResizer.current) {
      elementalHeightResizer.current.style.top = dragTopPos + "px";
    }

    //get the current element top position
    //temp in dom to check
    let parentP = document.querySelector(
      '[data-path="' + ElementNodeSelector.current + ',"]'
    ) as HTMLElement;
    if (parentP) {
      parentP.classList.add("temp_infocus_drag");

      let parentS = parentP.getBoundingClientRect();

      let height = dragTopPos - (parentS.top - panelSize.top - 12 + scrlTopp);

      // if (height < parentS.height) {
      //     elementalHeightResizer.current.style.top = scrlTopp + parentS.bottom - 12 + "px";
      // }

      parentP.style.minHeight = height + "px";
    }
    if (elementalOptions.current) {
      elementalOptions.current.style.display = "none";
    }
  };

  const setElemHtMin = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("active");

    let scrlTopp = (document.querySelector("[data-panelmain]") as HTMLElement)
      .scrollTop;
    let panelSize = (
      document.querySelector("[data-panelmain]") as HTMLElement
    ).getBoundingClientRect();

    //lets first update its position
    //elementalHeightResizer.current.style.left = e.clientX - panelSize.left - 14.5 + "px";
    let dragTopPos = scrlTopp + e.clientY - panelSize.top - 12;
    if (elementalHeightResizer.current) {
      elementalHeightResizer.current.style.top = dragTopPos + "px";
    }

    //get the current element top position
    //temp in dom to check
    let parentP = document.querySelector(
      '[data-path="' + ElementNodeSelector.current + ',"]'
    ) as HTMLElement;
    if (parentP.classList.contains("temp_infocus_drag"))
      parentP.classList.remove("temp_infocus_drag");
    let parentS = parentP.getBoundingClientRect();

    let height = dragTopPos - (parentS.top - panelSize.top - 12 + scrlTopp);

    if (elementalHeightResizer.current) {
      elementalHeightResizer.current.style.top =
        scrlTopp + parentS.bottom - panelSize.top - 12 + "px";
    }

    //parentP.style.minHeight = height + "px";

    // if (height < parentS.height) {
    //     elementalHeightResizer.current.style.top = scrlTopp + parentS.bottom - 12 + "px";
    // }

    //update inside the object

    //get current styles
    let __currentStyles = getNodeData(ElementNodeSelector.current, 0);
    let __minHtStyle = { ...__currentStyles.styles, minHeight: height + "px" };
    let __newElement = { ...__currentStyles, styles: __minHtStyle };
    setNodeData(ElementNodeSelector.current, 0, __newElement);

    if (elementalOptions.current) {
      elementalOptions.current.style.display = "none";
    }
  };

  const elemHeightResizeY = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("active");
    let parentP = document.querySelector(
      '[data-path="' + ElementNodeSelector.current + ',"]'
    ) as HTMLElement;
    parentP.classList.add("temp_infocus_drag");
    parentP.classList.remove("temp_infocus");
  };

  return (
    <div
      className={prvp["panel_container"]}
      onMouseEnter={() => {
        if (ElementSwitcher.current) {
          ElementSwitcher.current.style.opacity = "1";
        }
        if (elementalOptions.current) {
          elementalOptions.current.style.opacity = "1";
        }
        if (elementalOptionsSettings.current) {
          elementalOptionsSettings.current.style.opacity = "1";
        }
        if (elementalHeightResizer.current) {
          elementalHeightResizer.current.style.opacity = "1";
        }
      }}
      onMouseLeave={() => {
        if (ElementSwitcher.current) {
          ElementSwitcher.current.style.opacity = "0";
        }
        if (elementalOptions.current) {
          elementalOptions.current.style.opacity = "0";
        }
        if (elementalOptionsSettings.current) {
          elementalOptionsSettings.current.style.opacity = "0";
        }
        if (elementalHeightResizer.current) {
          elementalHeightResizer.current.style.opacity = "0";
        }
        removeActiveElemStyle();
      }}
      data-panelmain=""
    >
      {
        /**
                Font Loader
                 */
        <FontLoader fontList={pageDesignState.design?.fonts as FontOption[]} />
      }
      <div
        data-operation=""
        className={prvp["layout_panel_options"]}
        ref={ElementSwitcher}
      >
        <ul className={prvp["elemental_options"]}>
          <li className="actionBtnHover" onClick={moveElUp}>
            <i className="las la-chevron-circle-up"></i>
          </li>
          <li
            className="actionBtnDrag"
            onDrag={updateDragPosition}
            onDragEnd={moveDraggedElem}
            draggable
          >
            <i className="las la-arrows-alt"></i>
          </li>
          <li className="actionBtnHover" onClick={moveElDown}>
            <i className="las la-chevron-circle-down"></i>
          </li>
          <li>
            <hr />
          </li>
          <li className="actionBtnHover" onClick={removeSubNode}>
            <i className="las la-trash-alt"></i>
          </li>
        </ul>
      </div>

      <div
        className="html_elem_height_setter"
        onDrag={setElementHeight}
        onDragStart={elemHeightResizeY}
        onDragEnd={setElemHtMin}
        draggable
        ref={elementalHeightResizer}
      >
        <i className="las la-arrows-alt-v"></i>
      </div>
      <div className="html_elem_option_list" ref={elementalOptions}>
        <ul>
          <li
            className="actionListical"
            onClick={(e) =>
              showSettingsPanel(e, "Style options", "editSettings", false)
            }
          >
            <i className="las la-palette"></i> Edit Options
          </li>
          <li
            className="actionListical"
            ref={showRowOption}
            onClick={(e) =>
              showSettingsPanel(e, "Row Layout", "rowLayout", false)
            }
          >
            <ToolTip
              iconclass="lab la-microsoft"
              tooltipcontent={<span className="no-wrap-text">Row Layout</span>}
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={showColOption}
            onClick={(e) =>
              showSettingsPanel(e, "Align Items", "AlignItems", false)
            }
          >
            <ToolTip
              iconclass="las la-align-center"
              tooltipcontent={<span className="no-wrap-text">Align Itmes</span>}
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={showHeaderOption}
            onClick={(e) =>
              showSettingsPanel(e, "Heading Type", "headingType", false)
            }
          >
            <ToolTip
              iconclass="las la-heading"
              tooltipcontent={<span className="no-wrap-text">Heading Tag</span>}
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={showListOption}
            onClick={(e) =>
              showSettingsPanel(e, "List Settings", "ListType", false)
            }
          >
            <ToolTip
              iconclass="las la-list-ul"
              tooltipcontent={
                <span className="no-wrap-text">List Settings</span>
              }
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={showImageSetting}
            onClick={(e) =>
              showSettingsPanel(e, "Image Settings", "ImageType", false)
            }
          >
            <ToolTip
              iconclass="las la-image"
              tooltipcontent={
                <span className="no-wrap-text">Image Settings</span>
              }
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={iframeSettings}
            onClick={(e) =>
              showSettingsPanel(e, "Inline Frame Settings", "iframeType", false)
            }
          >
            <ToolTip
              iconclass="las la-window-maximize"
              tooltipcontent={
                <span className="no-wrap-text">iframe Settings</span>
              }
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={columnWidthSetting}
            onClick={(e) =>
              showSettingsPanel(e, "Column Width Settings", "columnType", false)
            }
          >
            <ToolTip
              iconclass="las la-arrows-alt-h"
              tooltipcontent={
                <span className="no-wrap-text">Manage Columns</span>
              }
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={naviagtionMenuSettings}
            onClick={(e) =>
              showSettingsPanel(
                e,
                "Navigation Links Settings",
                "navigationType",
                false
              )
            }
          >
            <ToolTip
              iconclass="las la-bars"
              tooltipcontent={
                <span className="no-wrap-text">Manage Menu Links</span>
              }
            ></ToolTip>
          </li>
          <li
            className="actionListical"
            ref={headerPositionSettings}
            onClick={(e) =>
              showSettingsPanel(e, "Header Settings", "headerSetType", false)
            }
          >
            <ToolTip
              iconclass="las la-cog"
              tooltipcontent={
                <span className="no-wrap-text">Set Header Positions</span>
              }
            ></ToolTip>
          </li>

          {creatorDevMode.current && (
            <li
              className="actionListical"
              onClick={(e) =>
                showSettingsPanel(e, "Node JSON", "previewNode", false)
              }
            >
              <ToolTip
                iconclass="las la-laptop-code"
                tooltipcontent={
                  <span className="no-wrap-text">Show Node JSON</span>
                }
              ></ToolTip>
            </li>
          )}

          <li
            className="actionListical small_btn_actionListical"
            onClick={(e) => {
              e.preventDefault();
              showSettingsPanel(e, "Animation", "animation", false);
            }}
          >
            <ToolTip
              iconclass="las la-magic"
              tooltipcontent={
                <span className="no-wrap-text">Add Animations</span>
              }
            ></ToolTip>
          </li>

          <li className="actionListical small_btn_actionListical">
            <button
              onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                showSettingsPanel(e, "Link", "hyperlink", true);
              }}
            >
              <ToolTip
                iconclass="las la-link"
                tooltipcontent={
                  <span className="no-wrap-text">Insert Link</span>
                }
              ></ToolTip>
            </button>
          </li>
        </ul>
      </div>
      <div className="settings_panel" ref={elementalOptionsSettings}>
        <div className="setting_dragger_option">
          <div
            className="settings_dragger_title"
            draggable
            onDrag={(e) => {
              let selfSize =
                elementalOptionsSettings.current &&
                elementalOptionsSettings.current.getBoundingClientRect();
              let panelSize = (
                document.querySelector("[data-panelmain]") as HTMLElement
              ).getBoundingClientRect();
              let scrlTopp = (
                document.querySelector("[data-panelmain]") as HTMLElement
              ).scrollTop;
              if (selfSize) {
                let leftPos =
                  selfSize.right > window.innerWidth - 40
                    ? window.innerWidth - selfSize.width - panelSize.left - 40
                    : e.clientX - panelSize.left - selfSize.width / 2;
                leftPos =
                  leftPos + selfSize.width > window.innerWidth - 40
                    ? window.innerWidth - selfSize.width - panelSize.left - 40
                    : leftPos;
                leftPos = leftPos > 0 ? leftPos : 0;
                if (elementalOptionsSettings.current) {
                  elementalOptionsSettings.current.style.left = leftPos + "px";
                }

                let topPos =
                  selfSize.top < panelSize.top
                    ? 0
                    : e.clientY - panelSize.top + scrlTopp - 20;

                topPos = topPos < panelSize.top ? 0 : topPos;
                if (elementalOptionsSettings.current) {
                  elementalOptionsSettings.current.style.top = topPos + "px";
                }
              }
            }}
            onDragEnd={(e) => {
              let selfSize =
                elementalOptionsSettings.current?.getBoundingClientRect();
              let panelSize = (
                document.querySelector("[data-panelmain]") as HTMLElement
              ).getBoundingClientRect();
              let scrlTopp = (
                document.querySelector("[data-panelmain]") as HTMLElement
              ).scrollTop;
              if (selfSize) {
                let leftPos =
                  selfSize.right > window.innerWidth - 40
                    ? window.innerWidth - selfSize.width - panelSize.left - 40
                    : e.clientX - panelSize.left - selfSize.width / 2;
                leftPos =
                  leftPos + selfSize.width > window.innerWidth - 40
                    ? window.innerWidth - selfSize.width - panelSize.left - 40
                    : leftPos;
                leftPos = leftPos > 0 ? leftPos : 0;
                if (elementalOptionsSettings.current) {
                  elementalOptionsSettings.current.style.left = leftPos + "px";
                }

                let topPos =
                  selfSize.top < panelSize.top
                    ? 0
                    : e.clientY - panelSize.top + scrlTopp;

                if (elementalOptionsSettings.current) {
                  elementalOptionsSettings.current.style.top = topPos + "px";
                }
              }
            }}
          >
            {panelSettings.panelTitle}
          </div>
          <div className="settings_dragger_action">
            <span
              onClick={() => {
                if (elementalOptionsSettings.current) {
                  elementalOptionsSettings.current.style.display = "none";
                }
                setRCount({ refreshCount: rCount.refreshCount + 1 });
              }}
            >
              <i className="las la-times"></i>
            </span>
          </div>
        </div>
        <div className="settings_dragger_content">
          {
            /**
             * Animation Options component
             */
            panelSettings.panelMode === "animation" ? (
              <AnimationOptionsPanel
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                currentlyActive={ElementNodeSelector}
              />
            ) : (
              ""
            )
          }

          {
            /**
             * adds a url node inbetween
             */
            panelSettings.panelMode === "hyperlink" ? (
              <AddLink
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector + "selection"}
                currentlyActive={ElementNodeSelector}
              />
            ) : (
              ""
            )
          }

          {
            /**
             * Row size settings
             */
            panelSettings.panelMode === "rowLayout" ? (
              <RowWidth
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector + "selection"}
                currentlyActive={ElementNodeSelector}
              />
            ) : (
              ""
            )
          }

          {
            /**
             * column alignment option
             *
             */
            panelSettings.panelMode === "AlignItems" ? (
              <AlignItems
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector + "selection"}
                currentlyActive={ElementNodeSelector}
              />
            ) : (
              ""
            )
          }

          {
            /**
             * Edit settings
             */
            panelSettings.panelMode === "editSettings" && (
              <>
                <EditSettings
                  closePanel={() => {
                    if (elementalOptionsSettings.current) {
                      elementalOptionsSettings.current.style.display = "none";
                    }
                    setPanelSettings({
                      ...panelSettings,
                      panelTitle: "",
                      panelMode: "none",
                    });
                  }}
                  key={ElementNodeSelector.current + "editorSetting"}
                  currentlyActive={ElementNodeSelector}
                />
              </>
            )
          }

          {
            /**
             * Heading settings
             */
            panelSettings.panelMode === "headingType" && (
              <HeadingSettings
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }

          {
            /**
             * List Settings
             */
            panelSettings.panelMode === "ListType" && (
              <ListSettings
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }

          {
            /**
             * Image Settings
             */
            panelSettings.panelMode === "ImageType" && (
              <ImageSetting
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
          {
            /**
             * inline frame Settings
             */
            panelSettings.panelMode === "iframeType" && (
              <InlineFrameSetting
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
          {
            /**
             * Column Width Settings
             */
            panelSettings.panelMode === "columnType" && (
              <ColumnWidthSetting
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
          {
            /**
             * Navigation Settings
             */
            panelSettings.panelMode === "navigationType" && (
              <NavigationSettings
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
          {
            /**
             * Header position Settings
             */
            panelSettings.panelMode === "headerSetType" && (
              <HeaderSettings
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
          {
            /**
             * View node json
             */
            panelSettings.panelMode === "previewNode" && (
              <GetNodeData
                closePanel={() => {
                  if (elementalOptionsSettings.current) {
                    elementalOptionsSettings.current.style.display = "none";
                  }
                  setPanelSettings({
                    ...panelSettings,
                    panelTitle: "",
                    panelMode: "none",
                  });
                }}
                key={ElementNodeSelector.current + "editorSetting"}
                currentlyActive={ElementNodeSelector}
              />
            )
          }
        </div>
      </div>
      <div style={prevW} className={prvp["panel_preview"]}>
        <div className={prvp["panel_container_inner"]} data-prevpanel="true">
          {/* <HeaderNav /> */}
          {pageDesignState.design?.elements?.length ? (
            pageDesignState.design?.elements?.map((e, i) => {
              let styles = {} as Partial<React.CSSProperties>;

              if (e.elementType === "Header Layout") {
                styles = { ...e.styles };
                styles.top = parseInt(styles.top as string, 10) + 40 + "px";
                styles.width = "100%";
              }

              return (
                <section
                  style={styles}
                  data-elid={e.elid + "_" + i}
                  onDragEnter={(e) => updateInsertPosition(e)}
                  onDragLeave={removeGuides}
                  data-elposition={i}
                  key={e.elid + "_" + i}
                >
                  <GenerateHTMLComp element={e} datapath={i + ","} />
                </section>
              );
            })
          ) : (
            <section>
              <div className="temp_elem">Create a layout</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
