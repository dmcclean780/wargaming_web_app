import { Routes, useLocation, useNavigate, Route } from "react-router-dom"
import {collection, query, where, getDocs} from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase-config"
import MenuButton from "./common/MenuButton"
import TitleBar from "./common/TitleBar"
import Footer from "./common/Footer"

export default function CodexPage(){
    const navigate = useNavigate();
    const location = useLocation()
    const currentCodex = location.pathname.split("/")[2]

    return(
        <div className='h-dvh flex flex-col'>

            <TitleBar 
                title = {currentCodex.replace("-", " ").toUpperCase()}
                version="0.0.1"
            />
            <div className='flex flex-col flex-grow justify-around items-center bg-gray-700'>
            <MenuButton
                title="ARMY RULES"
                handleAction={() => navigate(location.pathname + "/army-rules")}
            />

            <MenuButton
                title="DETACHMENTS"
                handleAction={() => navigate(location.pathname + "/detachments")}
            />

            <MenuButton
                title="DATASHEETS"
                handleAction={() => navigate(location.pathname + "/datasheets")}
            />
            </div>

            <Footer/>
        </div>
    )
}