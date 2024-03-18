import React, { useState, useContext } from "react";
import { set, get } from "lodash";
import "./html-elements.css";
import { usePageDesignContext } from "@/contexts/page-design";

export default function HtmlElement() {
  const pageDesignState = usePageDesignContext();
  const htmlElems: ILinkElement[] = [
    {
      previmg: "/assets/images/elements/html/paragraph.png",
      elid: "paragraph",
      inHTML: "Type your content here...",
      desc: "Paragraph",
      elementType: "paragraph",
      classList: "",
      attributes: null,
      elemType: "p",
      styles: { color: "#000000" },
      elemEditable: true,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/button.png",
      elid: "linkbutton",
      inHTML: "Type your content here...",
      desc: "Link Button",
      elementType: "linkbutton",
      classList: "",
      attributes: null,
      elemType: "a",
      styles: {
        backgroundColor: "#0d6efd",
        display: "inline-block",
        color: "#ffffff",
        padding: "5px 10px",
        borderRadius: "10px",
        boxShadow: "3px 3px 5px rgba(0,0,0,.1), -3px -3px 5px rgba(0,0,0,.1)",
      },
      elemEditable: true,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/headingTag.png",
      elid: "headers",
      inHTML: "Header element",
      desc: "Heading Tag",
      attributes: null,
      elementType: "Headings",
      classList: "",
      styles: { color: "#000000" },
      elemType: "h1",
      elemEditable: true,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/image.png",
      elid: "image",
      inHTML: "",
      desc: "Image",
      attributes: {
        src: "/assets/images/elements/html/dummyImage.jpg",
        width: "500px",
        height: "auto",
        alt: "Demo Preview Image",
      },
      elementType: "Image",
      classList: "",
      styles: {},
      elemType: "img",
      elemEditable: false,
      enableDropping: false,
      elements: [],
    },
    {
      previmg: "/assets/images/elements/html/nav.png",
      elid: "navMenu",
      inHTML: "",
      desc: "Navigation Menu",
      attributes: { ["data-navigation-menu"]: "true" },
      elementType: "Navigation",
      classList: "",
      styles: { position: "relative" },
      elemType: "nav",
      elemEditable: false,
      enableDropping: false,
      elements: [
        {
          previmg: "/assets/images/elements/layouts/2col.png",
          elid: "navListedItem",
          inHTML: "",
          desc: "navListedItem",
          attributes: null,
          elementType: "navListedItem",
          classList: "",
          styles: { padding: "5px" },
          elemType: "ul",
          elemEditable: false,
          enableDropping: true,
          elements: [
            {
              previmg: "/assets/images/elements/layouts/2col.png",
              elid: "NavLinkItem",
              inHTML: "",
              desc: "NavLinkItem",
              attributes: null,
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
                  inHTML: "Link Item",
                  desc: "NavInnerLinkItem",
                  attributes: { href: "#", target: "_blank" },
                  elementType: "NavInnerLinkItem",
                  classList: "",
                  linktype: "url",
                  styles: {
                    color: "#000000",
                    padding: "5px",
                    textDecoration: "none",
                  },
                  elemType: "a",
                  elemEditable: false,
                  enableDropping: false,
                  elements: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      previmg: "/assets/images/elements/html/list.png",
      elid: "ullistedItem",
      inHTML: "",
      desc: "List",
      attributes: null,
      elementType: "List",
      classList: "",
      styles: { color: "#000000", padding: "5px" },
      elemType: "ul",
      elemEditable: false,
      enableDropping: true,
      elements: [
        {
          previmg: "/assets/images/elements/layouts/2col.png",
          elid: "listItem",
          inHTML: "List item",
          desc: "List Item",
          attributes: null,
          elementType: "ListItem",
          classList: "",
          styles: { color: "#000000" },
          elemType: "li",
          elemEditable: true,
          enableDropping: false,
          elements: [],
        },
      ],
    },
    {
      previmg: "/assets/images/elements/html/iframe.png",
      elid: "iframe",
      inHTML: "",
      desc: "Inline Frame",
      attributes: {
        src: "https://example.com",
        width: "100%",
        height: "300px",
        allowtransparency: "true",
      },
      elementType: "Iframe",
      classList: "",
      styles: { padding: "5px" },
      elemType: "iframe",
      elemEditable: false,
      enableDropping: false,
      elements: [],
    },
  ];

  const [htmlElem, setHtmlElem] = useState(htmlElems);

  const AddSubElement = (elNode: Allow, index: number) => {
    //lets deal with the sub elems!
    elNode = elNode.substr(0, [elNode.length - 1]).split(",");
    let _depth = { ...pageDesignState.design };
    let tempOpt = [...htmlElem];
    // for (let i = 0; i < elNode.length; i++) {
    //     subDepth = { ...subDepth.elements[elNode[i]] }
    // }

    // let parentNode = [...elNode];
    // parentNode = parentNode.slice(0, -1);

    // let _parent_el = get(_depth, 'elements[' + parentNode.join('].elements[') + '].elements')
    let _earlier_options = get(
      _depth,
      "elements[" + elNode.join("].elements[") + "]"
    );

    if (!_earlier_options.enableDropping) {
      //remove the last elem might help
      elNode = elNode.slice(0, -1);
      if (elNode.length > 0) {
        _earlier_options = get(
          _depth,
          "elements[" + elNode.join("].elements[") + "].elements"
        );
        _depth = set(
          _depth,
          "elements[" + elNode.join("].elements[") + "].elements",
          [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]
        );
      } else {
        _earlier_options = get(_depth, "elements");
        _depth = set(_depth, "elements", [
          ..._earlier_options,
          JSON.parse(JSON.stringify(tempOpt[index])),
        ]);
      }
    } else {
      _earlier_options = _earlier_options.elements;
      _depth = set(
        _depth,
        "elements[" + elNode.join("].elements[") + "].elements",
        [..._earlier_options, JSON.parse(JSON.stringify(tempOpt[index]))]
      );
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
  };

  const AddDroppedElement = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    //lets get new context
    // let pageDesignStateNew = useContext(pageDesignContext)
    if (
      pageDesignState.design?.isDropEnabled &&
      pageDesignState.design.elements
    ) {
      //reset the insert position
      if (pageDesignState.nodeLevel.current === null) {
        let _elems = [];
        let tempOptions = [];
        tempOptions = [...htmlElem];
        _elems = [...pageDesignState.design.elements];

        //insert at index

        if (pageDesignState.dropPosition.current) {
          let __attr2 = e.currentTarget
            .closest(".item_drag")
            ?.getAttribute("data-elementindex");
          if (__attr2) {
            _elems.splice(
              pageDesignState.dropPosition.current,
              0,
              JSON.parse(JSON.stringify(tempOptions[+__attr2]))
            );
          }
        }
        pageDesignState.setDesign({
          ...pageDesignState.design,
          elements: _elems,
        });
        pageDesignState.dropPosition.current = null;
      } else {
        if (pageDesignState.nodeLevel.current) {
          let __attr = e.currentTarget
            .closest(".item_drag")
            ?.getAttribute("data-elementindex");
          if (__attr) AddSubElement(pageDesignState.nodeLevel.current, +__attr);

          pageDesignState.nodeLevel.current = null;
        }
      }
    }
  };

  return htmlElem.length > 0 ? (
    <div className="htmlElemGrid">
      {htmlElem.map((e, i) => {
        return (
          <div
            data-elementindex={i}
            className="item_drag half"
            key={e.elid}
            onDoubleClick={AddDroppedElement}
            onDragEnd={AddDroppedElement}
          >
            <img className="item_drag_img" src={e.previmg} />
            <p className="item_drag_desc text-slate-300">{e.desc}</p>
          </div>
        );
      })}
    </div>
  ) : (
    ""
  );
}
