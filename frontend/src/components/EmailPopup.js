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
        <div className="popup-overlay3"> 
        <div className="popup3">
        <h3 className='enter-code-title'>Enter Email</h3>
                <input
                    type='email'
                    id='forgotPasswordEmail'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
            <div className="spacer"></div>
            <button type='button' onClick={checkEmail_send} className='submit-button'>
                Submit
            </button>
            <div className='spacer'></div>
            <button type='button' onClick={onClose} className='submit-button'>Close</button>
            {error && <p>{error}</p>}
        </div>
        </div>
    );
}

export default EmailPopup;