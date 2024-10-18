import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';
export default function BasicTextFields({ title, setPassword, setEmail, handleAction, otherAuthentication, goToOtherAuthenticationPage }) {
    return (
        <div className='grid place-items-center text-white'>
            <div className="heading-container font-anton text-white text-2xl">
                <h3>
                    {title}
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Enter the Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter the Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    secureTextEntry={true}
                />
            </Box>

            <Button title={title} handleAction={handleAction}/>

            <div className='font-anton'>OR </div>

            <Button title={otherAuthentication} handleAction={goToOtherAuthenticationPage}/>

        </div>
    );
}