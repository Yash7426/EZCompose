import React, { useContext, useState, useEffect } from 'react'
import FontPicker from "font-picker-react";
import './font-manager.css'
import { usePageDesignContext } from '@/contexts/page-design';
import { Variant } from '@samuelmeuli/font-manager';



 enum FontFamily {
    Arial = "Arial",
    TimesNewRoman = "Times New Roman",
    Helvetica = "Helvetica",
    Verdana = "Verdana"
}

 enum Speed {
    Fast = "Fast",
    Medium = "Medium",
    Slow = "Slow",
    None = "-"
}

 enum BackgroundColor {
    Red = "#dc3545",
    Orange = "#fd7e14",
    Green = "#198754",
    Gray = "#adb5bd"
}

 interface FontOption {
    font: string;
    weights?: Variant[] |string[];
}


export default function FontManager(props:Allow) {
    let pageDesignState = usePageDesignContext()

    // let [fontOptions, setFontOptions] = useState({
    //     fonts: pageDesignState.design?.fonts
    // })
    const [fontOptions, setFontOptions] = useState<FontOption[]>(pageDesignState.design?.fonts ?? []);



    const createFontJson = (fontFamily: string, variants: Variant[]): FontOption => {
        const weights: Variant[] = [];
        if (variants.includes("300")) weights.push("300");
        if (variants.includes("regular")) weights.push("regular");
        if (variants.includes("700")) weights.push("700");
        return {
            font: fontFamily,
            weights: weights
        };
    };
 

   const deleteFontOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        const newFonts = [...fontOptions];
        newFonts.splice(index, 1);
        setFontOptions(newFonts);
    };

    const fontSpeed = (): Speed => {
        const length = fontOptions.length;
        if (length > 3) return Speed.Slow;
        if (length > 2) return Speed.Medium;
        if (length > 0) return Speed.Fast;
        return Speed.None;
    };

    const fontSpeedColor = (): BackgroundColor => {
        const length = fontOptions.length;
        if (length > 3) return BackgroundColor.Red;
        if (length > 2) return BackgroundColor.Orange;
        if (length > 0) return BackgroundColor.Green;
        return BackgroundColor.Gray;
    };

    const applyFonts = () => {
        pageDesignState.setDesign({ ...pageDesignState.design, fonts: fontOptions  });
    };

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">

                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Fonts Manager
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
                {
                    process.env.REACT_APP_GOOGLE_API_KEY &&
                <div className='fontSelectorList'>
                    <FontPicker
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        // activeFontFamily={fontOptions.fonts[fontOptions.fonts.length - 1]["font"]}
                        onChange={(nextFont) => {
                            const newFont = createFontJson(nextFont.family, nextFont.variants);
                            if (!fontOptions.some(font => font.font === newFont.font)) {
                                setFontOptions([...fontOptions, newFont]);
                            }
                        }}
                        sort={"popularity"}
                    />
                </div>
                }
            </div>
            <div className='fontSelectorContent'>

                <div className='fontOptionsList'>
                    {
                        fontOptions?.map((e, i) => {
                            return (
                                <div className='fontOption'>
                                    <div className='font_dets'>
                                        <span className='fontName' style={{ fontFamily: e.font }}>{e.font}</span>
                                        <span className='fontWeights'>
                                            {
                                                (e.weights && e.weights.length > 0) && e.weights.join(", ")
                                            }
                                        </span>
                                    </div>
                                    <div className='actionGroup'>
                                        {
                                            (fontOptions && fontOptions.length > 1) && <button className="deleteFont" data-font-index={i} onClick={(e)=>deleteFontOption(e,i)}><i data-font-index={i} className="las la-trash-alt"></i></button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='footerStickyFontManager'>

                    <div className='webpageSpeed'>
                        <span style={{background:fontSpeedColor()}}><i className="las la-tachometer-alt"></i> {fontSpeed()}
                        </span>
                    </div>
                    <div className='applyFonts'>
                        <button onClick={applyFonts}>Save Fonts</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
