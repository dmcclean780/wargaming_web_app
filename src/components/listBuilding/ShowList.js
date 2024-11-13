import React from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import MenuButton from '../common/MenuButton.js';
import { db } from '../../firebase-config.js'
import { collection, doc, setDoc, where, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useNavigate, useLocation
} from "react-router-dom"
import { version } from '../../version.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import BasicButtons from '../common/Button.js';

export default function ShowList() {

    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();
    const currentList = location.pathname.split('/')[2]
    const _ = require('lodash');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            let uid = user.uid;
            localStorage.setItem("uid", uid);

        } else {
        }
    });

    const [data, isLoading, isError] = useCollection(
        query(
            collection(
                db,
                'users',
                localStorage.getItem("uid"),
                'lists'

            ),
            where('uid', '==', currentList)
        ) //Working Properly
        ,
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }
    const list = data.docs.map(doc => doc.data())

    localStorage.setItem('chosenFactionID', list[0].army.id)
    localStorage.setItem('chosenDetachmentID', list[0].detachment.id)


    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title={list[0].name.toUpperCase()}
                version={version}
            />
            <div className='w-full bg-gray-700 h-full overflow-y-auto flex flex-col'>
                <div>
                    <div className='flex flex-row items-center justify-between bg-carmine mt-5'>
                        <div className='font-anton text-white ml-2'>
                            CHARACTERS
                        </div>
                        <BasicButtons
                            title={<div>+</div>}
                            handleAction={() => navigate(location.pathname + '/add-character')}
                            className='grid place-content-center w-7 h-7 pb-3 pt-2 pl-2 pr-2 m-2 bg-transparent rounded-md border-white border text-white font-sans text-3xl'
                        />
                    </div>
                    {list[0].characters.map(character =>
                        <div className='bg-cam-blue text-white flex-col items-center font-anton p-1'>
                            <div className='mt-2 rounded-md border border-gray-700 pt-2 pb-2'>
                                <div className='w-full flex justify-center'>
                                    <div className=' flex justify-between w-5/6'>
                                        <div className='text-left'>{character.name}</div>
                                        {_.isEqual(character, list[0].warlord) &&
                                            <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>WARLORD</div>
                                        }
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{character.cost + ' Points'}</div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <ul className=' w-2/3 text-left font-sans text-sm list-disc'>
                                        {character.wargear.map(weapon =>
                                            <li><b>{weapon.replace('-', ' ').toUpperCase()}</b></li>
                                        )}
                                        <li>Enhancement:  <b>{character.enhancement.toUpperCase()}</b></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    )

                    }
                </div>

                <div>
                    <div className='flex flex-row items-center justify-between bg-carmine'>
                        <div className='font-anton text-white ml-2'>
                            BATTLELINE
                        </div>
                        <BasicButtons
                            title={<div>+</div>}
                            handleAction={() => navigate(location.pathname + '/add-battleline')}
                            className='grid place-content-center w-7 h-7 pb-3 pt-2 pl-2 pr-2 m-2 bg-transparent rounded-md border-white border text-white font-sans text-3xl'
                        />
                    </div>
                    {list[0].battleline.map(character =>
                        <div className='bg-cam-blue text-white flex-col items-center font-anton p-1'>
                            <div className='mt-2 rounded-md border border-gray-700 pt-2 pb-2'>
                                <div className='w-full flex justify-center'>
                                    <div className=' flex justify-between w-5/6'>
                                        <div className='text-left'>{character.name}</div>
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{'Size: ' + character.size}</div>
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{character.cost + ' Points'}</div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <ul className=' w-2/3 text-left font-sans text-sm list-disc'>
                                        {character.wargear.map(weapon =>
                                            <li><b>{weapon.replace('-', ' ').toUpperCase()}</b></li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    )

                    }
                </div>

                <div>
                    <div className='flex flex-row items-center justify-between bg-carmine'>
                        <div className='font-anton text-white ml-2'>
                            DEDICATED TRANSPORTS
                        </div>
                        <BasicButtons
                            title={<div>+</div>}
                            handleAction={() => navigate(location.pathname + '/add-transport')}
                            className='grid place-content-center w-7 h-7 pb-3 pt-2 pl-2 pr-2 m-2 bg-transparent rounded-md border-white border text-white font-sans text-3xl'
                        />
                    </div>
                    {list[0].transport.map(character =>
                        <div className='bg-cam-blue text-white flex-col items-center font-anton p-1'>
                            <div className='mt-2 rounded-md border border-gray-700 pt-2 pb-2'>
                                <div className='w-full flex justify-center'>
                                    <div className=' flex justify-between w-5/6'>
                                        <div className='text-left'>{character.name}</div>
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{character.cost + ' Points'}</div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <ul className=' w-2/3 text-left font-sans text-sm list-disc'>
                                        {character.wargear.map(weapon =>
                                            <li><b>{weapon.replace('-', ' ').toUpperCase()}</b></li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    )

                    }
                </div>

                <div>
                    <div className='flex flex-row items-center justify-between bg-carmine'>
                        <div className='font-anton text-white ml-2'>
                            OTHER DATASHEETS
                        </div>
                        <BasicButtons
                            title={<div>+</div>}
                            handleAction={() => navigate(location.pathname + '/add-other')}
                            className='grid place-content-center w-7 h-7 pb-3 pt-2 pl-2 pr-2 m-2 bg-transparent rounded-md border-white border text-white font-sans text-3xl'
                        />
                    </div>

                    {list[0].other.map(other =>
                        <div className='bg-cam-blue text-white flex-col items-center font-anton p-1'>
                            <div className='mt-2 rounded-md border border-gray-700 pt-2 pb-2'>
                                <div className='w-full flex justify-center'>
                                    <div className=' flex justify-between w-5/6'>
                                        <div className='text-left'>{other.name}</div>
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{'Size: ' + other.size}</div>
                                        <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm'>{other.cost + ' Points'}</div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <ul className=' w-2/3 text-left font-sans text-sm list-disc'>
                                        {other.wargear.map(weapon =>
                                            <li><b>{weapon.replace('-', ' ').toUpperCase()}</b></li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    )

                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}