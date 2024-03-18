import React, { useState, useEffect, useRef, useContext } from "react";
import "./alignItems.css";
import { set, get } from "lodash";
import { usePageDesignContext } from "@/contexts/page-design";

interface AlignItemsProps {
  currentlyActive: React.MutableRefObject<string>;
  closePanel: Function;
}
const AlignItems: React.FC<AlignItemsProps> = ({
  closePanel,
  currentlyActive,
}) => {
  enum IalignItemsType {
    "flex-start" = "flex-start",
    "center" = "center",
    "flex-end" = "flex-end",
    "stretch"="stretch",
  }
  enum IjustifyContentType {
    "flex-start" = "flex-start",
    "center" = "center",
    "flex-end" = "flex-end",
    "space-evenly" = "space-evenly",
    "space-around" = "space-around",
    "space-between" = "space-between",
  }
  
  enum IlabelType {
    "Left"="Left",
    "Center"="Center",
    "Right"="Right",
    "Stretch"="Stretch",
    "Top"="Top",
    "Bottom"="Bottom",
    "Space Evenly"="Space Evenly",
    "Space Around"="Space Around",
    "Space Between"="Space Between",
  }
  interface IHorizontalAlignType {
    alignItems: IalignItemsType;
    imgSrc: string;
    label: IlabelType;
  }

  const pageDesignState = usePageDesignContext();
  type IflexOptions = {
    alignItems: IalignItemsType;
    justifyContent: IjustifyContentType;
  };
  const [flexAlignOptions, setFlexAlignOptions] = useState<IflexOptions>({
    alignItems: IalignItemsType["flex-start"],
    justifyContent: IjustifyContentType["flex-start"],
  });

  let prevTimerHelper = useRef<Allow>(null);

  useEffect(() => {
    prevFlexOptions();
  }, [flexAlignOptions]);

  const setNodeData = (elString: string, level: number, data: Allow) => {
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

  const applyFlexOptions = () => {
    let currentNode = currentlyActive.current;
    let __current_elem = getNodeData(currentNode, 0);

    let __style_prop = { ...__current_elem.styles };
    __style_prop = { ...__style_prop, ...flexAlignOptions };

    __current_elem.styles = __style_prop;

    setNodeData(currentNode, 0, __current_elem);

    //close panel
    closePanel();
  };

  const prevFlexOptions = () => {
    let node = document.querySelector(
      '[data-path="' + currentlyActive.current + ',"]'
    ) as HTMLElement;
    if (node) {
      node.style.alignItems = flexAlignOptions.alignItems as unknown as string;
      node.style.justifyContent =
        flexAlignOptions.justifyContent as unknown as string;

      node.classList.add("alignOptionsPrev");
    }

    if (prevTimerHelper.current) {
      clearTimeout(prevTimerHelper.current);

      prevTimerHelper.current = setTimeout(() => {
        document
          .querySelector('[data-path="' + currentlyActive.current + ',"]')
          ?.classList.remove("alignOptionsPrev");
      }, 2000);
    }
  };
  const HorizontalAlign: IHorizontalAlignType[] = [
    {
      alignItems: IalignItemsType["flex-start"],
      imgSrc: "/assets/images/flexAlign/leftAlign.jpg",
      label: IlabelType.Left,
    },
    {
      alignItems: IalignItemsType["center"],
      imgSrc: "/assets/images/flexAlign/centerAlign.jpg",
      label: IlabelType.Center,
    },
    {
      alignItems: IalignItemsType["flex-end"],
      imgSrc: "/assets/images/flexAlign/rightAlign.jpg",
      label: IlabelType.Right,
    },
    {
      alignItems: IalignItemsType["stretch"],
      imgSrc: "/assets/images/flexAlign/stretchAlign.jpg",
      label: IlabelType.Stretch,
    },
  ];
  type IVerticalAlignType = {
    justifyContent: IjustifyContentType;
    imgSrc: string;
    label: IlabelType;
  };
  const VerticalAlign: IVerticalAlignType[] = [
    {
      justifyContent: IjustifyContentType["flex-start"],
      imgSrc: "/assets/images/flexAlign/justifyTop.jpg",
      label: IlabelType.Top,
    },
    {
      justifyContent: IjustifyContentType["center"],
      imgSrc: "/assets/images/flexAlign/justifyCenter.jpg",
      label: IlabelType.Center,
    },
    {
      justifyContent: IjustifyContentType["flex-end"],
      imgSrc: "/assets/images/flexAlign/justifyBottom.jpg",
      label: IlabelType.Bottom,
    },
    {
      justifyContent: IjustifyContentType["space-evenly"],
      imgSrc: "/assets/images/flexAlign/justifySpaceEvenly.jpg",
      label: IlabelType["Space Evenly"],
    },
    {
      justifyContent: IjustifyContentType["space-around"],
      imgSrc: "/assets/images/flexAlign/justifySpaceAround.jpg",
      label: IlabelType["Space Around"],
    },
    {
      justifyContent: IjustifyContentType["space-between"],
      imgSrc: "/assets/images/flexAlign/justifySpaceBetween.jpg",
      label: IlabelType["Space Between"],
    },
  ];
  return (
    <div className="wdAlignPanel">
      <div className="wdAlignInner">
        <h5>Horizontal align</h5>
        <div className="halign-options">
          {HorizontalAlign.map((option, index) => {
            return (
              <div
                key={index}
                className="align-option"
                onClick={() =>
                  setFlexAlignOptions((prev) => ({
                    ...prev,
                    alignItems: option.alignItems,
                  }))
                }
              >
                <img src={option.imgSrc} />
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
        <h5>Vertical Align</h5>
        <div className="halign-options">
          {VerticalAlign.map((option, index) => {
            return (
              <div
                key={index}
                className="align-option"
                onClick={() =>
                  setFlexAlignOptions((prev) => {
                    return { ...prev, justifyContent: option.justifyContent };
                  })
                }
              >
                <img src={option.imgSrc} />
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>

        <div className="applyFlexOption">
          <button onClick={applyFlexOptions}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default AlignItems;
