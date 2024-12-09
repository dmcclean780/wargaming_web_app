import React from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import { db } from '../../firebase-config.js'
import { collection, doc, setDoc, where, query, updateDoc, arrayRemove } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {
    useNavigate, useLocation
} from "react-router-dom"
import { version } from '../../version.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BasicButtons from '../common/Button.js';
import UnitInList from './UnitInList.js';

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

    const [data, isLoading, isError] = useDocument(

        doc(
            db,
            'users',
            localStorage.getItem("uid"),
            'lists',
            currentList
        )
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }
    const list = data.docs.map(doc => doc.data())

    localStorage.setItem('chosenFactionID', list[0].army.id)
    localStorage.setItem('chosenDetachmentID', list[0].detachment.id)
    localStorage.setItem('warlord', list[0].warlord)
    const docRef = doc(db, 'users', localStorage.getItem("uid"), 'lists', currentList)


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
                    {list[0].characters.map((character) =>
                        <UnitInList
                            type="character"
                            unit={character}
                        />
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
                    {list[0].battleline.map(battleline =>
                        <UnitInList
                            type="battleline"
                            unit={battleline}
                        />
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
                    {list[0].transport.map(transport =>
                        <UnitInList
                            type="transport"
                            unit={transport}
                        />
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
                        <UnitInList
                            type="other"
                            unit={other}
                        />
                    )

                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}