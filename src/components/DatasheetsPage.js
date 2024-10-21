import { useLocation, useNavigate } from "react-router-dom"
import {collection} from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase-config"
import TitleBar from "./common/TitleBar";
import Footer from "./common/Footer";
import  {version} from "../version";
import MenuButton from "./common/MenuButton";

export default function DatasheetsPage(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const currentCodexID = location.pathname.split("/")[2]
    
    const [data, isLoading, isError] = useCollection( //Working Properly
        collection(
            db,
            'codexes',
            currentCodexID,
            'datasheets'
        ),
    )

    if(isLoading){
        return (
            <div>loading</div>
        )
    }

    return(
        <div>
            <div className='h-screen flex flex-col'>
                <TitleBar
                    title="DATASHEETS"
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                    {data.docs.map(doc => (
                        <MenuButton 
                        key = {doc.data().name}
                        title = {doc.data().name.toUpperCase().replace("-", " ")}
                        handleAction = {() => navigate(location.pathname+'/'+doc.id)}
                    />
                    ))}
                </div>

                <Footer
                /> 
            </div>
        </div>
    )
}