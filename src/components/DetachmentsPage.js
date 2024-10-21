import React from 'react'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import MenuButton from './common/MenuButton.js';
import {db} from '../firebase-config.js'
import {collection} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useNavigate, useLocation
  } from "react-router-dom"
import { version } from '../version.js';

export default function DetachmentsPage() {

    let navigate = useNavigate();
    const location = useLocation();
    const currentCodex = location.pathname.split("/")[2]
    
    const [data, isLoading, isError] = useCollection( //Working Properly
            collection(
                db,
                'codexes',
                currentCodex.replace("%20", "-"),
                'detachments'
            ),
    )

    if(isLoading){
        return (
            <div>loading</div>
        )
    }

    return (

            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="DETACHMENTS"
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {data.docs.map(doc => (
                        <MenuButton 
                        key = {doc.data().name}
                        title = {doc.data().name}
                        handleAction = {() => navigate(location.pathname + '/' + doc.id)}
                    />
                    ))}
                </div>

                <Footer
                /> 
            </div>
    )
}