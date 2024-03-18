import React, { useEffect } from "react";
import { set, get } from "lodash";

import "./elementLayer.css";
import { usePageDesignContext } from "@/contexts/page-design";
import { IdesignState } from "@/interfaces/design";
import { getWidthCol } from "@/components/preview-panel/column-width-setting/utils";

export default function ElementLayer() {
  let pageDesignState = usePageDesignContext();

  useEffect(() => {
    highlightActiveLayer();
  }, [pageDesignState?.actElLayer]);

  const highlightActiveLayer = () => {
    let node = document.querySelector(
      '[data-path-layer="' + pageDesignState.actElLayer + ',"]'
    );
    if (node) {
      node.querySelector("span")?.classList.add("currentlyActiveNode");
    }
  };

  const collapseParentList = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let node = e.currentTarget;
    if (node) {
      const subNode = node.querySelector(".subNode");
      if (subNode) node = subNode as HTMLLIElement;

      if (!node && e.currentTarget.hasAttribute("data-spannode")) {
        node = e.currentTarget
          .closest("li")
          ?.querySelector(".subNode") as HTMLLIElement;
      }

      if (node) {
        node.classList.toggle("closeNode");
      }
    }
  };

  const MultiLayers = ({
    datapath,
    e,
  }: {
    datapath: string;
    e: IdesignState[];
  }) => {
    return (
      <>
        {e.map((el, i) => {
          return (
            <GenerateLayer
              element={el}
              datapath={datapath + i + ","}
              key={datapath + i + ","}
            >
              {el.elementType}
            </GenerateLayer>
          );
        })}
      </>
    );
  };

  const selectLayerNode = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let __active_node = e.currentTarget
      .closest("[data-path-layer]")
      ?.getAttribute("data-path-layer");
    if (__active_node)
      pageDesignState.setELLayer(
        __active_node.slice(0, __active_node.length - 1)
      );
  };

  const highlightNode = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    let __el;
    if (e.currentTarget.hasAttribute("data-path-layer")) {
      __el = e.currentTarget.getAttribute("data-path-layer");
    } else {
      __el = e.currentTarget
        .closest("[data-path-layer]")
        ?.getAttribute("data-path-layer");
    }
    let node = document.querySelector('[data-path="' + __el + '"]');

    if (node) {
      node.classList.add("layerBasedHighlight");

      // setTimeout(() => {
      //     node.classList.remove("layerBasedHighlight");
      // }, 2500);
    }
  };

  const removeHighlightNode = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let __el;
    if (e.currentTarget.hasAttribute("data-path-layer")) {
      __el = e.currentTarget.getAttribute("data-path-layer");
    } else {
      __el = e.currentTarget
        .closest("[data-path-layer]")
        ?.getAttribute("data-path-layer");
    }
    let node = document.querySelector('[data-path="' + __el + '"]');

    if (node) {
      node.classList.remove("layerBasedHighlight");
    }
  };

  const setNodeData = (
    elString: string,
    level: number,
    data: Allow,
    offset: string
  ) => {
    let currentNode = elString.split(",");
    let currentNodeLast = currentNode[currentNode.length - 1];
    currentNode =
      level === 0
        ? currentNode
        : currentNode.slice(0, currentNode.length - level);
    let __temp_structure = { ...pageDesignState.design };

    let _node_path;
    if (currentNode.length > 0) {
      _node_path = "elements[" + currentNode.join("].elements[") + "]" + offset;
    } else {
      _node_path = "elements[" + currentNodeLast + "]" + offset;
    }

    set(__temp_structure, _node_path, data);
    pageDesignState.setDesign(__temp_structure);

    //close panellastIdx
  };

  const getNodeData = (elString: string, level: number, offset: string) => {
    let currentNode = elString.split(",");
    let currentNodeLast = currentNode[currentNode.length - 1];
    currentNode =
      level === 0
        ? currentNode
        : currentNode.slice(0, currentNode.length - level);

    let _node_path;
    if (currentNode.length > 0) {
      _node_path = "elements[" + currentNode.join("].elements[") + "]" + offset;
    } else {
      _node_path = "elements[" + currentNodeLast + "]" + offset;
    }

    return get(pageDesignState.design, _node_path);
  };

  const duplicateLayerNode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let __active_node = e.currentTarget
      .closest("[data-path-layer]")
      ?.getAttribute("data-path-layer");
    __active_node = __active_node?.slice(0, -1);
    if (__active_node) {
      let __el = { ...getNodeData(__active_node, 0, "") };

      let __all_els = [...getNodeData(__active_node, 1, ".elements")];

      let lastIdx = __active_node.split(",");
      const lastIndex = +lastIdx[lastIdx.length - 1];

      if (__el.elementType === "Column") {
        /**
         * This will keep the width integrity of the website!
         */

        //calculate width of all the columns in row
        if (__all_els.length === 12) {
          alert("Can not duplicate the column as there is no space for it.");
          return;
        }

        let wd = 0;
        let _elWD = getWidthCol(__el.classList);

        for (let i of __all_els) {
          let __cwd = getWidthCol(i.classList);
          wd += __cwd;
        }

        if (wd + _elWD > 12) {
          alert(
            "Dont have space for the duplicate element. Need empty column space of " +
              _elWD +
              " curretly columns are occupying the space of " +
              wd
          );
          return;
        }
      }

      __all_els.splice(lastIndex, 0, JSON.parse(JSON.stringify(__el)));

      if (
        __active_node.split(",").length < 2 &&
        pageDesignState.design?.elements
      ) {
        let __all_els = [...pageDesignState.design.elements];
        __all_els.splice(lastIndex, 0, JSON.parse(JSON.stringify(__el)));

        let __temp_structure = { ...pageDesignState.design };
        __temp_structure.elements = __all_els;

        pageDesignState.setDesign(__temp_structure);
      } else {
        setNodeData(__active_node, 1, __all_els, "elements");
      }
    }
  };

  const GenerateLayer = ({
    datapath,
    element,
    children,
  }: {
    datapath: string;
    element: IdesignState;
    children?: React.ReactNode;
  }) => {
    let e = element;

    // let elProp = { ["data-path-layer"]: props.datapath, onClick: collapseParentList, onMouseEnter: highlightNode, onMouseLeave: removeHighlightNode };
    let elProp = { ["data-path-layer"]: datapath, onClick: collapseParentList };

    if (e.elements && e.elements.length > 0) {
      //has sub elem

      let __cln = datapath.charAt(0);
      let __eNode = pageDesignState.actElLayer.charAt(0);

      let __classNames = { className: "subNode  closeNode" };

      if (__cln == __eNode) {
        __classNames = { className: "subNode " };
      }

      if (e.elements.length < 2) {
        //single element

        return React.createElement(
          "li",
          { ...elProp, className: "hasSubNode text-slate-300" },
          [
            <span
              data-spannode
              onDoubleClick={selectLayerNode}
              onMouseLeave={removeHighlightNode}
              onMouseEnter={highlightNode}
              className="text-slate-300"
            >
              {children}
              <div
                onMouseLeave={removeHighlightNode}
                onMouseEnter={highlightNode}
              >
                <button
                  className="elementNodeSelector"
                  onClick={selectLayerNode}
                >
                  <i className="las la-mouse-pointer"></i>
                </button>

                <button className="duplicateLayer" onClick={duplicateLayerNode}>
                  <i className="las la-copy"></i>
                </button>
              </div>
            </span>,
            React.createElement(
              "ul",
              __classNames,
              <GenerateLayer datapath={datapath + "0,"} element={e.elements[0]}>
                {e.elementType}
              </GenerateLayer>
            ),
          ]
        );
      } else {
        //more then one element

        return React.createElement(
          "li",
          { ...elProp, className: "hasSubNode" },
          [
            <span
              onDoubleClick={selectLayerNode}
              data-spannode
              onMouseLeave={removeHighlightNode}
              onMouseEnter={highlightNode}
              className="text-slate-300"
            >
              {e.elementType}
              <div
                onMouseLeave={removeHighlightNode}
                onMouseEnter={highlightNode}
              >
                <button
                  className="elementNodeSelector"
                  onClick={selectLayerNode}
                >
                  <i className="las la-mouse-pointer"></i>
                </button>
                <button className="duplicateLayer" onClick={duplicateLayerNode}>
                  <i className="las la-copy"></i>
                </button>
              </div>
            </span>,
            React.createElement(
              "ul",
              __classNames,
              <MultiLayers datapath={datapath} e={e.elements} />
            ),
          ]
        );
      }
    } else {
      return React.createElement(
        "li",
        { ...elProp, className: "layerNode"},
        <span
          onDoubleClick={selectLayerNode}
          data-spannode
          onMouseLeave={removeHighlightNode}
          onMouseEnter={highlightNode}
          className="text-slate-300"
        >
          {e.elementType}
          <div onMouseLeave={removeHighlightNode} onMouseEnter={highlightNode}>
            <button className="elementNodeSelector" onClick={selectLayerNode}>
              <i className="las la-mouse-pointer"></i>
            </button>

            <button className="duplicateLayer" onClick={duplicateLayerNode}>
              <i className="las la-copy"></i>
            </button>
          </div>
        </span>
      );
    }
  };

  return (
    <div className="WebpageLayersOuter">
      <div className="webpageLayerInner">
        <div className="layergroup">
          <ul className="text-slate-300">
            {pageDesignState.design?.elements?.map((e, i) => {
              return <GenerateLayer key={i} element={e} datapath={i + ","} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
