import React from 'react'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import { db } from '../../firebase-config.js'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useNavigate, useLocation
} from "react-router-dom"
import { version } from '../../version.js';
import BasicButtons from '../common/Button.js';
import bin from '../../images/bin_icon.png'


export default function ListsPage() {

    const navigate = useNavigate();
    const location = useLocation();


    const userDoc = doc(db, 'users', localStorage.getItem("uid"));
    setDoc(userDoc, { uid: localStorage.getItem("uid") }, { merge: true });


    const [data, isLoading, isError] = useCollection( //Working Properly
        collection(
            db,
            'users',
            localStorage.getItem("uid"),
            'lists'

        ),
    )

    const handleDelete = async (id) => {
        const listRef = doc(db, 'users', localStorage.getItem("uid"), 'lists', id);
        await deleteDoc(listRef);

        // navigate to the same page after deletion
        navigate(location.pathname);
    };

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    console.log(data)
    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title="LISTS"
                version={version}
            />
            <div className='w-full bg-gray-700 h-full overflow-y-auto flex flex-col justify-around items-center'>
                {data.docs.map(list =>

                    <BasicButtons
                        handleAction={() => navigate(location.pathname + '/' + list.id)}
                        className='flex flex-col bg-cam-blue rounded-lg h-1/6 p-0.5 pl-2 w-2/3 items-start'
                        title={
                            <div className='flex flex-col justify-center w-full h-full'>
                                <div className='flex flex-row justify-between w-full'>
                                    <div className='flex flex-col bg-cam-blue rounded-lg h-1/6 w-2/3 items-start '>
                                        <div className='font-anton text-white float-left test-left'>{list.data().name.toUpperCase()}</div>
                                        <div className='text-xs'>{toTitleCase(list.data().army.name)}</div>
                                        <div className='text-xs'>{list.data().detachment.name}</div>
                                        <div className='bg-white rounded-md pt-0.5 pb-0.5 pl-2 pr-2 text-sm font-anton'>{list.data().size + " Points"}</div>

                                    </div>
                                    <BasicButtons
                                        title={<img className='object-scale-down justify-end w-7' src={bin} />}
                                        handleAction={() => {
                                               handleDelete(list.id)
                                            }
                                        }
                                        className=' bg-carmine p-1 rounded-md mx-2 my-2'
                                    />
                                </div>
                            </div>
                        }

                    />
                )}
            </div>
            <div className='flex flex-row justify-end'>
                <BasicButtons
                    title={'+'}
                    handleAction={() => navigate(location.pathname + '/choose-faction')}
                    className='grid place-content-center bg-cam-blue font-sans text-6xl rounded-full w-10 h-10 pb-5 pt-2 pl-2 pr-2 m-2 text-white'
                />
            </div>
            <Footer />
        </div>
    )
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}