import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TitleBar from '../common/TitleBar.js'
import Footer from '../common/Footer.js'
import Button from '../common/Button.js';
import { version } from '../../version.js';

export default function ChooseSize() {


    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='h-dvh flex flex-col'>
            <TitleBar
                title="HOME"
                version={version}
            />

            <div className='flex flex-col flex-grow justify-around items-center bg-gray-700'>
                <div className='w-full h-1/3 grid place-items-center'>
                    <Button
                        title={<div className='flex justify-between'><div>Incursion</div><div>1000 Points</div></div>}
                        handleAction={() => {
                            localStorage.setItem('size', 1000)
                            navigate(location.pathname +'/choose-name')}}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
                <div className='w-full h-1/3 grid place-items-center'>

                    <Button
                        title={<div className='flex justify-between'><div>Strike Force</div><div>2000 Points</div></div>}
                        handleAction={() => {
                            localStorage.setItem('size', 2000)
                            navigate(location.pathname +'/choose-name')}}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
                <div className='w-full h-1/3 grid place-items-center'>
                    <Button
                        title={<div className='flex justify-between'><div>Onslaught</div><div>3000 Points</div></div>}
                        handleAction={() => {
                            localStorage.setItem('size', 3000)
                            navigate(location.pathname +'/choose-name')}}
                        className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                    />
                </div>
            </div>

            <Footer
            />
        </div>

    )
}