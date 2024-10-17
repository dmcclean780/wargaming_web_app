import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleBar from './TitleBar.js'

export default function Home() {
    

    let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <TitleBar
                title="HOME"
                version="0.0.1"
            />
            {/* <div className='flex-col items-center'>
                <div className='flex-grow flex-row self-center items-center'>
                    <div>
                        HEllO
                    </div>
                    <div>
                        WORLD
                    </div>

                </div>
            </div> */}
            
        </div>
        
    )
}