export default function MeleeWeapon({ weapon }) {
    return (
        <div>

            <div className="bg-gray-700 font-anton p-1 rounded-md">{weapon.name}</div>

            <div className="flex justify-center pt-1 pb-2">
                <div className="flex flex-row justify-evenly w-full h-1/3" >
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon.range}</div>

                    </div>
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon.attacks}</div>

                    </div>
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon["weapon-skill"]}</div>

                    </div>
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon.strength}</div>

                    </div>
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon["armour-penetration"]}</div>

                    </div>
                    <div className="flex flex-col w-8">
                        <div className="text-white font-anton">{weapon.damage}</div>

                    </div>
                </div>
            </div>

            <div className="flex flex-row">
                {weapon.keywords.map(keyword =>
                    
                        <div key={keyword} className="bg-white text-black font-anton p-0.5 ml-1 mb-1 rounded-md">{keyword}</div>
                )}
            </div>

        </div>
    )
}