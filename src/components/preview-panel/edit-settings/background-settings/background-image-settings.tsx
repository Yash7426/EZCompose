import React, { useState, useEffect, useRef } from "react";
import { Photo, createClient } from "pexels";
import { set, get } from "lodash";
import "./bgImage.css";
import Link from "next/link";
import { IBackgroundSettings } from "./background-setting";

interface BackgroundImageSettingsProps {
  backgroundSettings: IBackgroundSettings;
  setBackgroundSettings: React.Dispatch<
    React.SetStateAction<IBackgroundSettings>
  >;
  setBgImg: () => void;
}
enum loadType {
  "curated",
  "search",
}
enum panelMode {
  "Online Images",
  "Custom Image",
  "Settings",
}

enum size {
  "auto",
  "cover",
  "contain",
  "custom",
}
enum attchement {
  "fixed",
  "initial",
}
enum positionLeft {
  "left",
  "center",
  "right",
  "custom",
}
enum positionTop {
  "top",
  "center",
  "bottom",
  "custom",
}
type IrepeatOptionsType =
  | "repeat"
  | "repeat-x"
  | "repeat-y"
  | "no-repeat"
  | "space"
  | "round";

type IreturnType =
  | "Loading..."
  | "Popular Images"
  | "Something went wrong!"
  | `Currently showing: ${string}`;
type IimageSearchSetting = {
  q: string;
  cURI: string;
  page: number;
  perPage: number;
  totalResult: number;
  nextURI: number;
  loadType: loadType;
  panelMode: panelMode;
  isLoading: boolean;
  rType: IreturnType;
};

const BackgroundImageSettings: React.FC<BackgroundImageSettingsProps> = (
  props
) => {
  const [imageList, setImageList] = useState<any[]>([]);
  const [imageSearchSetting, setImageSearchSetting] =
    useState<IimageSearchSetting>({
      q: "",
      cURI: "",
      page: 1,
      perPage: 20,
      totalResult: 0,
      nextURI: -1,
      loadType: loadType.curated,
      panelMode: 0,
      isLoading: false,
      rType: "Loading...",
    });

  let loadMoreImages = useRef<HTMLDivElement>(null);

  const loadImages = async (type: loadType) => {
    //reset all settings!
    setImageSearchSetting({
      q: "",
      cURI: "",
      page: 1,
      perPage: 20,
      totalResult: 0,
      nextURI: -1,
      loadType: loadType.curated,
      panelMode: 0,
      isLoading: false,
      rType: "Loading...",
    });

    if (type === loadType.curated) {
      if (!imageSearchSetting.isLoading && loadMoreImages.current) {
        loadMoreImages.current.style.display = "none";
        setImageSearchSetting({
          ...imageSearchSetting,
          isLoading: true,
          rType: "Popular Images",
        });
        //latest uri
        let client;
        if (process.env.NEXT_PUBLIC_PEXELS_API_KEY) {
          client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
        }
        await client?.photos
          .curated({
            per_page: imageSearchSetting.perPage,
            orientation: "landscape",
          })
          .then((photos) => {
            if ("photos" in photos && loadMoreImages.current) {
              setImageList([...photos.photos]);

              if (photos.next_page) {
                loadMoreImages.current.style.display = "block";
              } else {
                loadMoreImages.current.style.display = "none";
              }
              setImageSearchSetting({
                ...imageSearchSetting,
                nextURI: photos.next_page,
                page: photos.page + 1,
                totalResult: photos.photos.length,
                loadType: loadType.curated,
                isLoading: false,
                rType: "Popular Images",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setImageSearchSetting({
              ...imageSearchSetting,
              isLoading: false,
              rType: "Something went wrong!",
            });
            if (loadMoreImages.current)
              loadMoreImages.current.style.display = "none";
          });
      }
    } else {
      //search uri
      if (!imageSearchSetting.isLoading && loadMoreImages.current) {
        loadMoreImages.current.style.display = "none";
        setImageSearchSetting({
          ...imageSearchSetting,
          isLoading: true,
          rType: `Currently showing: ${imageSearchSetting.q}`,
        });
        let client;
        if (process.env.NEXT_PUBLIC_PEXELS_API_KEY)
          client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
        const query = imageSearchSetting.q;

        await client?.photos
          .search({
            query,
            per_page: imageSearchSetting.perPage,
            orientation: "landscape",
          })
          .then((photos) => {
            if ("photos" in photos && loadMoreImages.current) {
              setImageList((prev) => [
                ...prev,
                photos.photos as Partial<Photo>,
              ]);

              if (photos.next_page && loadMoreImages.current) {
                loadMoreImages.current.style.display = "block";
              } else {
                loadMoreImages.current.style.display = "none";
              }
              setImageSearchSetting({
                ...imageSearchSetting,
                nextURI: photos.next_page,
                page: photos.page + 1,
                totalResult: photos.total_results,
                loadType: loadType.search,
                isLoading: false,
                rType: `Currently showing: ${imageSearchSetting.q}`,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setImageSearchSetting({
              ...imageSearchSetting,
              isLoading: false,
              rType: "Something went wrong!",
            });
            if (loadMoreImages.current)
              loadMoreImages.current.style.display = "none";
          });
      }
    }
  };

  useEffect(() => {
    loadImages(loadType.curated);
  }, []);

  const loadMore = async () => {
    if (
      imageSearchSetting.loadType === loadType.curated &&
      loadMoreImages.current
    ) {
      if (!imageSearchSetting.isLoading && loadMoreImages.current) {
        loadMoreImages.current.style.display = "none";
        setImageSearchSetting({
          ...imageSearchSetting,
          isLoading: true,
          rType: "Popular Images",
        });
        //latest uri
        let client;
        if (process.env.NEXT_PUBLIC_PEXELS_API_KEY)
          client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

        await client?.photos
          .curated({
            page: imageSearchSetting.page,
            per_page: imageSearchSetting.perPage,
            orientation: "landscape",
          })
          .then((photos) => {
            if ("photos" in photos) {
              setImageList([...imageList, ...photos.photos]);
              if (photos.next_page && loadMoreImages.current) {
                loadMoreImages.current.style.display = "block";
              } else {
                if (loadMoreImages.current)
                  loadMoreImages.current.style.display = "none";
              }

              setImageSearchSetting({
                ...imageSearchSetting,
                nextURI: photos.next_page,
                page: photos.page + 1,
                totalResult: photos.photos.length,
                loadType: loadType.curated,
                isLoading: false,
                rType: "Popular Images",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setImageSearchSetting({
              ...imageSearchSetting,
              isLoading: false,
              rType: "Something went wrong!",
            });
            if (loadMoreImages.current)
              loadMoreImages.current.style.display = "none";
          });
      }
    } else {
      //search uri
      if (!imageSearchSetting.isLoading && loadMoreImages.current) {
        loadMoreImages.current.style.display = "none";
        setImageSearchSetting({
          ...imageSearchSetting,
          isLoading: true,
          rType: `Currently showing: ${imageSearchSetting.q}`,
        });

        let client;
        if (process.env.NEXT_PUBLIC_PEXELS_API_KEY)
          client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
        const query = imageSearchSetting.q;

        client?.photos
          .search({
            page: imageSearchSetting.page,
            query,
            per_page: imageSearchSetting.perPage,
            orientation: "landscape",
          })
          .then((photos) => {
            if ("photos" in photos && loadMoreImages.current) {
              setImageList((prev) => [...prev, ...photos.photos]);
              if (photos.next_page && loadMoreImages.current) {
                loadMoreImages.current.style.display = "block";
              } else {
                loadMoreImages.current.style.display = "none";
              }
              setImageSearchSetting({
                ...imageSearchSetting,
                nextURI: photos.next_page,
                page: photos.page + 1,
                totalResult: photos.total_results,
                loadType: loadType.search,
                isLoading: false,
                rType: `Currently showing: ${imageSearchSetting.q}`,
              });
            }
          })
          .catch(() => {
            setImageSearchSetting({
              ...imageSearchSetting,
              isLoading: false,
              rType: "Something went wrong!",
            });
            if (loadMoreImages.current)
              loadMoreImages.current.style.display = "none";
          });
      }
    }
  };

  const updateBGPath = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let __iPath = e.currentTarget.getAttribute("data-src");
    props.setBackgroundSettings((prev) => ({
      ...prev,
      backgroundImage: {
        ...props.backgroundSettings.backgroundImage,
        url: __iPath || "",
      },
    }));
    setImageSearchSetting({ ...imageSearchSetting, panelMode: 2 });
  };

  interface SelectProps<
    T extends string | number | readonly string[] | undefined,
  > {
    options: { value: T; label: string; isSelected: boolean }[];
    onSelect: (value: T) => void;
  }

  const repeatOptions: Array<{
    value: IrepeatOptionsType;
    label: string;
    isSelected: boolean;
  }> = [
    {
      value: "repeat",
      label: "Repeat Both",
      isSelected: props.backgroundSettings.backgroundImage.repeat === "repeat",
    },
    {
      value: "repeat-x",
      label: "Horizontal Repeat",
      isSelected:
        props.backgroundSettings.backgroundImage.repeat === "repeat-x",
    },
    {
      value: "repeat-y",
      label: "Vertical Repeat",
      isSelected:
        props.backgroundSettings.backgroundImage.repeat === "repeat-y",
    },
    {
      value: "no-repeat",
      label: "Do not repeat",
      isSelected:
        props.backgroundSettings.backgroundImage.repeat === "no-repeat",
    },
    {
      value: "space",
      label: "Space",
      isSelected: props.backgroundSettings.backgroundImage.repeat === "space",
    },
    {
      value: "round",
      label: "Round",
      isSelected: props.backgroundSettings.backgroundImage.repeat === "round",
    },
  ];

  const PanelOptions = [
    {
      value: 0,
      label: "Online Images",
      isSelected: imageSearchSetting.panelMode === 0,
    },
    {
      value: 1,
      label: "Custom Image",
      isSelected: imageSearchSetting.panelMode === 1,
    },
    {
      value: 2,
      label: "Settings",
      isSelected: imageSearchSetting.panelMode === 2,
    },
  ];

  const backGroundPositions = [
    {
      value: positionLeft.left,
      label: "Left",
      isSelected:
        props.backgroundSettings.backgroundImage.positionLeft ===
        positionLeft.left,
    },
    {
      value: positionLeft.center,
      label: "Center",
      isSelected:
        props.backgroundSettings.backgroundImage.positionLeft ===
        positionLeft.center,
    },
    {
      value: positionLeft.right,
      label: "Right",
      isSelected:
        props.backgroundSettings.backgroundImage.positionLeft ===
        positionLeft.right,
    },
    {
      value: positionLeft.custom,
      label: "Custom",
      isSelected:
        props.backgroundSettings.backgroundImage.positionLeft ===
        positionLeft.custom,
    },
  ];
  const backGroundImageSize = [
    {
      value: size.auto,
      label: "Auto",
      isSelected: props.backgroundSettings.backgroundImage.size === size.auto,
    },
    {
      value: size.cover,
      label: "Cover",
      isSelected: props.backgroundSettings.backgroundImage.size === size.cover,
    },
    {
      value: size.contain,
      label: "Contain",
      isSelected:
        props.backgroundSettings.backgroundImage.size === size.contain,
    },
    {
      value: size.custom,
      label: "Custom",
      isSelected: props.backgroundSettings.backgroundImage.size === size.custom,
    },
  ];
  const BackgroundPositionsVertical = [
    {
      value: positionTop.top,
      label: "Top",
      isSelected:
        props.backgroundSettings.backgroundImage.positionTop ===
        positionTop.top,
    },
    {
      value: positionTop.center,
      label: "Center",
      isSelected:
        props.backgroundSettings.backgroundImage.positionTop ===
        positionTop.center,
    },
    {
      value: positionTop.bottom,
      label: "Bottom",
      isSelected:
        props.backgroundSettings.backgroundImage.positionTop ===
        positionTop.bottom,
    },
    {
      value: positionTop.custom,
      label: "Custom",
      isSelected:
        props.backgroundSettings.backgroundImage.positionTop ===
        positionTop.custom,
    },
  ];
  const BackgroundAttachment = [
    {
      value: attchement.fixed,
      label: "Parallax",
      isSelected:
        props.backgroundSettings.backgroundImage.attchement ===
        attchement.fixed,
    },
    {
      value: attchement.initial,
      label: "No Parallax",
      isSelected:
        props.backgroundSettings.backgroundImage.attchement ===
        attchement.initial,
    },
  ];

  const Select = <T extends string | number | readonly string[] | undefined>({
    options,
    onSelect,
  }: SelectProps<T>) => {
    return (
      <select onChange={(e) => onSelect(e.target.value as T)}>
        {options.map((option, index) => (
          <option key={index} value={option.value} selected={option.isSelected}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };


  return (
    <div className="BgImagePanel !bg-ui1 text-white">
      <div className="bgPanelOption !bg-ui1 text-white">
        <ul>
          {PanelOptions.map((option, index) => (
            <li
              key={index}
              className={`!bg-ui1 text-white ${option.isSelected ? "active" : ""}`}
              onClick={() =>
                setImageSearchSetting({
                  ...imageSearchSetting,
                  panelMode: option.value,
                })
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="bgPanelSec">
        {imageSearchSetting.panelMode === 0 && (
          <div className="pexelSearchImg">
            <div className="bgImageSearchbar">
              <input
                className={"sbarImg"}
                type={"text"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loadImages(loadType.search);
                  }
                }}
                onChange={(e) =>
                  setImageSearchSetting({
                    ...imageSearchSetting,
                    q: e.target.value,
                  })
                }
                placeholder="Search images.."
              ></input>
              <button
                className="ImgSearchAct"
                onClick={() => loadImages(loadType.search)}
              >
                <i className="las la-search"></i>
              </button>
            </div>
            <div className="bgImageSearchTxt">
              <h5>{imageSearchSetting.rType} </h5>
            </div>
            <div className="bgImageResults">
              {imageList.map((e) => {
                return (
                  <div
                    className="BgImageItem"
                    onClick={updateBGPath}
                    key={e.id}
                    style={{
                      backgroundImage: `url(${(e && e.src && e.src.small) ?? ""})`,
                    }}
                    data-src={e.src.large2x}
                  ></div>
                );
              })}
            </div>
            <div
              ref={loadMoreImages}
              style={{ display: "none" }}
              className="show-more-images"
            >
              <button onClick={loadMore}>Load more..</button>
            </div>
            <div className="applySearchBG">
              <Link
                href="https://www.pexels.com"
                target={"_blank"}
                className="pexels_credit"
              >
                <img src="https://images.pexels.com/lib/api/pexels.png" />
              </Link>
              <button onClick={() => props.setBgImg()}>Apply</button>
            </div>
          </div>
        )}
        {imageSearchSetting.panelMode === 1 && (
          <div className="userOwnImg">
            <div className="bgImageCustom">
              <input
                className={"cusImg"}
                type={"text"}
                onChange={(e) =>
                  setImageSearchSetting({
                    ...imageSearchSetting,
                    cURI: e.target.value,
                  })
                }
                placeholder="Your image url"
              ></input>
              {/* const updateBGPath = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                let __iPath = e.currentTarget.getAttribute("data-src");
                props.setBackgroundSettings((prev) => ({
                  ...prev,
                  backgroundImage: {
                    ...props.backgroundSettings.backgroundImage,
                    url: __iPath || "",
                  },
                }));
                setImageSearchSetting({ ...imageSearchSetting, panelMode: 2 });
                }; */}
              <button
                className="imgCusAct"
                onClick={() => {
                  props.setBackgroundSettings((prev) => ({
                    ...prev,
                    backgroundImage: {
                      ...prev.backgroundImage,
                      url: imageSearchSetting.cURI,
                    },
                  }));
                  setImageSearchSetting({
                    ...imageSearchSetting,
                    panelMode: 2,
                  });
                  //   props.setBgImg();
                }}
              >
                {" "}
                Apply
              </button>
            </div>
          </div>
        )}
        {imageSearchSetting.panelMode === 2 && (
          <div className="bgImgSettings">
            <h5>Background Size</h5>
            <div className="imageSettingsOption">
              <Select
                options={backGroundImageSize}
                onSelect={(value) =>
                  props.setBackgroundSettings({
                    ...props.backgroundSettings,
                    backgroundImage: {
                      ...props.backgroundSettings.backgroundImage,
                      size: value,
                    },
                  })
                }
              />

              {props.backgroundSettings.backgroundImage.size ===
                size.custom && (
                <div className="customImgSizes">
                  <div className="colorPalletStrength">
                    <label>Width:</label>
                    <input
                      className="colorPalletOpacityRange"
                      type={"range"}
                      onChange={(e) =>
                        props.setBackgroundSettings({
                          ...props.backgroundSettings,
                          backgroundImage: {
                            ...props.backgroundSettings.backgroundImage,
                            customX: +e.target.value,
                          },
                        })
                      }
                      value={props.backgroundSettings.backgroundImage.customX}
                      max={100}
                      min={0}
                      step="1"
                    />
                    <span className="colorPalletOpacityValue">
                      {props.backgroundSettings.backgroundImage.customX}%
                    </span>
                  </div>
                  <div className="colorPalletStrength">
                    <label>Height:</label>
                    <input
                      className="colorPalletOpacityRange"
                      type={"range"}
                      onChange={(e) =>
                        props.setBackgroundSettings({
                          ...props.backgroundSettings,
                          backgroundImage: {
                            ...props.backgroundSettings.backgroundImage,
                            customY: +e.target.value,
                          },
                        })
                      }
                      value={props.backgroundSettings.backgroundImage.customY}
                      max={100}
                      min={0}
                      step="1"
                    />
                    <span className="colorPalletOpacityValue">
                      {props.backgroundSettings.backgroundImage.customY}%
                    </span>
                  </div>
                </div>
              )}
            </div>
            <h5>Background Parallax</h5>
            <div className="imageSettingsOption">
              <Select
                options={BackgroundAttachment}
                onSelect={(value) =>
                  props.setBackgroundSettings({
                    ...props.backgroundSettings,
                    backgroundImage: {
                      ...props.backgroundSettings.backgroundImage,
                      attchement: value,
                    },
                  })
                }
              />
            </div>
            <h5>Background Position</h5>
            <div className="imageSettingsOption">
              <div className="imagePosSort">
                <div className="ImgHorzPs">
                  <h5>Horizontal</h5>

                  <Select
                    options={backGroundPositions}
                    onSelect={(value) =>
                      props.setBackgroundSettings({
                        ...props.backgroundSettings,
                        backgroundImage: {
                          ...props.backgroundSettings.backgroundImage,
                          positionLeft: value,
                        },
                      })
                    }
                  />

                  {props.backgroundSettings.backgroundImage.positionLeft ===
                    positionLeft.custom && (
                    <div className="customImgSizes">
                      <div className="colorPalletStrength dircol">
                        <input
                          className="colorPalletOpacityRange"
                          type={"range"}
                          onChange={(e) =>
                            props.setBackgroundSettings({
                              ...props.backgroundSettings,
                              backgroundImage: {
                                ...props.backgroundSettings.backgroundImage,
                                posX: Number(e.target.value),
                              },
                            })
                          }
                          value={props.backgroundSettings.backgroundImage.posX}
                          max={100}
                          min={-100}
                          step="1"
                        />
                        <span className="colorPalletOpacityValue">
                          {props.backgroundSettings.backgroundImage.posX}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ImgVertPs">
                  <h5>Vertical</h5>
                  <Select
                    options={BackgroundPositionsVertical}
                    onSelect={(value) =>
                      props.setBackgroundSettings({
                        ...props.backgroundSettings,
                        backgroundImage: {
                          ...props.backgroundSettings.backgroundImage,
                          positionTop: value,
                        },
                      })
                    }
                  />
                  {props.backgroundSettings.backgroundImage.positionTop ===
                    positionTop.custom && (
                    <div className="customImgSizes">
                      <div className="colorPalletStrength dircol">
                        <input
                          className="colorPalletOpacityRange"
                          type={"range"}
                          onChange={(e) =>
                            props.setBackgroundSettings({
                              ...props.backgroundSettings,
                              backgroundImage: {
                                ...props.backgroundSettings.backgroundImage,
                                posY: Number(e.target.value),
                              },
                            })
                          }
                          value={props.backgroundSettings.backgroundImage.posY}
                          max={100}
                          min={-100}
                          step="1"
                        />
                        <span className="colorPalletOpacityValue">
                          {props.backgroundSettings.backgroundImage.posY}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h5>Background Repeat</h5>
            <div className="imageSettingsOption">
              <Select
                options={repeatOptions}
                onSelect={(value) =>
                  props.setBackgroundSettings({
                    ...props.backgroundSettings,
                    backgroundImage: {
                      ...props.backgroundSettings.backgroundImage,
                      repeat: value,
                    },
                  })
                }
              />
            </div>
            <div className="applySearchBG">
              <button onClick={() => props.setBgImg()}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BackgroundImageSettings;
