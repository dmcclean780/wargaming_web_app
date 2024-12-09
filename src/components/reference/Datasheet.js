import TitleBar from "../common/TitleBar";
import { useLocation } from "react-router-dom"
import { collection, where, query, doc } from "firebase/firestore"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from "../../firebase-config"
import Collapsible from "react-collapsible";
import Footer from "../common/Footer";
import { version } from "../../version"
import Weapon from "../common/RangedWeapon";
import RangedWeaponTitle from "../common/RangedWeponTitle";
import RangedWeapon from "../common/RangedWeapon";
import MeleeWeaponTitle from "../common/MeleeWeaponTitle";
import MeleeWeapon from "../common/MeleeWeapon";

export default function Datasheet() {

    const location = useLocation();
    const currentCodexID = location.pathname.split("/")[2]
    const currentDatasheetID = location.pathname.split('/')[4]


    const [data, isLoading, isError] = useDocument( //Working Properly
        doc(
            db,
            'codexes',
            currentCodexID,
            'datasheets',
            currentDatasheetID
        )
    )

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }
    const datasheet = data.data();
    
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


                    <div className='w-full bg-transparent flex flex-col justify-center items-center p-0'>

                        <div className="w-full">
                            {datasheet['invulnerable-save'] != "" &&
                                <div className="flex flex-row justify-between text-left text-white p-2 float-left bg-carmine font-anton text-sm w-full">
                                    <div>Invulnerable Save</div>
                                    <div>{datasheet['invulnerable-save'] + '+'}</div>
                                </div>
                            }
                        </div>

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Ranged Weapons</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Ranged Weapons</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
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
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
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

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Abilities</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Abilities</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white font-sans"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >
                            <div className="ml-1">Core Abilities:</div>

                            <div className="flex">
                                {datasheet.abilities['core-abilities'].map(ability => (
                                    <div className="bg-white text-black font-anton p-0.5 pl-1 pr-1 ml-1 mb-1 rounded-md">{ability.name}</div>

                                ))}
                            </div>

                            <div className="ml-1 mt-2">Faction Abilities:</div>

                            <div className="flex">
                                {datasheet.abilities['faction-abilities'].map(ability => (
                                    <div className="bg-white text-black font-anton p-0.5 pl-1 pr-1 ml-1 mb-1 rounded-md">{ability.name}</div>

                                ))}
                            </div>

                            <div className="ml-1 mt-2">Datasheet Abilities:</div>

                            <div className="flex flex-col">

                                {datasheet.abilities['datasheet-abilities'].map(ability => (
                                    <div key={ability} className="mb-2">
                                        <div className="bg-gray-600 text-white font-anton p-0.5 pl-1 ml-1 mb-1 rounded-md">{ability.name}</div>
                                        <div className="ml-2">{ability.rules}</div>
                                    </div>

                                ))}

                            </div>
                        </Collapsible>

                        {datasheet['wargear-abilities'].length != 0 &&
                            <Collapsible
                                trigger={<div className="flex flex-row justify-between"> <div>Wargear Abilities</div> <div>▼</div> </div>}
                                triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Wargear Abilities</div> <div>▲</div> </div>}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                className="bg-cam-blue flex flex-col  w-full"
                                openedClassName="bg-cam-blue flex flex-col  w-full"
                                contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >

                                <div className="flex flex-col font-sans">

                                    {datasheet['wargear-abilities'].map(ability => (
                                        <div key={ability} className="mb-2">
                                            <div className="bg-gray-600 text-white font-anton p-0.5 pl-1 ml-1 mb-1 rounded-md">{ability.name}</div>
                                            <div className="ml-2">{ability.rules}</div>
                                        </div>

                                    ))}

                                </div>

                            </Collapsible>
                        }

                        {datasheet['transport'] != "" &&
                            <Collapsible
                                trigger={<div className="flex flex-row justify-between"> <div>Transport</div> <div>▼</div> </div>}
                                triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Transport</div> <div>▲</div> </div>}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                className="bg-cam-blue flex flex-col  w-full"
                                openedClassName="bg-cam-blue flex flex-col  w-full"
                                contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >
                                <div className="flex flex-col font-sans">
                                    <div className="ml-2">{datasheet.transport}</div>
                                </div>

                            </Collapsible>
                        }

                        {datasheet['damaged']['trigger'] != -1 &&
                            <Collapsible
                                trigger={<div className="flex flex-row justify-between"> <div>{"Damaged: 1-" + datasheet['damaged']['trigger'] + " Wounds Remaining"}</div> <div>▼</div> </div>}
                                triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Transport</div> <div>▲</div> </div>}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                className="bg-cam-blue flex flex-col  w-full"
                                openedClassName="bg-cam-blue flex flex-col  w-full"
                                contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >
                                <div className="flex flex-col font-sans">
                                    <div className="ml-2">{datasheet['damaged']['rule']}</div>
                                </div>

                            </Collapsible>
                        }

                        {datasheet.leader.units.length != 0 &&
                            <Collapsible
                                trigger={<div className="flex flex-row justify-between"> <div>Leader</div> <div>▼</div> </div>}
                                triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Leader</div> <div>▲</div> </div>}
                                triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                                className="bg-cam-blue flex flex-col  w-full"
                                openedClassName="bg-cam-blue flex flex-col  w-full"
                                contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                                transitionTime="100"
                                transitionCloseTime="100"
                            >

                                <div className="flex flex-col">
                                    <ul className="list-disc pl-2 pb-2 font-sans">
                                        {datasheet.leader.units.map(unit => (
                                            <li key={unit}>{unit}</li>

                                        ))}
                                    </ul>

                                    {datasheet.leader.restrictions.map(restriction => (
                                        <div key={restriction} className="font-sans">{restriction}</div>

                                    ))}

                                </div>

                            </Collapsible>
                        }

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Wargear Options</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Wargear Options</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >

                            <div className="flex flex-col">
                                {Object.keys(datasheet['wargear-options']).map(option =>
                                    <div key={option}>
                                        <div className="font-sans">{datasheet['wargear-options'][option].shift()}</div>
                                        <ul className="list-disc pl-4 pb-2 font-sans">{
                                            datasheet['wargear-options'][option].map(text =>
                                                <li>{text}</li>
                                            )}
                                        </ul>
                                    </div>
                                )

                                }

                            </div>

                        </Collapsible>

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Unit Composition</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Unit Composition</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >

                            <div className="flex flex-col">
                                <ul className="list-disc pl-4 pb-2 font-sans">
                                    {datasheet['unit-composition'].map(point =>
                                        <li key={point}>{point}</li>
                                    )}
                                </ul>
                                <div className="flex flex-row justify-between bg-gray-600 rounded-md p-1 font-anton">
                                    <div>
                                        {"Model Count: " + datasheet.points['full-squad']['models']}
                                    </div>
                                    <div>
                                        {"Points: " + datasheet.points['full-squad']['points']}
                                    </div>
                                </div>
                                {Object.keys(datasheet.points['half-squad']).length != 0 &&

                                    <div className="flex flex-row justify-between bg-gray-600 rounded-md p-1 font-anton mt-2">
                                        <div>
                                            {"Model Count: " + datasheet.points['half-squad']['models']}
                                        </div>
                                        <div>
                                            {"Points: " + datasheet.points['half-squad']['points']}
                                        </div>
                                    </div>

                                }
                            </div>

                        </Collapsible>

                        <Collapsible
                            trigger={<div className="flex flex-row justify-between"> <div>Keywords</div> <div>▼</div> </div>}
                            triggerWhenOpen={<div className="flex flex-row justify-between"> <div>Keywords</div> <div>▲</div> </div>}
                            triggerClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            triggerOpenedClassName="text-left text-white p-2 float-left bg-carmine font-anton text-sm border-white border-y"
                            className="bg-cam-blue flex flex-col  w-full"
                            openedClassName="bg-cam-blue flex flex-col  w-full"
                            contentInnerClassName="text-left p-4 text-xs font-serif text-white"
                            transitionTime="100"
                            transitionCloseTime="100"
                        >

                            <div className="flex flex-row flex-wrap bg-gray-600 rounded-md p-1 font-sans mb-2">
                                <div>Keywords: </div>
                                {datasheet.keywords['unit-keywords'].map(keyword =>
                                    <div className="font-bold">{keyword + ', '}</div>
                                )}
                            </div>

                            <div className="flex flex-row flex-wrap bg-gray-600 rounded-md p-1 font-sans">
                                <div>Faction Keywords: </div>
                                {datasheet.keywords['faction-keywords'].map(keyword =>
                                    <div className="font-bold">{keyword + ', '}</div>
                                )}
                            </div>

                        </Collapsible>

                    </div>


                </div>

                <Footer />

            </div>
        </div>
    )
}