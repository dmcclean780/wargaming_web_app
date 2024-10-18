import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleBar from './TitleBar.js'
import Footer from './Footer.js'
import Button  from './common/Button.js';
import MenuButton from './common/MenuButton.js';

export default function Reference() {
    

    let navigate = useNavigate();

    let armies = ["space-marines", "dark-angles", "space-wolves", "blood-angles"]
    return (
        <div className='h-screen flex flex-col'>
            <TitleBar
                title="REFERNCE"
                version="0.0.1"
            />

            <div className='w-full bg-gray-700 h-full overflow-y-auto'>
                {armies.map(army => (
                    <MenuButton 
                    key = {army}
                    title = {army.replace("-", " ").toUpperCase()}
                    handleAction = {() => console.log(army)}
                />
                ))}
            </div>

            <Footer
            /> 
        </div>
    )
}