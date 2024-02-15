"use client"
import React, { useContext, useState } from 'react'
import './manageWebsites.css'
import { useuserDetailsContext } from '@/contexts/user-details'
import UserProjects from '../user-projects'
import CreateNewWebsite from '../../app/components/create-new-website';
const ManageWebsites=()=> {

    const [mPr, setMPr] = useState({
        showNewWebsite: false
    });
    const {userDetails} = useuserDetailsContext();

    return (
        <>
            {/* <Navbar /> */}
            <div className='manage-web-container' >

                <main className='manager_main'>
                    {(mPr.showNewWebsite) && <CreateNewWebsite closeModal={() => setMPr((prev)=>({ ...prev, showNewWebsite: false })) } />}

                    <div className='main_webpage' >
                        <div className='welcome-back-msg'>
                            <div className="row-container flex-row-welcome">

                                <div className='welcomeLeft'>
                                    <h1>Welcome back, {userDetails?.user|| "User"}!</h1>
                                    <p>Select one of your site, you want to edit</p>
                                </div>
                                <button className='newWebsiteBtn' onClick={() => setMPr({ ...mPr, showNewWebsite: true })}>
                                    Create new website
                                </button>
                            </div>
                        </div>
                        <div className='projects_showcase'>
                            <div className="row-container">
                                <div className='light-title-user-project'>My sites</div>
                                <UserProjects createNewWeb={() => setMPr((prev)=>({ ...prev, showNewWebsite: false }))} />
                            </div>
                        </div>
                    </div >
                </main>
            </div >
        </>
    )
}

export default ManageWebsites