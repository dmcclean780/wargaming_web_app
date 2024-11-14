import React from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import MenuButton from '../common/MenuButton.js';
import { db } from '../../firebase-config.js'
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useLocation,
    useNavigate,
} from "react-router-dom"
import { version } from '../../version.js';
import Button from '../common/Button.js'

function findOther(data){
    const finalDocs = [];
    data.docs.map(doc => {
        const keywords= doc.data()['keywords']['unit-keywords']
        if(!keywords.includes('CHARACTER') && !keywords.includes('BATTLELINE') && !keywords.includes('DEDICATED TRANSPORT')){
            finalDocs.push(doc)
        }
    })
    return finalDocs;
}

export default function AddOther() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, isLoading, isError] = useCollection( //Working Properly
        query(
            collection(
                db,
                'codexes',
                localStorage.getItem('chosenFactionID'),
               "datasheets"
            ),
        )
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    const correctData=findOther(data);
    
    return (
        <div>
            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="ADD OTHER"
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {correctData.map(doc => (
                        <div className='w-full h-1/6 grid place-items-center'>
                            <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                                <Button
                                    title={<div className='flex justify-between'> <div>{doc.data().name.toUpperCase()}</div> <div>{doc.data().points['half-squad']['points'] + ' Points'}</div></div>}
                                    handleAction={() => {
                                        localStorage.setItem("chosenUnit", doc.id)
                                        localStorage.setItem("unitPoints", doc.data().points['half-squad']['points'])
                                        localStorage.setItem('type', 'other')
                                        navigate(location.pathname + '/configure-unit')
                                    }}
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