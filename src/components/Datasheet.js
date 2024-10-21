import TitleBar from "./common/TitleBar";
import { useLocation } from "react-router-dom"
import { collection, where, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase-config"
import Collapsible from "react-collapsible";
import Footer from "./common/Footer";
import { version } from "../version"
import Weapon from "./common/RangedWeapon";
import RangedWeaponTitle from "./common/RangedWeponTitle";
import RangedWeapon from "./common/RangedWeapon";
import MeleeWeaponTitle from "./common/MeleeWeaponTitle";
import MeleeWeapon from "./common/MeleeWeapon";

export default function Datasheet() {

    const location = useLocation();
    const currentCodexID = location.pathname.split("/")[2]
    const currentDatasheetID = location.pathname.split('/')[4]


    const [data, isLoading, isError] = useCollection( //Working Properly
        query(
            collection(
                db,
                'codexes',
                currentCodexID,
                'datasheets',
            ),
            where('uid', '==', currentDatasheetID)
        )
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    const datasheet = data.docs[0].data();
    return (
        <div>
            <div className='h-screen flex flex-col '>
                <TitleBar
                    title={datasheet.name}
                    version={version}
                />

                <div className='w-full bg-gray-700 h-full overflow-y-auto flex flex-col '>
                    <div className="flex justify-center bg-cam-blue pt-1 pb-2">
                        <div className="flex flex-row justify-evenly w-2/3 h-1/3" >
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">M</div>
                                <div className="bg-white p-1">{datasheet.movement + '"'}</div>
                            </div>
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">T</div>
                                <div className="bg-white p-1">{datasheet.toughness}</div>
                            </div>
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">SV</div>
                                <div className="bg-white p-1">{datasheet.save + "+"}</div>
                            </div>
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">W</div>
                                <div className="bg-white p-1">{datasheet.wounds}</div>
                            </div>
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">LD</div>
                                <div className="bg-white p-1">{datasheet.leadership + "+"}</div>
                            </div>
                            <div className="flex flex-col w-8">
                                <div className="text-white font-anton">OC</div>
                                <div className="bg-white p-1">{datasheet["objective-control"]}</div>
                            </div>
                        </div>
                    </div>


                    <div className='w-full mt-4 bg-transparent flex flex-col justify-center items-center p-0'>
                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Ranged Weapons</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Ranged Weapons</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >
                            <RangedWeaponTitle />

                            <div>
                                {datasheet['ranged-weapons'].map(weapon => (
                                    <RangedWeapon
                                        key={weapon.name}
                                        weapon={weapon}
                                    />

                                ))

                                }
                            </div>
                        </Collapsible>

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Melee Weapons</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Melee Weapons</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >
                            <MeleeWeaponTitle />

                            <div>
                                {datasheet['melee-weapons'].map(weapon => (
                                    <MeleeWeapon
                                        key={weapon.name}
                                        weapon={weapon}
                                    />

                                ))

                                }
                            </div>
                        </Collapsible>
                    </div>


                </div>

                <Footer />

            </div>
        </div>
    )
}