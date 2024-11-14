import React from 'react'
import { db } from '../../firebase-config.js'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import {
    useNavigate, useLocation
} from "react-router-dom"
import BasicButtons from '../common/Button.js';
import bin from '../../images/bin_icon.png'

export default function UnitInList({ type, unit }) {

    const navigate = useNavigate();
    const location = useLocation();
    const currentList = location.pathname.split('/')[2]
    const _ = require('lodash');
    const docRef = doc(db, 'users', localStorage.getItem("uid"), 'lists', currentList)

    return (
        <div className='flex flex-row bg-cam-blue'>
            <BasicButtons
                title={
                    <div className='mt-2 rounded-md border border-gray-700 pt-2 pb-2'>
                        <div className='w-full flex justify-center'>
                            <div className=' flex justify-between w-5/6'>
                                <div className='text-left items-center flex pl-2'>{unit.name}</div>
                                {_.isEqual(unit, localStorage.getItem('warlord')) &&
                                    <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm items-center flex'>WARLORD</div>
                                }
                                {type === "battleline" || type === "other" &&
                                    <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm items-center flex'>{'Size: ' + unit.size}</div>
                                }
                                <div className='bg-carmine pl-2 pr-2 p-1 rounded-md text-sm items-center flex'>{unit.cost + ' Points'}</div>

                            </div>

                        </div>
                        <div className='w-full flex justify-center'>
                            <ul className=' w-2/3 text-left font-sans text-sm list-disc'>
                                {unit.wargear.map(weapon =>
                                    <li><b>{weapon.replace('-', ' ').toUpperCase()}</b></li>
                                )}
                                {type === "character" &&
                                    <li>Enhancement:  <b>{unit.enhancement.toUpperCase()}</b></li>
                                }

                            </ul>
                        </div>
                    </div>
                }

                handleAction={() => {
                    if (type === "character") {
                        updateDoc(docRef, {
                            characters: arrayRemove(
                                unit)
                        });
                    }
                    if (type === "battleline") {
                        updateDoc(docRef, {
                            battleline: arrayRemove(
                                unit)
                        });
                    }
                    if (type === "transport") {
                        updateDoc(docRef, {
                            transport: arrayRemove(
                                unit)
                        });
                    }
                    if (type === "other") {
                        updateDoc(docRef, {
                            other: arrayRemove(
                                unit)
                        });
                    }
                    if (type != "character") {
                        localStorage.setItem("chosenUnit", unit.id)
                        localStorage.setItem("unitPoints", unit.cost)
                        localStorage.setItem('type', type)
                        navigate(location.pathname + '/configure-unit')
                    }
                    else {
                        localStorage.setItem("chosenCharacter", unit.id)
                        localStorage.setItem("characterPoints", unit.cost)
                        navigate(location.pathname + '/configure-character')
                    }

                }}
                className='bg-cam-blue text-white flex-col items-center font-anton p-1 w-full'

            />
            <div className='bg-transparent pl-2 pr-2 p-1 rounded-md text-sm  items-center flex w-1/12 justify-end'>
                <BasicButtons
                    title={<img className='object-scale-down justify-end w-7' src={bin} />}
                    handleAction={() => {
                        if (type === "character") {
                            updateDoc(docRef, {
                                characters: arrayRemove(
                                    unit)
                            });
                        }
                        if (type === "battleline") {
                            updateDoc(docRef, {
                                battleline: arrayRemove(
                                    unit)
                            });
                        }
                        if (type === "transport") {
                            updateDoc(docRef, {
                                transport: arrayRemove(
                                    unit)
                            });
                        }
                        if (type === "other") {
                            updateDoc(docRef, {
                                other: arrayRemove(
                                    unit)
                            });
                        }
                    }}
                    className=' bg-carmine p-1 rounded-md'
                />
            </div >
        </div>
    )
}