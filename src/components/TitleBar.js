import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './common/Button';

export default function TitleBar({title, version}){
    let navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    return(
        <div id='title-bar' className='flex flex-row justify-around items-center bg-carmine text-white	'>
                <div id='version-number' className='px-1 py-2 md:px-2 lg:px-4 font-anton text-inherit'> v{version} </div>
                <div id='title' className='flex-grow py-2 font-anton text-2xl text-inherit' > {title} </div>
                <div id='logout-button' className='px-2 py-2 md:px-4 lg:px-8 text-inherit'> 
                    <Button 
                    
                    title= "LOGOUT"
                    handleAction={handleLogout} 
                    /> 
                </div>
        </div>
    );
}