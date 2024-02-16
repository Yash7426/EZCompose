import React, { useContext, useState, useEffect } from 'react'
import './google-analytics.css'
import { usePageDesignContext } from '@/contexts/page-design';
export default function GoogleAnalytics(props:Allow) {

    let pageDesignState = usePageDesignContext();

    let [googleAnalyticsId, setGoogleAnalyticsId] = useState<string|undefined>(pageDesignState.design?.analyticsId )

    const saveGoogleAnalytics = () => {
        const Check=googleAnalyticsId?.match("UA-[0-9]{8}-[0-9]{1}");
        if (googleAnalyticsId &&  Check!= null) {
            // May be risk
            pageDesignState.setDesign({ ...pageDesignState.design, analyticsId: Check[0] });
            alert("saved");
        } else {
            alert("Invalid analytics Id.")
        }
    }

    return (
        <div className='layoutCreator'>
            <div className="outerLayoutHeader">
                <div className='layoutCreatorHeader'>
                    <div className='layoutCreatorTitle'>
                        Google Analytics Setting
                    </div>
                    <div className='layoutCreatorAction'>
                        <button onClick={props.closeWin}><i className="las la-times"></i></button>
                    </div>
                </div>
            </div>
            <div className='googleAnalyticsContent'>

                <div className='googleAnalyticsInner'>
                    <h5>Google Analytics ID</h5>
                    <input type="text" pattern="UA-[0-9]{8}-[0-9]{1}" onChange={(e) => setGoogleAnalyticsId(e.target.value)} value={googleAnalyticsId} placeholder="UA-00000000-0" />
                </div>
                <div className='footerStickyFontManager'>

                    <div className='applyFonts'>
                        <button onClick={saveGoogleAnalytics}>Save Setting</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
