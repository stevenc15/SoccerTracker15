import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './stylings/LandingPage.css'; // Import the CSS file
import {Box, Button, Typography} from '@mui/material';
import originalImage from '../components/input_example.jpg';
import transformedImage from '../components/output_example.jpg';
import roundLogo from './Round-logo.png';
import squareLogo from './SquareLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

//Landing page contains just the app title and a button link to login page 
const LandingPage = () => {
    // Set static image URLs or local assets for original and transformed images

    return (
        <div className="landing-containe">
            {/*logo section*/}
            <div className="title-container">                
                <img src={squareLogo} alt="TrackMate Logo" className="logo"/>
            </div>

            {/*get started button*/}
            <div className="content-container">
                <div className="content">
                    <Link to="/login">
                        <button className="cta-butto">Get Started</button>
                    </Link>
                </div>
            </div>

            {/* Lower Section for Image Display and Explanation */}
            <div className="lower-container">

                {/* Left Side for Original Image */}
                <div className="image-container">
                    <h3>Original Image</h3>
                    <a href={originalImage} target="_blank" rel="noopener noreferrer">
                        <img src={originalImage} alt="Original" className="image-display" />
                    </a>
                </div>                

                {/* Arrow Button in between */}
                <div className="arrow-container">
                    <span className="arrow">&#8594;</span>
                </div>

                {/* Right Side for Transformed Image */}
                <div className="image-container">
                    <h3>Tracked Image</h3>
                    <a href={transformedImage} target="_blank" rel="noopener noreferrer">
                        <img src={transformedImage} alt="Transformed" className="image-display" />
                    </a>
                </div>

            </div>


            {/* Explanation Text */}
            <div className="explanation-container">
                <h3>What does the TrackMate app do?</h3>
                <p>
                    This tool tracks players, referees and monitors/measures team possession and camera movement. It is a great tool for coaches, 
                    scouts, players and enthusiasts for better understanding of the dynamics of the game
                </p>
                <p>
                    It also provides special tracking for the player on the ball by providing a special red 
                    triangle to point out the player in possession and thus the team in possession.
                </p>
            </div>
            
            <div className="spacer"></div>

        </div>
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