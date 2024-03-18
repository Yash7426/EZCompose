import React, { useEffect, useState, useContext } from 'react'
import { set, get } from "lodash";
import './backgroundSetting.css'
import BackgroundImageSettings from './background-image-settings';
import { usePageDesignContext } from '@/contexts/page-design';

type GradientSettings ={
    repeating: boolean;
    angle?: number;
    shape?: string;
}

export type IBackgroundSettings = {
    backgroundMode: number,
    solidColor: {
        color: string,
        opacity: number
    },
    gradientColor: {
        type: string,
        tab: number,
        linearSettings:GradientSettings,
        radialSettings:GradientSettings,
        conicSettings:GradientSettings,
        colors: {
            color: string,
            opacity: number,
            strength: number
        }[]
    },
    backgroundImage:Ibackground
}
export default function BackgroundSetting(props: { currentlyActive: any, closePanel: any }) {

    let pageDesignState = usePageDesignContext();


    const [backgroundSettings, setBackgroundSettings] = useState<IBackgroundSettings>({
        backgroundMode: 0,
        solidColor: {
            color: "#ffffff",
            opacity: 0
        },
        gradientColor: {
            type: "linear",
            tab: 1,
            linearSettings: {
                repeating: false,
                angle: 0
            },
            radialSettings: {
                repeating: false,
                shape: ""
            },
            conicSettings: {
                repeating: false,
                angle: 0
            },
            colors: [
                { color: '#fa709a', opacity: 100, strength: 0 },
                { color: '#fee140', opacity: 100, strength: 100 }
            ]
        },
        backgroundImage: {
            url: "",
            repeat: "repeat",
            size: "cover",
            attchement: "initial",
            customX: 100,
            customY: 100,
            posX: 0,
            posY: 0,
            positionLeft: "center",
            positionTop: "center"
        }
    })

    useEffect(() => {
        if (backgroundSettings.backgroundMode === 1) prevGradBg();
    }, [backgroundSettings.gradientColor, backgroundSettings.backgroundMode]);

    useEffect(() => {

        if (backgroundSettings.backgroundMode === 0) prevSolidColor();

    }, [backgroundSettings.solidColor, backgroundSettings.backgroundMode])

    useEffect(() => {
        if (backgroundSettings.backgroundMode === 2) prevImgBg();
    }, [backgroundSettings.backgroundImage, backgroundSettings.backgroundMode])




    const setNodeData = (elString:string, level:number, data:Allow) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState?.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);

        //close panel

    }

    const getNodeData = (elString:string, level:number) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }

    const hexToRgb = (hex:string) => {
        let _hex = hex.replace("#", "");
        let bigint = parseInt(_hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        return { r, g, b };
    }

    const addColorPallet = () => {

        setBackgroundSettings(
            {
                ...backgroundSettings,
                gradientColor: {
                    ...backgroundSettings.gradientColor,
                    colors: [
                        ...backgroundSettings.gradientColor.colors,
                        { color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), opacity: 100, strength: 100 }
                    ]
                }
            }
        )
    }

    const prevSolidColor = () => {
        //let currentNode = props.currentlyActive.current;
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement;
        if (node) {

            let solidColor = hexToRgb(backgroundSettings.solidColor.color)
            node.style.backgroundColor = `rgba(${solidColor.r},${solidColor.g}, ${solidColor.b}, ${(backgroundSettings.solidColor.opacity / 100)})`
            node.style.backgroundImage = "none"
        }

    }

    const prevImgBg = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
        let __bgSize = backgroundSettings.backgroundImage.size;
        let __bgPosition = [backgroundSettings.backgroundImage.positionLeft, backgroundSettings.backgroundImage.positionTop];
        let __bgRepeat = backgroundSettings.backgroundImage.repeat;

        if (__bgPosition[0] === "custom") __bgPosition[0] = backgroundSettings.backgroundImage.posX + "%";
        if (__bgPosition[1] === "custom") __bgPosition[1] = backgroundSettings.backgroundImage.posY + "%";

        if (__bgSize === "custom") {
            __bgSize = backgroundSettings.backgroundImage.customX + "% " + backgroundSettings.backgroundImage.customY + "%"
        }
if(node){
        node.style.backgroundColor = "initial";
        node.style.backgroundImage = "none";
        node.style.backgroundSize = __bgSize;
        node.style.backgroundPosition = __bgPosition.join(" ");
        node.style.backgroundRepeat = __bgRepeat;
        node.style.backgroundAttachment = backgroundSettings.backgroundImage.attchement;
}
    
    }


    useEffect(()=>{},[backgroundSettings])

  
    const setBGImg=()=>{
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };

        let __bgSize = backgroundSettings.backgroundImage.size;
        let __bgPosition = [backgroundSettings.backgroundImage.positionLeft, backgroundSettings.backgroundImage.positionTop];
        let __bgRepeat = backgroundSettings.backgroundImage.repeat;

        if (__bgPosition[0] === "custom") __bgPosition[0] = backgroundSettings.backgroundImage.posX + "%";
        if (__bgPosition[1] === "custom") __bgPosition[1] = backgroundSettings.backgroundImage.posY + "%";

        if (__bgSize === "custom") {
            __bgSize = backgroundSettings.backgroundImage.customX + "% " + backgroundSettings.backgroundImage.customY + "%"
        }
        let __apply_bg = {
            backgroundImage: `url("${backgroundSettings.backgroundImage.url}")`,
            backgroundSize: __bgSize,
            backgroundPosition: __bgPosition.join(" "),
            backgroundRepeat: __bgRepeat,
            backgroundAttachment: backgroundSettings.backgroundImage.attchement
        }

        //remove background image from it aswell

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();
    }



    const setSolidColor = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };


        let solidColor = hexToRgb(backgroundSettings.solidColor.color)
        let __apply_bg = {
            backgroundColor: `rgba(${solidColor.r},${solidColor.g}, ${solidColor.b}, ${(backgroundSettings.solidColor.opacity / 100)})`, backgroundImage: "none",
            backgroundSize: "initial",
            backgroundPosition: "initial",
            backgroundRepeat: "initial"
        }

        //remove background image from it aswell

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();


    }


    const chGradProp = (e: React.ChangeEvent<HTMLInputElement>, idx:number) => {
        let __gradCols = [...backgroundSettings.gradientColor.colors];
        const __attr=e.target.getAttribute("data-color-index")
        const __attr2=e.target.closest("[data-color-index]")?.getAttribute("data-color-index");
        let __ePropIndex ;
        if(__attr){
            __ePropIndex= parseInt(__attr);
            switch (idx) {
                case 0:
                    __gradCols[__ePropIndex].color = e.target.value;
                    break;
                case 1:
                    __gradCols[__ePropIndex].opacity = +e.target.value;
                    break;
                case 2:
                    __gradCols[__ePropIndex].strength = +e.target.value;
                    break;
            }
        }
        else if(__attr2){
            __ePropIndex= parseInt(__attr2);
            switch (idx) {
                case 0:
                    __gradCols[__ePropIndex].color = e.target.value;
                    break;
                case 1:
                    __gradCols[__ePropIndex].opacity = +e.target.value;
                    break;
                case 2:
                    __gradCols[__ePropIndex].strength = +e.target.value;
                    break;
            }
        }
        setBackgroundSettings({ ...backgroundSettings, gradientColor: { ...backgroundSettings.gradientColor, colors: __gradCols } });
    }

    const genGradBg = () => {
        //calculate percental distrubution
        let __gradCols = [...backgroundSettings.gradientColor.colors];

        let __totalstrength = 0;
        for (let e of __gradCols) {
            __totalstrength += +e.strength;
        }

        //generate string
        let __colorString = [];

        let lastStage = 0;
        for (let e of __gradCols) {
            let solidColor = hexToRgb(e.color)
            __colorString.push(`rgba(${solidColor.r},${solidColor.g}, ${solidColor.b}, ${(e.opacity / 100)}) ${lastStage + (e.strength / __totalstrength) * 100}%`);
            lastStage = lastStage + (e.strength / __totalstrength) * 100;
        }




        if (backgroundSettings.gradientColor.type === "linear") {
            let __gradRepeat = "";
            let __gradAngle = backgroundSettings.gradientColor.linearSettings.angle + "deg,";
            if (backgroundSettings.gradientColor.linearSettings.repeating) {
                __gradRepeat += "repeating-";
            }
            return `${__gradRepeat}linear-gradient(${__gradAngle}${__colorString.join(",")})`;
        }
        if (backgroundSettings.gradientColor.type === "radial") {
            let __gradRepeat = "";
            let __gradShape = backgroundSettings.gradientColor.radialSettings.shape
            if (backgroundSettings.gradientColor.radialSettings.repeating) {
                __gradRepeat += "repeating-";
            }
            return `${__gradRepeat}radial-gradient(${__gradShape}${__colorString.join(",")})`;
        }
        if (backgroundSettings.gradientColor.type === "conic") {
            let __gradRepeat = "";
            let __gradAngle = backgroundSettings.gradientColor.conicSettings.angle + "deg,";
            if (backgroundSettings.gradientColor.conicSettings.repeating) {
                __gradRepeat += "repeating-";
            }
            return `${__gradRepeat}conic-gradient(from ${__gradAngle}${__colorString.join(",")})`;
        }

    }

    const prevGradBg = () => {
        let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement|null;
        let _prev_grad = genGradBg();

        let solidColor = hexToRgb(backgroundSettings.gradientColor.colors[0].color)

        if(node){

            node.style.backgroundColor = `rgba(${solidColor.r},${solidColor.g}, ${solidColor.b}, ${(backgroundSettings.gradientColor.colors[0].opacity / 100)})`;
            if (backgroundSettings.gradientColor.colors.length > 1) {
                node.style.backgroundImage = _prev_grad ??"none";
            } else {
                node.style.backgroundImage = "none";
            }

        }

    }

    const setGradColor = () => {
        let currentNode = props.currentlyActive.current;
        let __current_elem = getNodeData(currentNode, 0)

        let __style_prop = { ...__current_elem.styles };


        let solidColor = hexToRgb(backgroundSettings.gradientColor.colors[0].color)
        let bgString = `rgba(${solidColor.r},${solidColor.g}, ${solidColor.b}, ${(backgroundSettings.gradientColor.colors[0].opacity / 100)})`;
        let __apply_bg;
        if (backgroundSettings.gradientColor.colors.length > 1) {
            __apply_bg = {
                backgroundImage: genGradBg(), backgroundColor: bgString,
                backgroundSize: "initial",
                backgroundPosition: "initial",
                backgroundRepeat: "initial"
            }
        } else {
            __apply_bg = {
                backgroundImage: "none", backgroundColor: bgString,
                backgroundSize: "initial",
                backgroundPosition: "initial",
                backgroundRepeat: "initial"
            }
        }


        //remove background image from it aswell

        __style_prop = { ...__style_prop, ...__apply_bg };

        __current_elem.styles = __style_prop;

        setNodeData(currentNode, 0, __current_elem);

        //close panel
        props.closePanel();


    }


    const removeGradColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let __gradCols = [...backgroundSettings.gradientColor.colors];
        const u=e.currentTarget.getAttribute("data-color-index")
        const v=e.currentTarget.closest("[data-color-index]")?.getAttribute("data-color-index")
      
        let __rIndex;
        if(u){
            __rIndex = +u;
        }else if(v){
            __rIndex = +v;
        }
      if(__rIndex!==undefined)  {
        __gradCols.splice(__rIndex, 1)
        setBackgroundSettings({ ...backgroundSettings, gradientColor: { ...backgroundSettings.gradientColor, colors: __gradCols } })
    };

        prevGradBg();

    }


    return (
        <div className='backgroundSettings !bg-ui1 !text-white'>
            <div className='backgroundHeader !bg-ui1 !text-white'>
                <ul className="!bg-ui1 !text-white">
                    <li className={((backgroundSettings.backgroundMode === 0)) ? "active" : ""} onClick={() => setBackgroundSettings({ ...backgroundSettings, backgroundMode: 0 })}>Solid Color</li>
                    <li className={((backgroundSettings.backgroundMode === 1)) ? "active" : ""} onClick={() => setBackgroundSettings({ ...backgroundSettings, backgroundMode: 1 })}>Gradient</li>
                    <li className={((backgroundSettings.backgroundMode === 2)) ? "active" : ""} onClick={() => setBackgroundSettings({ ...backgroundSettings, backgroundMode: 2 })}>Image</li>
                </ul>
                {((backgroundSettings.backgroundMode === 1)) && <div className='colorGradPans !text-white !bg-ui1'>
                    <ul >
                        <li className={`${(backgroundSettings.gradientColor.tab === 1) ? "active" : "" } text-white !bg-ui1 `} onClick={() => setBackgroundSettings({
                            ...backgroundSettings,
                            gradientColor: {
                                ...backgroundSettings.gradientColor,
                                tab: 1
                            }
                        })}>Colors</li>
                        <li className={`${(backgroundSettings.gradientColor.tab === 0) ? "active" : ""} text-white !bg-ui1`} onClick={() => setBackgroundSettings({
                            ...backgroundSettings,
                            gradientColor: {
                                ...backgroundSettings.gradientColor,
                                tab: 0
                            }
                        })}>Settings</li>
                    </ul>
                </div>}
            </div>
            <div className='backgroundContent'>

                {
                    /**
                     * Solid Color
                     */
                    (backgroundSettings.backgroundMode === 0) &&
                    <>
                        <div className='backgroundSetInner !bg-ui1 !text-white'>
                            <div className='bgSetPanelInner !bg-ui1 !text-white'>
                                <div className='bgSetPanelOption !bg-ui1 !text-white'>
                                    <h5>Select Color</h5>
                                    <div className="coloroption !bg-ui1 !text-white">
                                        <input
                                            className='colorPallet !bg-ui1 !text-white'
                                            type={"color"}
                                            onChange={(e) => { setBackgroundSettings({ ...backgroundSettings, solidColor: { ...backgroundSettings.solidColor, color: e.target.value } }) }}
                                            value={backgroundSettings.solidColor.color} />
                                        <div className='colorPalletOpacity !bg-ui1 !text-white'>

                                            <input className='colorPalletOpacityRange !bg-ui2 !text-white' type={"range"} onChange={(e) => { setBackgroundSettings({ ...backgroundSettings, solidColor: { ...backgroundSettings.solidColor, opacity: +e.target.value } }) }} value={backgroundSettings.solidColor.opacity} max={100} min={0} step="1" />
                                            <span className='colorPalletOpacityValue !bg-ui1 !text-white'>{backgroundSettings.solidColor.opacity}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bgSetPanelAction !bg-ui1 !text-white'>
                                <button onClick={setSolidColor} className='!bg-ui2 !text-white'>Apply</button>
                            </div>
                        </div>
                    </>
                }

                {
                    /**
                     * Gradient
                     */
                    (backgroundSettings.backgroundMode === 1) &&
                    <>
                        <div className='backgroundSetInner !bg-ui1 !text-white'>
                            <div className='bgSetPanelInner !bg-ui1 !text-white'>
                                <div className='bgSetPanelOption !bg-ui1 !text-white'>

                                    {
                                        (backgroundSettings.gradientColor.tab === 0) &&
                                        <div className="colorSetting !bg-ui1 !text-white">
                                            <h5>Gradient Type</h5>
                                            <div className='coloroption !bg-ui1 !text-white'>
                                                <select className="!bg-ui1 !text-white" onChange={(e) => setBackgroundSettings({ ...backgroundSettings, gradientColor: { ...backgroundSettings.gradientColor, type: e.target.value } })}>
                                                    <option value={"linear"}>Linear Gradient</option>
                                                    <option value={"radial"}>Radial Gradient</option>
                                                    <option value={"conic"}>Conic Gradient</option>
                                                </select>
                                            </div>
                                            {
                                                /**
                                                 * Linear Gradient Settings
                                                 */
                                                (backgroundSettings.gradientColor.type === "linear") && <>
                                                    <h5 className="!bg-ui1 !text-white">Repeat Gradient</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <select
                                                            onChange={(e) => setBackgroundSettings({
                                                                ...backgroundSettings,
                                                                gradientColor: {
                                                                    ...backgroundSettings.gradientColor,
                                                                    linearSettings: {
                                                                        ...backgroundSettings.gradientColor.linearSettings,
                                                                        repeating: (e.target.value === "1") ? true : false
                                                                    }
                                                                }
                                                            })}>
                                                            <option value={0} className='!bg-ui1 !text-white'>Do not repeat gradient</option>
                                                            <option value={1} className='!bg-ui1 !text-white'>Repeat gradient</option>
                                                        </select>
                                                    </div>
                                                    <h5 className='!bg-ui1 !text-white'>Gradient Angle</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <div className='colorPalletOpacity !bg-ui1 !text-white'>
                                                            <input className='colorPalletOpacityRange !bg-ui1 !text-white' type={"range"}
                                                                onChange={(e) => setBackgroundSettings({
                                                                    ...backgroundSettings,
                                                                    gradientColor: {
                                                                        ...backgroundSettings.gradientColor,
                                                                        linearSettings: {
                                                                            ...backgroundSettings.gradientColor.linearSettings,
                                                                            angle: +e.target.value
                                                                        }
                                                                    }
                                                                })}
                                                                value={backgroundSettings.gradientColor.linearSettings.angle} max={360} min={-360} step="1" />
                                                            <span className='colorPalletOpacityValue !bg-ui1 !text-white'>{backgroundSettings.gradientColor.linearSettings.angle}°</span>
                                                        </div>
                                                    </div>
                                                </>}

                                            {
                                                /**
                                                 * Radial Gradient Settings
                                                 */
                                                (backgroundSettings.gradientColor.type === "radial") && <>
                                                    <h5 className='!bg-ui1 !text-white'>Repeat Gradient</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <select
                                                            className='!bg-ui1 !text-white'
                                                            onChange={(e) => setBackgroundSettings({
                                                                ...backgroundSettings,
                                                                gradientColor: {
                                                                    ...backgroundSettings.gradientColor,
                                                                    radialSettings: {
                                                                        ...backgroundSettings.gradientColor.radialSettings,
                                                                        repeating: (e.target.value === "1") ? true : false
                                                                    }
                                                                }
                                                            })}>
                                                            <option value={0} className='!bg-ui1 !text-white'>Do not repeat gradient</option>
                                                            <option value={1} className='!bg-ui1 !text-white'>Repeat gradient</option>
                                                        </select>
                                                    </div>
                                                    <h5 className='!bg-ui1 !text-white'>Radial Shape</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <select
                                                            onChange={(e) => setBackgroundSettings({
                                                                ...backgroundSettings,
                                                                gradientColor: {
                                                                    ...backgroundSettings.gradientColor,
                                                                    radialSettings: {
                                                                        ...backgroundSettings.gradientColor.radialSettings,
                                                                        shape: e.target.value
                                                                    }
                                                                }
                                                            })}>
                                                            <option className='!bg-ui1 !text-white' value={""}>Ellipse (Default)</option>
                                                            <option className='!bg-ui1 !text-white' value={"circle,"}>Circle</option>
                                                        </select>
                                                    </div>
                                                </>
                                            }

                                            {
                                                /**
                                                 * Conic Gradient Settings
                                                 */
                                                (backgroundSettings.gradientColor.type === "conic") && <>
                                                    <h5 className='!bg-ui1 !text-white'>Repeat Gradient</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <select
                                                            onChange={(e) => setBackgroundSettings({
                                                                ...backgroundSettings,
                                                                gradientColor: {
                                                                    ...backgroundSettings.gradientColor,
                                                                    conicSettings: {
                                                                        ...backgroundSettings.gradientColor.conicSettings,
                                                                        repeating: (e.target.value === "1") ? true : false
                                                                    }
                                                                }
                                                            })}>
                                                            <option value={0} className="!bg-ui1 !text-white">Do not repeat gradient</option>
                                                            <option value={1} className="!bg-ui1 !text-white">Repeat gradient</option>
                                                        </select>
                                                    </div>
                                                    <h5 className="!bg-ui1 !text-white">Start Angle</h5>
                                                    <div className='coloroption !bg-ui1 !text-white'>
                                                        <div className='colorPalletOpacity !bg-ui1 !text-white'>
                                                            <input className='colorPalletOpacityRange !bg-ui1 !text-white' type={"range"}
                                                                onChange={(e) => setBackgroundSettings({
                                                                    ...backgroundSettings,
                                                                    gradientColor: {
                                                                        ...backgroundSettings.gradientColor,
                                                                        conicSettings: {
                                                                            ...backgroundSettings.gradientColor.conicSettings,
                                                                            angle: +e.target.value
                                                                        }
                                                                    }
                                                                })}
                                                                value={backgroundSettings.gradientColor.conicSettings.angle} max={360} min={-360} step="1" />
                                                            <span className='colorPalletOpacityValue !bg-ui1 !text-white'>{backgroundSettings.gradientColor.conicSettings.angle}°</span>
                                                        </div>
                                                    </div>
                                                </>}
                                        </div>}
                                    {(backgroundSettings.gradientColor.tab === 1) && <div className="colorPallet !bg-ui1 !text-white">
                                        <div className="gradientColors !bg-ui1 !text-white">

                                            {backgroundSettings.gradientColor.colors.map((e, i) => {

                                                return (<div className="coloroption !bg-ui1 !text-white" key={i} data-color-index={i}>
                                                    <input
                                                        className='colorPallet !bg-ui1 !text-white'
                                                        type={"color"}
                                                        value={e.color} data-color-index={i} onChange={(e) => chGradProp(e, 0)} />
                                                    <div className='colorRangeGroup !bg-ui1 !text-white'>
                                                        <div className='colorPalletOpacity !bg-ui1 !text-white'>
                                                            <label>Opacity:</label>
                                                            <input className='colorPalletOpacityRange !bg-ui1 !text-white' type={"range"} onChange={(e) => chGradProp(e, 1)}
                                                                value={e.opacity} max={100} min={0} step="1" data-color-index={i} />
                                                            <span className='colorPalletOpacityValue !bg-ui1 !text-white'>{e.opacity}%</span>
                                                        </div>
                                                        <div className='colorPalletStrength !bg-ui1 !text-white'>
                                                            <label>Stretch:</label>
                                                            <input className='colorPalletOpacityRange !bg-ui1 !text-white' type={"range"} onChange={(e) => chGradProp(e, 2)}
                                                                value={e.strength} max={100} min={0} step="1" data-color-index={i} />
                                                            <span className='colorPalletOpacityValue !bg-ui1 !text-white'>{e.strength}%</span>
                                                        </div>
                                                    </div>
                                                    {(backgroundSettings.gradientColor.colors.length > 1) ? <div className='removeColor' onClick={removeGradColor} data-color-index={i}><i className="las la-trash-alt"></i></div> : ""}
                                                </div>)
                                            })}
                                            <div className='colorOptionAdd !bg-ui1 !text-white' onClick={addColorPallet}><i className="las la-plus-circle"></i> Add color</div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className='bgSetPanelAction !bg-ui1 !text-white'>
                                <button onClick={setGradColor}>Apply</button>
                            </div>
                        </div>
                    </>
                }

                {
                    /**
                     * Image background
                     */
                    (backgroundSettings.backgroundMode === 2) &&
                    <>
                        <BackgroundImageSettings setBgImg={setBGImg} setBackgroundSettings={setBackgroundSettings} backgroundSettings={backgroundSettings} />
                    </>
                }
            </div>
        </div>
    )
}
