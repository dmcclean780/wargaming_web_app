import { Routes, useLocation, useNavigate, Route } from "react-router-dom"
import { collection, query, where, getDocs, doc, FieldPath } from "firebase/firestore"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from "../../firebase-config"
import MenuButton from "../common/MenuButton"
import TitleBar from "../common/TitleBar"
import Footer from "../common/Footer"
import { version } from "../../version"

export default function CodexPage() {
    const navigate = useNavigate();
    const location = useLocation()
    const currentCodexID = location.pathname.split("/")[2]
    const [currentCodex, isLoading, isError] = useDocument(
        doc(
            db,
            "codexes",
            currentCodexID
        )
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    return (
        <div className='h-dvh flex flex-col'>

            <TitleBar
                title={currentCodex.data().name.toUpperCase()}
                version={version}
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

            <Footer />
        </div>
    )
}