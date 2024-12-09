import { query, collection, where, doc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import TitleBar from "../common/TitleBar";
import Collapsible from "react-collapsible";
import Footer from "../common/Footer";
import MenuButton from "../common/MenuButton";
import { version } from "../../version";

export default function Detachment() {
    const location = useLocation()
    const navigate = useNavigate()
    const currentCodex = location.pathname.split('/')[2];
    const detachmentID = location.pathname.split('/')[4];
    const [data, isLoading, isError] = useDocument(
        doc(
            db,
            'codexes',
            currentCodex,
            'detachments',
            detachmentID
        )
    )
    if (isLoading) {
        return (
            <div>loading</div>
        )
    }
    const detachmentData = data.data();

    return (
        <div className='h-screen flex flex-col'>
            <TitleBar
                title={detachmentData.name}
                version={version}
            />

            <div className='w-full bg-gray-700 h-full overflow-y-auto items-center'>

                <MenuButton
                    title="Enhancements"
                    handleAction={() => navigate(location.pathname + '/' + 'enhancments')}
                />

                <MenuButton
                    title="Stratagems"
                    handleAction={() => navigate(location.pathname + '/' + 'stratagems')}
                />
                <div className="w-full grid place-items-center">
                    <div className='w-2/3 h-2/3 text-left text-white font-anton'>
                        DETACHMENT RULES
                    </div>

                </div>
                {detachmentData['detachment-rules'].map(rule => (
                    <div key={rule} className=' grid place-items-center'>
                        <div className='w-2/3 mt-4 rounded-lg bg-transparent flex flex-col justify-center items-center p-0'>
                            <Collapsible
                                trigger={"▼ " + rule.name}
                                triggerWhenOpen={"▲ " + rule.name}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine rounded-lg font-anton font-bold"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine rounded-t-lg font-anton"
                                className="bg-cam-blue flex flex-col h-full w-full rounded-lg"
                                openedClassName="bg-cam-blue flex flex-col h-full w-full rounded-lg"
                                contentInnerClassName="text-left text-white p-4 text-xs font-serif"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >
                                <div>
                                    {rule.rules}
                                </div>
                            </Collapsible>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}