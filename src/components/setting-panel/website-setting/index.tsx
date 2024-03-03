import React from "react";

import "./website-setting.css";
import { usePageDesignContext } from "@/contexts/page-design";

export default function WebsiteSettings(props: Allow) {
  let pageDesignState = usePageDesignContext();

  return (
    <div className="layoutCreator">
      <div className="outerLayoutHeader websettinghead">
        <div className="layoutCreatorHeader">
          <div className="layoutCreatorTitle">Page Settings</div>
          <div className="layoutCreatorAction">
            <button onClick={props.closeWin}>
              <i className="las la-times"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="webSettingPanel">
        <div className="webSettingInner">
          <div
            className={
              pageDesignState.design?.isPublished
                ? "websiteUnpublish"
                : "websitePublished"
            }
          >
            <span>
              {" "}
              This page is{" "}
              {pageDesignState.design?.isPublished
                ? "Live"
                : "unpublished"}{" "}
            </span>
            <button
              onClick={pageDesignState.publishWebPage}
              className={pageDesignState.design?.isPublished ? "unpublish" : ""}
            >
              {pageDesignState.design?.isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>

          <div className="websiteSettingsPanelInner">
            <hr />
            <h5 className="prevTxt">Tab Preview:</h5>
            <div className="all_prev">
              <div className="tab_prev">
                <img
                  className="tab_bg_tab"
                  src="/assets/images/tabPrev/tabBg.JPG"
                />
                <img
                  className="tab_favico"
                  src={
                    pageDesignState.design &&
                    pageDesignState.design.faviconUri &&
                    pageDesignState.design.faviconUri.length > 0
                      ? pageDesignState.design.faviconUri
                      : "/assets/images/tabPrev/noFav.JPG"
                  }
                />
                <span className="tab_name">
                  {pageDesignState.design?.title}
                </span>
              </div>
            </div>
            <div className="inputWebSet favIcoFlex">
              <h5>Favicon Url</h5>
              <input
                type="text"
                onChange={(e) =>
                  pageDesignState.setDesign({
                    ...pageDesignState.design,
                    faviconUri: e.target.value,
                  })
                }
                value={pageDesignState.design?.faviconUri}
              ></input>
            </div>
            <hr />
            <h5 className="prevTxt">Google Search Preview:</h5>
            <div className="all_prev">
              <div className="googleSearchPrev">
                <span className="googleSearchName">
                  {pageDesignState.design?.title}
                </span>
                <span className="googleSearchDesc">
                  {pageDesignState.design?.description}
                </span>
              </div>
            </div>
            <div className="inputWebSet">
              <h5>Page Name</h5>
              <input
                type="text"
                onChange={(e) =>
                  pageDesignState.setDesign({
                    ...pageDesignState.design,
                    title: e.target.value,
                  })
                }
                value={pageDesignState.design?.title}
              ></input>
            </div>
            <div className="inputWebSet">
              <h5>Page Description</h5>
              <input
                type="text"
                onChange={(e) =>
                  pageDesignState.setDesign({
                    ...pageDesignState.design,
                    description: e.target.value,
                  })
                }
                value={pageDesignState.design?.description}
              ></input>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
