import React from "react";
import { Tooltip } from "react-lightweight-tooltip";
import { TooltipStyles } from "react-lightweight-tooltip";
export default function ToolTip(props: Allow) {
  let tooltipStyles: TooltipStyles = {
    content: {
      backgroundColor: "transparent",
      color: "#000",
    },
    tooltip: {
      backgroundColor: "white",
      borderRadius: "2px",
      boxShadow:"5px 5px 10px rgb(0 0 0 / 10%), -5px -5px 10px rgb(0 0 0 / 10%)",
      textAlign: "center",
      minWidth: "auto",
      fontFamily: "POPPINS",
      fontSize: "12px",
    },
    arrow: {
      borderTop: "solid #f7f7f7 5px",
    },
    wrapper: {
      cursor: "pointer",
    },
    gap: {},
    // gap:""
  };

  return (
    <>
      <Tooltip content={props.tooltipcontent} styles={tooltipStyles}>
      </Tooltip>
        <i className={`${props.iconclass} !text-white bg-ui1 `}></i>
    </>
  );
}
