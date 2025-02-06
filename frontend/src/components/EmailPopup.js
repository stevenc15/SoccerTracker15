import React, {useState} from 'react';

function EmailPopup({onSubmit, email, setEmail, message, onClose}){
    const [error, setError] = useState(null); //error flag



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkEmail_send = () => {
        if (!validateEmail){
            setError('invalid email');
            return;
        }
        setError(null);
        onSubmit();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"> 
        <div className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        <h3 className='text-3xl font-bold text-white mb-6 text-center'>Enter Email</h3>
                <input
                    type='email'
                    id='forgotPasswordEmail'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white outline-none mb-4"
                />
            <button type='button' onClick={checkEmail_send} className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors mb-4">
                Submit
            </button>
            <button type='button' onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">Close</button>
            {error && <p>{error}</p>}
        </div>
        </div>
    );
}

export default EmailPopup;