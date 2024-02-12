import React, { useContext, useState } from 'react'
import './animationPanel.css'
import { usePageDesignContext } from '@/contexts/page-design';
import { set, get } from "lodash";
type AnimationOption = {
    name: string;
    addon: string;
};

type AnimationItem = {
    itemName: string;
    itemImage: string;
    animationName: string;
    hasDirection: boolean;
    extraOptions: AnimationOption[];
};

type AnimationParameters = {
    animationDuration: number;
    animationDelay: number;
    animationRepeat: number;
    animationName: string;
    subAnimationList: any[]; // You might want to replace 'any' with a specific type if subAnimationList has a consistent structure
    animDirection: string;
};

type AnimationList = AnimationItem[];

export default function AnimationOptionsPanel(props:Allow) {
    let pageDesignState = usePageDesignContext();


    /**
     * List of all the animations we have
     */
    let animationList:AnimationList = [{
        itemName: "None",
        itemImage: "/assets/images/animation/none.png",
        animationName: "",
        hasDirection: true,
        extraOptions: []
    }, {
        itemName: "Bounce",
        itemImage: "/assets/images/animation/bounce.png",
        animationName: "bounce",
        hasDirection: true,
        extraOptions: [
            { name: "Regular", addon: "" },
            { name: "Zoom", addon: "In" },
            { name: "From Top", addon: "InDown" },
            { name: "From Left", addon: "InLeft" },
            { name: "From Right", addon: "InRight" },
            { name: "From Top", addon: "InUp" }
        ]
    },
    {   
        itemName: "Fade",
        itemImage: "/assets/images/animation/fadeIn.png",
        animationName: "fadeIn",
        hasDirection: true,
        extraOptions: [
            { name: "Regular", addon: "" },
            { name: "From Top", addon: "Down" },
            { name: "From Top (More)", addon: "DownBig" },
            { name: "From Left", addon: "Left" },
            { name: "From Left (More)", addon: "LeftBig" },
            { name: "From Right", addon: "Right" },
            { name: "From Right (More)", addon: "RightBig" },
            { name: "From Bottom", addon: "Up" },
            { name: "From Bottom (More)", addon: "UpBig" },
            { name: "From Top Left", addon: "TopLeft" },
            { name: "From Top Right", addon: "TopRight" },
            { name: "From Bottom Left", addon: "BottomLeft" },
            { name: "From Bottom Right", addon: "BottomRight" }
        ]
    },
    {
        itemName: "Flip",
        itemImage: "/assets/images/animation/flip.png",
        animationName: "flip",
        hasDirection: true,
        extraOptions: [
            { name: "Regular", addon: "" },
            { name: "On X Axis", addon: "InX" },
            { name: "on Y Axus", addon: "InY" }
        ]
    },
    {
        itemName: "Rotate",
        itemImage: "/assets/images/animation/rotate.png",
        animationName: "rotateIn",
        hasDirection: true,
        extraOptions: [
            { name: "Regular", addon: "" },
            { name: "Bottom Left Pivot", addon: "DownLeft" },
            { name: "Bottom Right Pivot", addon: "DownRight" },
            { name: "Top Left Pivot", addon: "UpLeft" },
            { name: "Top Right Pivot", addon: "UpRight" }
        ]
    },
    {
        itemName: "LightSpeed",
        itemImage: "/assets/images/animation/lightspeed.png",
        animationName: "lightSpeed",
        hasDirection: false,
        extraOptions: [
            { name: "From Left", addon: "InLeft" },
            { name: "From Right", addon: "InRight" }
        ]
    }, {
        itemName: "Zoom In",
        itemImage: "/assets/images/animation/zoom.png",
        animationName: "zoomIn",
        hasDirection: true,
        extraOptions: [
            { name: "Regular", addon: "" },
            { name: "From Top", addon: "Down" },
            { name: "From Left", addon: "Left" },
            { name: "From Right", addon: "Right" },
            { name: "From Bottom", addon: "Up" }
        ]
    },
    {
        itemName: "Slide",
        itemImage: "/assets/images/animation/slide.png",
        animationName: "slide",
        hasDirection: false,
        extraOptions: [
            { name: "From Top", addon: "InDown" },
            { name: "From Left", addon: "InLeft" },
            { name: "From Right", addon: "InRight" },
            { name: "From Bottom", addon: "InUp" }
        ]
    },
    {
        itemName: "Flash",
        itemImage: "/assets/images/animation/flash.png",
        animationName: "flash",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Pulse",
        itemImage: "/assets/images/animation/pulse.png",
        animationName: "pulse",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Rubber Band",
        itemImage: "/assets/images/animation/rubberBand.png",
        animationName: "rubberBand",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Shake",
        itemImage: "/assets/images/animation/shake.png",
        animationName: "shake",
        hasDirection: false,
        extraOptions: [
            { name: "Horizontal", addon: "X" },
            { name: "Verticle", addon: "Y" }]
    },
    {
        itemName: "Light Shake",
        itemImage: "/assets/images/animation/shake.png",
        animationName: "headShake",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Swing",
        itemImage: "/assets/images/animation/swing.png",
        animationName: "swing",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Tada",
        itemImage: "/assets/images/animation/tada.png",
        animationName: "tada",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Wobble",
        itemImage: "/assets/images/animation/shake.png",
        animationName: "wobble",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Jello",
        itemImage: "/assets/images/animation/jello.png",
        animationName: "jello",
        hasDirection: true,
        extraOptions: []
    },
    {
        itemName: "Heart Beat",
        itemImage: "/assets/images/animation/pulse.png",
        animationName: "heartBeat",
        hasDirection: true,
        extraOptions: []
    }];


    /**
     * Apply animation function
     *  */
    const [animations, setAnmationsList] = useState<AnimationList>(animationList);

    let [panelMode, setPanelMode] = useState(1);

    const [animParam, setAnimParam] = useState<AnimationParameters>({
        animationDuration: 2000,
        animationDelay: 0,
        animationRepeat: 1,
        animationName: "",
        subAnimationList: [],
        animDirection: ""
    });


    // useEffect(() => {

    //     if (animParam.playAnim) elemAnimUpdate();

    // }, [animParam])

    const elemAnimUpdate = () => {
        let animAddon = "";
        if (animParam.animDirection.length > 0) {
            animAddon = animParam.animDirection;
        }
        if (animParam.animationName.length < 1) {
            return;
        }
        // let a1=document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]").style.animationName = animParam.animationName + animAddon;
        let a1=document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement
        a1.style.animationName = animParam.animationName + animAddon;
        let a2=document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]")  as HTMLElement
        a2.style.animationDuration = animParam.animationDuration + "ms";
        (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationDelay = animParam.animationDelay + "ms";
        let itr = (animParam.animationRepeat < 6 && animParam.animationRepeat > 1) ? animParam.animationRepeat : (animParam.animationRepeat == 1) ? 1 : "infinite";
        (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationIterationCount = `${itr}`;
    }



    const applyAnimation = () => {
        let _pageDesign = { ...pageDesignState.design }

        /**
         * get current stylings
         */
        let _elemNode = props.currentlyActive.current;
        _elemNode = _elemNode.split(',');
        let _elemNodeLast = _elemNode[_elemNode.length - 1]

        let animationName = animParam.animationName;
        if (animParam.animDirection.length > 1) {
            animationName += animParam.animDirection;
        }

        let animationRepeat = (animParam.animationRepeat < 6 && animParam.animationRepeat > 1) ? animParam.animationRepeat : (animParam.animationRepeat == 1) ? 1 : "infinite";

        let _animStyles = { animationDuration: animParam.animationDuration + "ms", animationDelay: animParam.animationDelay + "ms", animationIterationCount: animationRepeat, animationName }

        let _el;
        if (_elemNode.length > 0) {
            _el = get(_pageDesign, 'elements[' + _elemNode.join('].elements[') + ']')


            set(_pageDesign, 'elements[' + _elemNode.join('].elements[') + '].styles', { ..._el.styles, ..._animStyles })
        } else {
            _el = get(_pageDesign, 'elements[' + _elemNodeLast + ']')
            set(_pageDesign, 'elements[' + _elemNodeLast + '].styles', { ..._el.styles, ..._animStyles })
        }

        if (animParam.animationName.length > 0) pageDesignState.setDesign(_pageDesign);

        props.closePanel();

    }





    const switchMode = () => {
        if (panelMode)
            setPanelMode(0)
        else {
            setPanelMode(1)
        }
    }

    return (
        <div className='AnimPanel'>
            <div className='animOptions' style={(panelMode) ? {} : { display: "none" }}>
                <h5>Animation type</h5>
                <div className='animItems'>
                    {
                        animations.map((el, idx) => {
                            return (<div className='animItem' key={el.itemName} data-animationname={el.animationName} data-animationnum={idx} onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                //anim name
                                let aniN = String((e.currentTarget.hasAttribute("data-animationname")) ? e.currentTarget.getAttribute("data-animationname") : e.currentTarget.closest("[data-animationname]")?.getAttribute("data-animationname"));

                                let subOptions = Number((e.currentTarget.hasAttribute("data-animationnum")) ? e.currentTarget.getAttribute("data-animationnum") : e.currentTarget.closest("[data-animationnum]")?.getAttribute("data-animationnum")) ;

                                let animDirection = "";
                                if (subOptions && !animations[subOptions].hasDirection) {
                                    animDirection = animations[subOptions].extraOptions[0].addon;
                                }

                                setAnimParam({ ...animParam, animationName: aniN, subAnimationList: animations[subOptions].extraOptions, animDirection });


                                (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationName = aniN + animDirection;
                                (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationDuration = animParam.animationDuration + "ms";
                                (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationDelay = animParam.animationDelay + "ms";
                                //itr 
                                let itr = (animParam.animationRepeat < 6 && animParam.animationRepeat > 1) ? animParam.animationRepeat : (animParam.animationRepeat == 1) ? 1 : "infinite";
                                (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationIterationCount = `${itr}`;

                                // elemAnimUpdate();
                            }
                            }>
                                <div className='anim_img'>
                                    <img src={el.itemImage} />
                                </div>
                                <div className='animName'>{el.itemName}</div>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className='advOptions' draggable="false" style={(!panelMode) ? {} : { display: "none" }}>
                <h5>Advance Options</h5>
                <div className='animItems advanceWidth' draggable="false">

                    <div className='anim_option_elem'>
                        {
                            (animParam.subAnimationList.length > 0) ?
                                <>
                                    <h5>Animation Direction </h5>
                                    <div className='anim_slider_input' data-parentslide>
                                        <select className='subAnimSelector' onChange={(e) => {

                                            setAnimParam({ ...animParam, animDirection: e.target.value });

                                            (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationName = animParam.animationName + e.target.value;
                                            (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationDuration = animParam.animationDuration + "ms";
                                            (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationDelay = animParam.animationDelay + "ms";
                                            //itr 
                                            let itr = (animParam.animationRepeat < 6 && animParam.animationRepeat > 1) ? animParam.animationRepeat : (animParam.animationRepeat == 1) ? 1 : "infinite";
                                            (document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]") as HTMLElement).style.animationIterationCount = `${itr}`;

                                            //elemAnimUpdate();
                                        }}>
                                            {
                                                animParam.subAnimationList.map((e) => {
                                                    return (<option key={e.addon + e.name + animParam.animationName} value={e.addon}>{e.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </>
                                : ""}

                        <h5>Animation Duration </h5>
                        <div className='anim_slider_input' data-parentslide>
                            <input onChange={(e) => {
                                setAnimParam({ ...animParam, animationDuration: Number(e.target.value) })
                                elemAnimUpdate();
                            }} type="range" min="100" max="4000" step="100" value={animParam.animationDuration} className="slider" />
                            <span >{(animParam.animationDuration < 1000) ? animParam.animationDuration + "ms" : (animParam.animationDuration / 1000).toFixed(2) + "s"}</span>
                        </div>
                        <h5>Animation Delay </h5>
                        <div className='anim_slider_input' data-parentslide>
                            <input onChange={(e) => {
                                // animDuration.current = e.target.value
                                // document.querySelector('[data-showduration]').innerHTML = (e.target.value < 1000) ? e.target.value + "ms" : (e.target.value / 1000).toFixed(2) + "s"
                                setAnimParam({ ...animParam, animationDelay: Number( e.target.value )})
                                elemAnimUpdate();
                            }} type="range" min="0" max="4000" step="50" value={animParam.animationDelay} className="slider" />
                            <span >{(animParam.animationDelay < 1000) ? animParam.animationDelay + "ms" : (animParam.animationDelay / 1000).toFixed(2) + "s"}</span>
                        </div>
                        <h5>Loop / Repeat Animation </h5>
                        <div className='anim_slider_input' data-parentslide>
                            <input onChange={(e) => {
                                // animDuration.current = e.target.value
                                // document.querySelector('[data-showduration]').innerHTML = (e.target.value < 1000) ? e.target.value + "ms" : (e.target.value / 1000).toFixed(2) + "s"
                                setAnimParam({ ...animParam, animationRepeat: Number(e.target.value) })
                                elemAnimUpdate();

                            }} type="range" min="1" max="6" value={animParam.animationRepeat} className="slider" />
                            <span >{
                                (animParam.animationRepeat < 6 && animParam.animationRepeat > 1) ?
                                    animParam.animationRepeat + "x"
                                    :
                                    (animParam.animationRepeat == 1) ? "Once" : "∞"

                            }</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='animFooter'>
                <div className='animSettings'>
                    <span className='advance_options' onClick={switchMode}>{(panelMode) ? "Advance Options" : "Animation List"}</span>
                </div>
                <div className="save_aniamtion btn-save-anim" >
                    <span className='apply_options' onClick={applyAnimation}>Apply Animation</span>
                </div>
            </div>
        </div >
    )
}
