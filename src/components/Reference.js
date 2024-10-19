import React from 'react'
import TitleBar from './TitleBar.js'
import Footer from './Footer.js'
import MenuButton from './common/MenuButton.js';
import {db} from '../firebase-config.js'
import {collection} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    Routes,
    Route,
    useNavigate,
    useLocation
  } from "react-router-dom"

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

    return (
        <div>
            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="REFERNCE"
                    version="0.0.1"
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {armies.map(army => (
                        <MenuButton 
                        key = {army}
                        title = {army.toUpperCase().replace("-", " ")}
                        handleAction = {() => navigate('/reference/'+army)}
                    />
                    ))}
                </div>

                <Footer
                /> 
            </div>
        </div>
    )
}