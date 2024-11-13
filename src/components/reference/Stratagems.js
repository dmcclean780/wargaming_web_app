import { useLocation } from "react-router-dom";
import {collection, query, where} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import TitleBar from "../common/TitleBar";
import Collapsible from "react-collapsible";
import Footer from "../common/Footer";
import { version } from "../../version";

export default function Stratagems(){
    const location = useLocation();
    const currentCodexID = location.pathname.split("/")[2]
    const currentDetachmentID = location.pathname.split('/')[4]

    const [data, isLoading, isError] = useCollection(
        query(
            collection(
                db,
                'codexes',
                currentCodexID,
                'detachments'
            ),
            where(
                'uid', '==', currentDetachmentID
            )
        )
    )
    if(isLoading){
        return (
            <div>loading</div>
        )
    }
    const stratagems = data.docs[0].data().Stratagems
    
    return (
        <div className='h-screen flex flex-col'>
            <TitleBar
                title="STRATAGEMS"
                version={version}
            />
            <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                {stratagems.map(stratagem =>(
                    <div key={stratagem.name} className=' grid place-items-center'>
                        <div className='w-2/3 mt-4 mb-4 rounded-lg bg-transparent flex flex-col justify-center items-center p-0'>
                            <Collapsible 
                                trigger={<div className="flex flex-row justify-between"> <div>{"▼ "+stratagem.name}</div> <div>{stratagem.cost} CP</div> </div>}
                                triggerWhenOpen={<div className="flex flex-row justify-between"> <div>{"▲ "+stratagem.name}</div> <div>{stratagem.cost} CP</div> </div>}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton text-sm"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine rounded-t-lg font-anton text-sm"
                                className="bg-cam-blue flex flex-col h-full w-full rounded-lg" 
                                openedClassName="bg-cam-blue flex flex-col h-full w-full rounded-lg"
                                contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >
                                <ul >
                                    <li className="list-disc my-1"><b>WHEN:</b> {stratagem.when}</li>
                                    <li className="list-disc my-1"><b>TARGET:</b> {stratagem.target}</li>
                                    <li className="list-disc my-1"><b>EFFECT:</b> {stratagem.effect}</li>
                                    <li className="list-disc my-1"><b>RESTRICTIONS:</b> {stratagem.restrictions}</li>
                                </ul>
                            </Collapsible>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}