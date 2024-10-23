import React from 'react'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import MenuButton from './common/MenuButton.js';
import { db } from '../firebase-config.js'
import { collection, doc, setDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    useNavigate, useLocation
} from "react-router-dom"
import { version } from '../version.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import BasicButtons from './common/Button.js';


export default function ListsPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            let uid = user.uid;
            localStorage.setItem("uid", uid);

        } else {
        }
    });

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

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    const lists = data.docs.map(doc => doc.data())
    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title="LISTS"
                version={version}
            />
            <div className='w-full bg-gray-700 h-full overflow-y-auto flex flex-col justify-around items-center'>
                {data.docs.map(doc =>

                    <BasicButtons 
                        handleAction={() => navigate(location.pathname + '/' + doc.id)}
                        className='flex flex-col bg-cam-blue rounded-lg h-1/6 p-0.5 pl-2 w-2/3 items-start'
                        title={
                            <div  className='flex flex-col bg-cam-blue rounded-lg h-1/6 w-2/3 items-start '>
                                <div className='font-anton text-white float-left test-left'>{doc.data().name.toUpperCase()}</div>
                                <div className='text-xs'>{toTitleCase(doc.data().army.name)}</div>
                                <div className='text-xs'>{doc.data().detachment.name}</div>
                                <div className='bg-white rounded-md pt-0.5 pb-0.5 pl-2 pr-2 text-sm font-anton'>{doc.data().size + " Points"}</div>

                            </div>
                        }
                        
                    />
                )}
            </div>
            <div className='flex flex-row justify-end'>
                <BasicButtons
                    title={'+'}
                    handleAction={() => navigate(location.pathname+'/choose-faction')}
                    className='grid place-content-center bg-cam-blue font-sans text-6xl rounded-full w-10 h-10 pb-5 pt-2 pl-2 pr-2 m-2 text-white'
                />
            </div>
            <Footer/>
        </div>
    )
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}