import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleBar from './TitleBar.js'
import Footer from './Footer.js'
import Button  from './common/Button.js';

export default function Reference() {
    

    let navigate = useNavigate();
    return (
        <div className='h-screen flex flex-col'>
            <TitleBar
                title="REFERNCE"
                version="0.0.1"
            />

            <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "SPACE MARINES" 
                        handleAction={() => console.log("space marines")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "DARK ANGLES" 
                        handleAction={() => console.log("dark angles")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "SPACE WOLVES" 
                        handleAction={() => console.log("space wolves")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "BLOOD ANGLES" 
                        handleAction={() => console.log("blood angles")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>  
                        <Button 
                        title = "ADEPTA SORORITAS" 
                        handleAction={() => console.log("ADEPTA SORORITAS")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "AGENTS OF THE IMPERIUM" 
                        handleAction={() => console.log("AGENTS OF THE IMPERIUM")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "CUSTODES" 
                        handleAction={() => console.log("custodes")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                        title = "ADEPTUS MECHANICUS" 
                        handleAction={() => console.log("adeptus mechanicus")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "ASTRA MILITARUM" 
                        handleAction={() => console.log("astra militarum")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "IMPERIAL KNIGHTS" 
                        handleAction={() => console.log("imperial knights")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "TITAN LEGIONS" 
                        handleAction={() => console.log("titan legions")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "GREY KNIGHTS" 
                        handleAction={() => console.log("grey knights")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                            title = "CHAOS SPACE MARINES" 
                            handleAction={() => console.log("chaos space marines")}
                            className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                            />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                            title = "WORLD EATERS" 
                            handleAction={() => console.log("world eaters")}
                            className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                            />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                            title = "DEATH GUARD" 
                            handleAction={() => console.log("death guard")}
                            className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                            />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                            title = "THOUSAND SONS" 
                            handleAction={() => console.log("thousand sons")}
                            className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                            />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                        <Button 
                            title = "EMPEROR'S CHILDREN" 
                            handleAction={() => console.log("emperor's children")}
                            className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                            />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "CHAOS DAEMONS" 
                        handleAction={() => console.log("chaos daemons")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "CHAOS KNIGHTS" 
                        handleAction={() => console.log("chaos knights")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "CHAOS TITAN LEGIONS" 
                        handleAction={() => console.log("chaos titan legions")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "ALDARI" 
                        handleAction={() => console.log("aldari")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "DRUKHARI" 
                        handleAction={() => console.log("drukhari")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='h-full w-full w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "TYRANIDS" 
                        handleAction={() => console.log("tyranids")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "GENESTEALER CULTS" 
                        handleAction={() => console.log("genestealer cults")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "LEAGUES OF VOTANN" 
                        handleAction={() => console.log("leagues of votann")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "ORKS" 
                        handleAction={() => console.log("orks")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "NECRONS" 
                        handleAction={() => console.log("necrons")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>

                <div className='w-full h-1/3 grid place-items-center'>
                    <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                    <Button 
                        title = "T'AU EMPIRE" 
                        handleAction={() => console.log("t'au empire")}
                        className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                        />
                    </div>
                </div>
            </div>

            <Footer
            /> 
        </div>
    )
}