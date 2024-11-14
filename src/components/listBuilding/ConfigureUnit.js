import React, { useEffect } from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import MenuButton from '../common/MenuButton.js';
import { db } from '../../firebase-config.js'
import { arrayUnion, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useLocation,
    useNavigate,
} from "react-router-dom"
import { version } from '../../version.js';
import { useState } from 'react';
import BasicButtons from '../common/Button.js';
import Collapsible from 'react-collapsible';
import { Checkbox } from '@mui/material';
import { constant } from 'lodash';

export default function ConfigureUnit() {

    const [cost, setCost] = useState(Number(localStorage.getItem('unitPoints')));

    const [selectedWeapons, setSelectedWeapons] = useState([]);
    const [size, setSize] = useState(1)


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


    const navigate = useNavigate();
    const location = useLocation();
    const currentListID = location.pathname.split('/')[2]

    const [rawDatasheet, isLoading, isError] = useCollection( //Working Properly
        query(
            collection(
                db,
                'codexes',
                localStorage.getItem('chosenFactionID'),
                "datasheets",


            ),
            where('uid', '==', localStorage.getItem('chosenUnit'))
        )
    )

    const [rawDetachment, loading, error] = useCollection( //Working Properly
        query(
            collection(
                db,
                'codexes',
                localStorage.getItem('chosenFactionID'),
                "detachments"
            ),
            where('uid', '==', localStorage.getItem('chosenDetachmentID'))
        )
    )

    if (isLoading || loading) {
        return (
            <div>loading</div>
        )
    }


    const datasheet = rawDatasheet.docs[0].data()

    const maxSize = datasheet['points']['full-squad']['models']
    const halfSize = datasheet['points']['half-squad']['models']
    const maxPoints = datasheet['points']['full-squad']['points']
    const minPoints = datasheet['points']['half-squad']['points']

    const min = 1, max = maxSize;
    const options = Array.apply(null, { length: max + 1 - min }).map(function (_, idx) {
        return idx + min;
    });

    const handleSize = (e) => {
        setSize(e.target.value)
        if (e.target.value > halfSize) {
            setCost(maxPoints)
        }
        else {
            setCost(minPoints)
        }
    }


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
                    {maxSize > 1 &&
                        <div className='bg-cam-blue rounded-md w-5/6 justify-between p-2 flex flex-row justify-around'>
                            <div className='text-left w-1/3 font-anton text-white'>Size: </div>
                            
                                <select value={size} onChange={handleSize} className='rounded-md font-anton pl-2 pr-2'>
                                    {options.map(option =>
                                        <option value={option}>{option}</option>
                                    )}
                                </select>
                           
                        </div>
                    }

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
                        const unit = {
                            id: localStorage.getItem('chosenUnit'),
                            name: datasheet.name,
                            size: Number(size),
                            wargear: selectedWeapons,
                            cost: cost
                        }
                        const type = localStorage.getItem('type')
                        updateDoc(listRef, {
                            [type]: arrayUnion(unit)
                        })

                        navigate('/plan/' + currentListID)
                    }

                }}
                className='bg-cam-blue px-2 py-1 rounded-lg font-anton text-white my-2 mx-4'
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