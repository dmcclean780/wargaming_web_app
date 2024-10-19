import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleBar from './TitleBar.js'
import Footer from './Footer.js'
import Button  from './common/Button.js';
import MenuButton from './common/MenuButton.js';
import {db, app} from '../firebase-config.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {collection, query, getFirestore} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

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
        <div className='h-screen flex flex-col'>
            <TitleBar
                title="REFERNCE"
                version="0.0.1"
            />

            <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                {armies.map(army => (
                    <MenuButton 
                    key = {army}
                    title = {army.toUpperCase()}
                    handleAction = {() => console.log(army)}
                />
                ))}
            </div>

            <Footer
            /> 
        </div>
    )
}