import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import './stylings/LandingPage.css'; // Import the CSS file
//import originalImage from '../components/input_example.jpg';
//import transformedImage from '../components/output_example.jpg';
//import roundLogo from './Round-logo.png';
//import squareLogo from './SquareLogo.png';
//import 'bootstrap/dist/css/bootstrap.min.css';

import {useApp} from '../components/appContext.js';
//import demoVideo from './demoVid.mp4';
import exampleVideo from './Example.mp4';

//Landing page contains just the app title and a button link to login page 
const LandingPage = () => {
    const {setCurrentPage} = useApp();

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-32 px-6 max-w-7xl mx-auto">

                {/* title container and get started button */}
                <div className='text-center space-y-6'>
                    <h1 className="text-6xl font-bold tracking-tight">
                        Your Skills. Your Highlights. Your Future.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Revolutionary AI-powered soccer highlight tool that tracks your movements, making it easier to share and be seen.
                    </p>
                    <button
                        onClick={() => setCurrentPage('login')}
                        className="mt-8 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                    </button>
                </div>

                {/* placeholder for demo video */}
                <div className="mt-24 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    {/* placeholder for video */}
                    <video 
                        className="w-full h-full object-contain"
                        controls
                        src={exampleVideo} 
                    />
                    </div>
                </div>

            </div>
        //</div>

    );
};

export default LandingPage;
/*
//Landing page contains just the app title and a button link to login page 
const LandingPage = () => {

    return (
        <div className="landing-container">
            <Box className="content">
                <Typography className="app-title">Soccer Tracker</Typography>
                <Link to='/login' classname='link-style'>
                    <Button className="cta-button">Login</Button>
                </Link>
            </Box>
        </div>
    );
};

export default LandingPage;
*/