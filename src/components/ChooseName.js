import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import Button from './common/Button.js';
import { version } from '../version.js';
import { useState } from 'react';
import BasicButtons from './common/Button.js';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Detachment from './Detachment.js';
import { db } from '../firebase-config.js';

export default function ChooseName() {


    const navigate = useNavigate();
    const location = useLocation();
    const sizeMap = new Map();
    sizeMap.set("1000", (<div className='flex justify-between'><div>Incursion</div><div>1000 Points</div></div>))
    sizeMap.set("2000", (<div className='flex justify-between'><div>Strike Force</div><div>2000 Points</div></div>))
    sizeMap.set("3000", (<div className='flex justify-between'><div>Onslaught</div><div>3000 Points</div></div>))

    const uuid = uuidv4();
    const [chosenName, setChosenName] = useState(null)
    const onChange = (e) => {
        setChosenName(e.target.value);
    };

    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title="HOME"
                version={version}
            />

            <div className='flex flex-col flex-grow justify-around items-center bg-gray-700 '>
                <div>
                    <div className='font-anton text-white text-left pb-2 text-xl'> NAME </div>
                    <input type="text"
                        value={chosenName || ""}
                        name="city"
                        onChange={onChange}
                        className='ml-2 rounded-md h-8 p-2'
                    />
                </div>
                <div>
                    <div className='font-anton text-white text-left pb-2 text-xl'> ARMY </div>
                    <div className='font-anton text-white text-lg text-left ml-2 mb-2 bg-cam-blue p-1 pl-2 rounded-md'>{localStorage.getItem('chosenFactionName').toUpperCase()}</div>
                    <div className='font-anton text-white text-lg text-left ml-2 mb-2 bg-cam-blue p-1 pl-2 rounded-md'>{sizeMap.get(localStorage.getItem('size'))}</div>
                    <div className='font-anton text-white text-lg text-left ml-2 mb-2 bg-cam-blue p-1 pl-2 rounded-md'>{localStorage.getItem('chosenDetachmentName')}</div>
                </div>
                <BasicButtons
                    title="CREATE ARMY"
                    handleAction={() => {
                        if (chosenName != null) {
                            setDoc(doc(db, 'users', localStorage.getItem('uid'), 'lists', uuid), {
                                uid: uuid,
                                name: chosenName,
                                army: {
                                    id: localStorage.getItem('chosenFactionID'),
                                    name: localStorage.getItem('chosenFactionName')
                                },
                                detachment: {
                                    id: localStorage.getItem('chosenDetachmentID'),
                                    name: localStorage.getItem('chosenDetachmentName')
                                },
                                size: parseInt(localStorage.getItem('size')),
                                currentPoints: 0


                            })
                            navigate('/plan')
                        }

                    }}
                    className='bg-carmine px-2 py-1 rounded-lg font-anton text-white w-5/6 text-lg'
                />
            </div>

            <Footer
            />
        </div>

    )
}