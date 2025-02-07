import React, {useState} from 'react';
import {Upload, Play, LogIn, Menu, X} from 'lucide-react';
import LandingPage from './LandingPage.js';
import LoginPage from './LoginPage.js';
import HomePage from './HomePage.js';
import AboutPage from './AboutPage.js';
import RegisterPage from './RegisterPage.js';
import {useApp} from '../components/appContext.js';

const Layout = () => {
    const {currentPage, setCurrentPage, menuOpen, setMenuOpen} = useApp(); //access context

    //const [file, setFile] = useState(null);
    //const [processing, setProcessing] = useState(false);

    const Navigation = () => (
        <nav className="fixed w-full bg-black bg-opacity-90 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title/Logo and Side Menu  */}
                <div className="flex items-center justify-between h-16">
                    
                    {/* Title for home page */}
                    <button
                        onClick={() => setCurrentPage('landing')}
                        className="text-white text-xl font-medium"
                    >
                        TrackMate
                    </button>

                    {/* menu option to go to landing page */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => setCurrentPage('landing')}
                            className="text-white text-sm hover:text-gray-300 transition-colors"
                        >
                            Home
                        </button>
                    </div>

                    {/* menu option to go to about page */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => setCurrentPage('about')}
                            className="text-white text-sm hover:text-gray-300 transition-colors"
                        >
                            About
                        </button>
                    </div>

                    {/* menu option to go to login page */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => setCurrentPage('login')}
                            className="text-white text-sm hover:text-gray-300 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-white"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Side Menu*/}
            {menuOpen && (
                <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
                    
                    {/* button for landing page and on click go to page and close side menu*/}
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <button 
                            onClick={() => {setCurrentPage('landing'); setMenuOpen(false)}}
                            className="block w-full text-left px-3 py-2 text-white text-sm"
                        >
                            Home
                        </button>

                        {/* button for about page and on click go to page and close side menu*/}
                        <button 
                            onClick={() => {setCurrentPage('about'); setMenuOpen(false)}}
                            className="block w-full text-left px-3 py-2 text-white text-sm"
                        >
                            About
                        </button>

                        {/* button for login page and on click go to page and close side menu*/}
                        <button 
                            onClick={() => {setCurrentPage('login'); setMenuOpen(false)}}
                            className="block w-full text-left px-3 py-2 text-white text-sm"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            )}

        </nav>
    );

    //Layout setup, page navigation
    return (
        <div className="min-h-screen bg-black">
            <Navigation />
                {currentPage === 'landing' && <LandingPage/>}
                {currentPage === 'about' && <AboutPage/>}
                {currentPage === 'login' && <LoginPage/>}
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'register' && <RegisterPage />}
        </div>
    )
};


export default Layout;