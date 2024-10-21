import React from 'react'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import MenuButton from './common/MenuButton.js';
import {db} from '../firebase-config.js'
import {collection} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useNavigate,
  } from "react-router-dom"
import { version } from '../version.js';

export default function Reference() {

    let navigate = useNavigate();
    
    const [data, isLoading, isError] = useCollection( //Working Properly
            collection(
                db,
                'codexes'
            ),
    )

    if(isLoading){
        return (
            <div>loading</div>
        )
    }
     
    const armies = data.docs.map(doc => doc.data().name);
    const armiesID = data.docs.map(doc => doc.id);

    return (
        <div>
            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="REFERNCE"
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {data.docs.map(doc => (
                        <MenuButton 
                        key = {doc.data().name}
                        title = {doc.data().name.toUpperCase().replace("-", " ")}
                        handleAction = {() => navigate('/reference/'+doc.id)}
                    />
                    ))}
                </div>

                <Footer
                /> 
            </div>
        </div>
    )
}