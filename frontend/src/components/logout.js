import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useApp} from './appContext';
//import './stylings/logout.css'
import {Box, Button, Typography} from '@mui/material';

function Logout(){
    const navigate = useNavigate();
    const {setUserId} = useApp();

    const handleLogout=()=>{
        setUserId(null);
        navigate('/login');
    };

    return(

        <button onClick={handleLogout} className='
        px-4 py-2 
        bg-gray-800 
        text-white 
        rounded-lg 
        hover:bg-gray-700 
        transition-colors
        mt-20
      '>
            Logout
        </button>
    );

};

export default Logout;