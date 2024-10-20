import { useLocation, useNavigate } from "react-router-dom"
import {collection, query, where, getDocs} from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase-config"
import Collapsible from "react-collapsible";
import TitleBar from "./common/TitleBar";
import Footer from "./common/Footer";
import  {version} from "../version"

export default function ArmyRulesPage(){

    const location = useLocation();
    const currentCodexID = location.pathname.split("/")[2]
    
    const [data, isLoading, isError] = useCollection( //Working Properly
        collection(
            db,
            'codexes',
            currentCodexID,
            'army-rules'
        ),
)

if(isLoading){
    return (
        <div>loading</div>
    )
}

const ruleNames = data.docs.map(doc => doc.data().name)
const ruleRules = data.docs.map(doc => doc.data().rules)
const myComponentList = ruleRules.map(rule => (
    <li key={rule}>{rule}</li>
  ));
return (
    <div className='h-screen flex flex-col'>
        <TitleBar
            title="ARMY RULES"
            version={version}
        />
        <div className='flex flex-col flex-grow items-center gap-2 bg-gray-700'>
            {data.docs.map(doc =>(
                <div key={doc.id} className=' grid place-items-center'>
                    <div className='w-2/3 mt-4 rounded-lg bg-transparent flex flex-col justify-center items-center p-0'>
                        <Collapsible 
                            trigger={"▼ "+doc.data().name}
                            triggerWhenOpen={"▲ "+doc.data().name}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-libre-baskerville font-bold"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine rounded-t-lg font-libre-baskerville font-extrabold"
                            className="bg-cam-blue flex flex-col h-full w-full rounded-lg" 
                            openedClassName="bg-cam-blue flex flex-col h-full w-full rounded-lg"
                            contentInnerClassName="text-left p-4 text-xs font-libre-baskerville"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >
                            <ul>
                                {doc.data().rules.map(rule => 
                                    
                                        <li   key={rule} className="list-disc my-1">{rule}</li>
                                    ) 
                                }
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