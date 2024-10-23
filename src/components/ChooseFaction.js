import React from 'react'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import MenuButton from './common/MenuButton.js';
import { db } from '../firebase-config.js'
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useLocation,
    useNavigate,
} from "react-router-dom"
import { version } from '../version.js';
import Button from './common/Button.js'

export default function ChooseFaction() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, isLoading, isError] = useCollection( //Working Properly
        collection(
            db,
            'codexes'
        ),
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    return (
        <div>
            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="REFERNCE"
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {data.docs.map(doc => (
                        <div className='w-full h-1/6 grid place-items-center'>
                            <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                                <Button
                                    title={doc.data().name.toUpperCase()}
                                    handleAction={() =>{
                                        localStorage.setItem("chosenFactionID", doc.id)
                                        localStorage.setItem("chosenFactionName", doc.data().name)
                                        navigate(location.pathname+'/choose-detachment')}}
                                    className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <Footer
                />
            </div>
        </div>
    )
}