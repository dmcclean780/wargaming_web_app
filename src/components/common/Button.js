import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons({title, handleAction, className='bg-cam-blue px-2 py-1 rounded-lg font-anton text-white'}) {
    return (
        <button className={className} onClick={handleAction}>{title}</button>
    );
}