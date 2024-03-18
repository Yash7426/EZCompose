import React from 'react'

// import CreateRowsLayout from './createRowsLayout/createRowsLayout';
// import FontManager from './fontManager/fontManager';
// import GoogleAnalytics from './googleAnalytics/googleAnalytics';
// import WebsiteSettings from './websiteSetting/websiteSetting';
// import CreateNewPage from './createNewPage/createNewPage';
import './setting-panel.css';
import { usePageDesignContext } from '@/contexts/page-design';
import CreateRowsLayout from './create-rows-layout';
import FontManager from './font-manager';
import GoogleAnalytics from './google-analytics';
import WebsiteSettings from './website-setting';
import CreateNewPage from './create-new-page';
import { useModalContext } from '@/contexts/modal-context';
const SettingPanel=()=> {

    let pageDesignState = usePageDesignContext()
    const {}=useModalContext()

    const closeSettingPanel = () => {
        pageDesignState.setDesign({ ...pageDesignState.design, settingMode: BigInt(-1) })
    }


    return (
        (pageDesignState.design?.settingMode !== BigInt(-1)) && <div className='settingPanel' >
            <div className='setingPanelMain !bg-ui1' style={(pageDesignState.design?.settingMode === BigInt(0)) ? { maxWidth: "70%" } : { maxWidth: "600px" }}>
                <div className='settingPanelInner'>
                    {
                        /**
                         * case 0
                         */
                        (pageDesignState.design?.settingMode === BigInt(0)) && <CreateRowsLayout closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 1
                         */
                        (pageDesignState.design?.settingMode === BigInt(1)) && <FontManager closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 2
                         */
                        (pageDesignState.design?.settingMode === BigInt(2)) && <GoogleAnalytics closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 3
                         */
                        (pageDesignState.design?.settingMode === BigInt(3)) && <WebsiteSettings closeWin={closeSettingPanel} />
                    }

                    {
                        /**
                         * case 4
                         */
                        (pageDesignState.design?.settingMode === BigInt(4)) && <CreateNewPage closeWin={closeSettingPanel} />
                    }

                    {/* <button onClick={() => pageDesignState.setDesign({ ...pageDesignState.design, settingMode: -1 })}>Close</button> */}
                </div>
            </div>
        </div>
    )
}
export default SettingPanel