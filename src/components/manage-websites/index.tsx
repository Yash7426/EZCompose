"use client"
import React, { useContext, useState } from 'react'
import './manageWebsites.css'
import { useuserDetailsContext } from '@/contexts/user-details'
import UserProjects from '../user-projects'
import CreateNewWebsite from '../create-new-website'
import useStoreUserEffect from '@/app/useStoreUserEffect'
import GeneralDialog from '../dialog'
const ManageWebsites = () => {

    const [mPr, setMPr] = useState({
        showNewWebsite: false
    });
    // const {userDetails} = useuserDetailsContext();
    const user = useStoreUserEffect()

    return (
        <>
            {/* <Navbar /> */}
            <div className='manage-web-container' >

                <main className='manager_main'>
                    {(mPr.showNewWebsite) && <CreateNewWebsite closeModal={() => setMPr((prev)=>({ ...prev, showNewWebsite: false })) } />}
                    {/* <GeneralDialog
                        isOpen={mPr.showNewWebsite}
                        setisOpen={() => setMPr({ ...mPr, showNewWebsite: false })}
                        // onClose={() => setMPr({ ...mPr, showNewWebsite: false })}
                        title="Edit Profile"
                        description="Make changes to your profile here. Click save when you're done."
                        fields={[
                            { id: "name", label: "Name", value: "Pedro Duarte" },
                            { id: "username", label: "Username", value: "@peduarte" }
                        ]}
                        onSubmit={() => {
                            setMPr({ ...mPr, showNewWebsite: false })
                        }}
                    /> */}

                    <div className='main_webpage' >
                        <div className='welcome-back-msg'>
                            <div className="row-container flex-row-welcome">

                                <div className='welcomeLeft'>
                                    <h1>Welcome back, {user?.name || "User"}!</h1>
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
                                <UserProjects createNewWeb={() => setMPr((prev) => ({ ...prev, showNewWebsite: false }))} />
                            </div>
                        </div>
                    </div >
                </main>
            </div >
        </>
    )
}

export default ManageWebsites