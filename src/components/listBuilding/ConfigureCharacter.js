import React, { useEffect } from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import MenuButton from '../common/MenuButton.js';
import { db } from '../../firebase-config.js'
import { arrayUnion, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {
    useLocation,
    useNavigate,
} from "react-router-dom"
import { version } from '../../version.js';
import { useState } from 'react';
import BasicButtons from '../common/Button.js';
import Collapsible from 'react-collapsible';
import { Checkbox } from '@mui/material';

export default function ConfigureCharacter() {

    const [cost, setCost] = useState(Number(localStorage.getItem('characterPoints')));
    const [selectedEnhancement, setSelectedEnhancment] = useState(null);
    const [selectedWeapons, setSelectedWeapons] = useState([]);
    const [isWarlod, setIsWarlord] = useState(false);

    function handleEnhancement(enhancement) {
        if (selectedEnhancement != null) {
            setCost(cost + Number(enhancement.cost) - Number(selectedEnhancement.cost))
        }
        else {
            setCost(cost + Number(enhancement.cost))
        }

        setSelectedEnhancment(enhancement);
    }

    function handleWeapons(weapon) {
        //console.log(selectedWeapons)
        if (!(selectedWeapons.includes(weapon.uid))) {
            const arr = selectedWeapons
            arr.push(weapon.uid)
            setSelectedWeapons(arr)
            //console.log(selectedWeapons)
        }
        else {
            const arr = selectedWeapons
            const index = arr.indexOf(weapon.uid)
            arr.splice(index, 1)
            setSelectedWeapons(arr)
        }

    }

    function handleWarlord() {
        const curValue = isWarlod
        const nextValue = !isWarlod
        setIsWarlord(nextValue)
    }

    const navigate = useNavigate();
    const location = useLocation();
    const currentListID = location.pathname.split('/')[2]

    const [rawDatasheet, isLoading, isError] = useDocument( //Working Properly

        doc(
            db,
            'codexes',
            localStorage.getItem('chosenFactionID'),
            "datasheets",
            localStorage.getItem('chosenCharacter'))

    )

    const [rawDetachment, loading, error] = useDocument( //Working Properly

        doc(
            db,
            'codexes',
            localStorage.getItem('chosenFactionID'),
            "detachments",
            localStorage.getItem('chosenDetachmentID'))
    )

    if (isLoading || loading) {
        return (
            <div>loading</div>
        )
    }


    const datasheet = rawDatasheet.data()
    const detachment = rawDetachment.data()
    const rangedWeapons = datasheet['ranged-weapons']
    const meleeWeapons = datasheet['melee-weapons']

    const weapons = removeProfiles(rangedWeapons).concat(removeProfiles(meleeWeapons))





    return (
        <div className='h-screen flex flex-col'>

            <TitleBar
                title={datasheet.name.toUpperCase()}
                version={version}
            />

            <div className='w-full bg-gray-700 h-full overflow-y-auto'>

                <div className='flex justify-between bg-cam-blue p-3 text-white font-anton'>

                    <div>
                        {datasheet.name}
                    </div>

                    <div className='bg-carmine rounded-md p-0.5 pl-2 pr-2'>
                        {cost + ' Points'}
                    </div>

                </div>

                <div className='flex flex-col items-center justify-center mt-4'>
                    <div className='bg-cam-blue flex flex-row justify-between rounded-md w-5/6 p-2 font-anton text-white items-center'>
                        <div>
                            Warlord
                        </div>

                        <Checkbox
                            checked={isWarlod}
                            onChange={() => {
                                handleWarlord()
                            }}
                        />
                    </div>

                    <Collapsible
                        trigger="▼ ENHANCEMENTS"
                        triggerWhenOpen="▲ ENHANCEMENTS"
                        triggerClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton text-sm"
                        triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton text-sm"
                        className=" flex flex-col w-5/6 rounded-lg mt-4"
                        openedClassName=" flex flex-col w-5/6 rounded-lg mt-4"
                        contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                        transitionTime="100"
                        transitionCloseTime="100"
                    >

                        <div className='font-anton text-md'>Select One</div>

                        {detachment.Enhancements.map(enhancement => (

                            <div key={enhancement.name} className=' grid place-items-center'>

                                <div className='w-full mt-4 mb-4 rounded-lg flex flex-row justify-center  p-0 bg-transparent'>

                                    <div className='items-center'>

                                        <Collapsible

                                            trigger={
                                                <div className='flex justify-between'>
                                                    <div className='flex flex-col'>
                                                        <div>{"▼ " + enhancement.name} </div>
                                                        <div className='pl-4 text-xs text-gray-600'>{enhancement.cost} Points</div>
                                                    </div>

                                                </div>
                                            }

                                            triggerWhenOpen={
                                                <div className='flex justify-between'>
                                                    <div className='flex flex-col'>
                                                        <div>{"▲ " + enhancement.name} </div>
                                                        <div className='pl-4 text-xs text-gray-600'>{enhancement.cost} Points</div>
                                                    </div>
                                                </div>
                                            }

                                            triggerClassName="text-left text-white p-2 float-left bg-cam-blue rounded-l-lg font-anton text-sm "
                                            triggerOpenedClassName="text-left text-white p-2 float-left bg-cam-blue rounded-tl-lg font-anton text-sm "
                                            className="bg-transparent flex flex-col h-full w-full rounded-l-lg "
                                            openedClassName="bg-transparent flex flex-col h-full w-full rounded-l-lg "
                                            contentInnerClassName="text-left p-4 text-xs font-serif text-white bg-cam-blue rounded-lb-md"
                                            transitionTime="100"
                                            transitionCloseTime="100"
                                        >

                                            <div>
                                                {enhancement.rules}
                                            </div>

                                        </Collapsible>

                                    </div>

                                    <div className='bg-cam-blue'>

                                        <Checkbox
                                            checked={JSON.stringify(selectedEnhancement) === JSON.stringify(enhancement)}
                                            onChange={() => {
                                                handleEnhancement(enhancement);
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </Collapsible>

                    <Collapsible
                        trigger="▼ WARGEAR OPTIONS"
                        triggerWhenOpen="▲ WARGEAR OPTIONS"
                        triggerClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton text-sm"
                        triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton text-sm"
                        className=" flex flex-col w-5/6 rounded-lg mt-4"
                        openedClassName=" flex flex-col w-5/6 rounded-lg mt-4"
                        contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                        transitionTime="100"
                        transitionCloseTime="100"
                    >
                        <div className="flex flex-col bg-cam-blue p-1 rounded-md pl-2">
                            {Object.keys(datasheet['wargear-options']).map(option =>
                                <div key={option}>
                                    <div className="font-sans">{datasheet['wargear-options'][option].shift()}</div>
                                    <ul className="list-disc pl-4 pb-2 font-sans">{
                                        datasheet['wargear-options'][option].map(text =>
                                            <li>{text}</li>
                                        )}
                                    </ul>
                                </div>
                            )

                            }

                        </div>
                        {weapons.map(weapon =>
                            <div className='bg-cam-blue flex flex-row justify-between rounded-md mt-2 p-2 font-anton'>
                                <div>
                                    {weapon.name}
                                </div>
                                <Checkbox
                                    onChange={() => {
                                        handleWeapons(weapon);
                                    }}
                                />
                            </div>
                        )}

                    </Collapsible>

                </div>

            </div>

            <BasicButtons
                title='Save'
                handleAction={() => {
                    if (selectedWeapons.length != 0) {
                        const listRef = doc(db, 'users', localStorage.getItem('uid'), 'lists', currentListID)
                        const character = {
                            id: localStorage.getItem('chosenCharacter'),
                            name: datasheet.name,
                            enhancement: selectedEnhancement.name,
                            wargear: selectedWeapons,
                            cost: cost
                        }
                        updateDoc(listRef, {
                            characters: arrayUnion(character)
                        })
                        if (isWarlod) {
                            updateDoc(listRef, {
                                warlord: character
                            })
                        }
                        navigate('/plan/' + currentListID)
                    }
                }}
            />

            <Footer />

        </div>
    )
}

function removeProfiles(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].name = arr[i].name.replace('► ', '')
        arr[i].name = arr[i].name.replace(' - ', '@')
        arr[i].name = arr[i].name.split('@')[0]
    }
    const uniqueProfiles = [];

    const unique = arr.filter(element => {
        const isDuplicate = uniqueProfiles.includes(element.uid);

        if (!isDuplicate) {
            uniqueProfiles.push(element.uid);

            return true;
        }

        return false;
    });
    return unique;
}