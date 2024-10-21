import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleBar from './common/TitleBar.js'
import Footer from './common/Footer.js'
import Button  from './common/Button.js';
import { version } from '../version.js';

export default function Home() {
    

    let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title="HOME"
                version={version}
            />

            <div className='flex flex-col flex-grow justify-around items-center bg-gray-700'>
                <div className='w-full h-1/3 grid place-items-center'>
                    <Button 
                        title = "Reference" 
                        handleAction={() => navigate('/reference')}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
                <div className='w-full h-1/3 grid place-items-center'>

                    <Button 
                        title = "Plan" 
                        handleAction={() => navigate('/plan')}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
                <div className='w-full h-1/3 grid place-items-center'>
                    <Button 
                        title = "Play" 
                        handleAction={() =>navigate('/play')}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
            </div>

            <Footer
            /> 
        </div>
        
    )
}