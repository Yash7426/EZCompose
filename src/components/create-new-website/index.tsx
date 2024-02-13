import React, { useState, useContext } from 'react'
import axios from 'axios'
import './new-website-modal.css';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/user-context';
import { useToken } from '@/hooks/use-token';
import { useuserDetailsContext } from '@/contexts/user-details';
import { CgWebsite } from "react-icons/cg";

type CreateNewWebsitetype={
    closeModal: () => void
}
const CreateNewWebsite:React.FC<CreateNewWebsitetype>=({closeModal })=> {

    const router=useRouter()
    const {user} = useUserContext();
    const token = useToken();
    let UserDetailsState = useuserDetailsContext();


    let [newWebSetting, setNewWebSetting] = useState({
        webName: "My Website"
    })


    const createNewWebsite = async () => {
        try {
            if (newWebSetting.webName.length < 1) {
                alert("Website name can not be blank")
                return;
            }
            let __webName = newWebSetting.webName;

            //remove special chars
            __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

            await axios.put(`/api/create-website/${user?.id}`, {
                websiteName: __webName,
                pages: []
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {

                UserDetailsState.setEditorState((prev)=>({ ...prev, websiteId: response.data.webId, pageId: response.data.pageId }))

                closeModal();

                //in future directly take the user to the editor
                router.push(`/designer/${response.data.webId}/${response.data.pageId}/`)

            }).catch(err => {

                alert("Unable to create a website");
            })


        } catch (err) {

        }
    }

    return (
        <div className='createNewWebsiteModal'>
            <div className='modal_container'>

                <div className='modal_title'>
                    <span>Create New Website</span>
                    <button onClick={() => closeModal()}>
                    <CgWebsite />  
                    </button>
                </div>
                <div className='modal_cont'>
                    <div className='moal-inputs'>
                        <h5>Website Name:</h5>
                        <input type="text" onChange={(e) => setNewWebSetting((prev)=>({ ...prev, webName: e.target.value }))} value={newWebSetting.webName} />
                    </div>
                    <div className='createNewWebsiteOptions'>
                        <button onClick={() => createNewWebsite()}> Create new website</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateNewWebsite