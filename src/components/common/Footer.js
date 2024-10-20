import { useNavigate } from 'react-router-dom';
import  Button  from './Button.js';
import React, { useEffect } from 'react'

export default function Footer(){
    let navigate = useNavigate()
    return(
        <div id='footer-bar' className='py-2  bg-carmine	'>
            <Button 
                    
                    title= "HOME"
                    handleAction={()=>navigate('/')}
                    className='bg-transparent px-2 py-1 rounded-lg font-anton text-white text-2xl' 
            /> 
        </div>
    );
}