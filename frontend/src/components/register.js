import React, {useState} from 'react';
//import './stylings/register.css';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../components/appContext.js';
const apiUrl = 'https://soccertracker15-production.up.railway.app';

console.log("API URL:", apiUrl);
const Register = () => {
 
    //usestates for key variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {setCurrentPage} = useApp();

    //v code usestate
    const [verificationCode, setVerificationCode ]= useState('');

    //message useStates
    const [errorMessage, setErrorMessage] = useState('');
    const [verificationErrorMessage, setVerificationErrorMessage] = useState('')

    //enter email verification box usestate
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);

    //what use?
    const [overlayActive, setOverlayActive] = useState(false);

    //navigate to other pages
    const navigate = useNavigate();
    
    //function to call register endpoint
    const callRegister = async (event)=>{
        event.preventDefault(); //investiga

        // Reset error message
        setErrorMessage('');

        //check for username, password, email presence 
        if (!username || !password || !email) {
            setErrorMessage('All input fields must be filled.');
            return;
          }

        //password restrictions
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)){
            setErrorMessage('Password must contain at least 8 characters, one uppercase letter, one number, one lowercase letter, and one special character.');
            return;
        }

        try {
            
            //set input
            const obj = {
                username:username, 
                password:password,
                email: email
            };
            const js = JSON.stringify(obj)

            //send credentials to register endpoint
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                credentials: 'include', // If your API requires cookies/sessions
                body: js,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //check response
            if (response.status === 200) {
                setShowVerificationPopup(true);
                setOverlayActive(true);
            } else if (response.status === 400) {
                setErrorMessage('User already exists');
            } else if (response.status === 500) {
                setErrorMessage('A server error has occurred.');
            } else {
                setErrorMessage('Unknown error');
            }

            //error
        }catch(error){
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    // Function to close overlay and verification popup
    const closeOverlay = () => {
        setOverlayActive(false);
        setShowVerificationPopup(false);
    };

    //function to check verification code
    const checkVerification = async (event) =>{
        event.preventDefault(); //investigate use

        //set input
        const obj = {emailVtoken: verificationCode};
        const js = JSON.stringify(obj);

        // Reset verification code error
        setVerificationErrorMessage('');

        try{

            //send credentials to end point
            const response = await fetch(`${apiUrl}/users/verifyEmail`, {
                method: 'POST',
                body: js,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //check response 
            if (response.status === 200) {
                navigate('/login');
              } else if (response.status === 400) {
                setVerificationErrorMessage('Invalid verification code');
              } else if (response.status === 500) {
                setVerificationErrorMessage('A server error has occurred.');
              } else {
                setVerificationErrorMessage('Unknown error');
              }

              //error
        }catch(error){
            setVerificationErrorMessage('An error occurred. Please try again.');
        }
    };

    //make webpage
  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
    {/* Add the overlay with conditional active class */}
    <div className='w-full max-w-md'>
    {/* Headings */}
    <h2 className="text-4xl font-bold text-center mb-6">Register</h2>

    {/* input section */}
    <form onSubmit={callRegister} className="space-y-4">
        
         {/* Username */}
        <input 
            type="text"
            className={`w-full p-4 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none 
            ${errorMessage ? 'border-2 border-red-500' : ''}`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />

        {/* Password */}
        <input
            type="password"
            className={`w-full p-4 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none
                ${errorMessage ? 'border-2 border-red-500' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        {/* Email */}
        <input
            type="email"
            className={`w-full p-4 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none
                ${errorMessage ? 'border-2 border-red-500' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

        {/* Submit button */}
        <button type="submit" className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors mt-2">Submit</button>
    </form>

    {/* Display message */}
    <p className='text-red-400 text-center text-sm mt-4'>{errorMessage}</p>

    {/* Enter email verification code */}
    {showVerificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" onClick={closeOverlay}>X</button>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Enter Verification Code From Email</h2>
                <form onSubmit={checkVerification}>
                    <input
                        type="text"
                        className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button type="submit" className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">Verify</button>
                </form>
                {verificationErrorMessage && (
              <p className="text-red-400 text-center text-sm mt-2">
                {verificationErrorMessage}
              </p>
                )}
            </div>
        </div>
    )}

    <div className="mt-2 text-center">
        <p className='text-gray-400'>Already have an account?</p>
        <button onClick={()=>setCurrentPage('login')} className="text-white hover:underline hover:text-gray-300 transition-colors">Switch to Login</button>
    </div>
</div>
</div>
);
    
};

export default Register;