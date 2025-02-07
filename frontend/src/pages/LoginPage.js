import React, {useEffect} from 'react';
import Login from '../components/login';
//import './stylings/LoginPage.css'; // Import the CSS file
import {Box, Button, Typography} from '@mui/material';
import squareLogo from './SquareLogo.png';

//log in title, and login component
import {useLocation} from 'react-router-dom';
const LoginPage = () => {
const location = useLocation();

useEffect(()=>{
    document.cookie='token=; expires=Thu, 01 Jan 2001 00:00:00 UTC; path=/;';
}, [location])

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            
            {/* title container & sign in input container */}
            <div className="max-w-md mx-auto px-6">
            
                {/* title container */}
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Sign In
                </h2>

                {/* sign in container */}
                <Login />

            </div>

        </div>
        
    );
};

export default LoginPage;