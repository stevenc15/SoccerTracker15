import React from 'react';
import Register from '../components/register';
import { Link } from 'react-router-dom'; // Ensure you import Link from react-router-dom
//import './stylings/RegisterPage.css'; // Import the CSS file for RegisterPage styles
import squareLogo from './SquareLogo.png';

const RegisterPage = () => {

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">           
            <div className="w-full max-w-md">
            <Register />
            
        </div>
        </div>
    );
};

export default RegisterPage;
