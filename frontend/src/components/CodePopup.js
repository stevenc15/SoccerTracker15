import React from 'react';

function CodePopup({onSubmit, code, setCode, message, onClose}){

    return (
        <div className="popup-overlay2">
        <div className="popup2">
            <h3 className='enter-code-title'>Enter Code</h3>
            <input
            type='text'
            id='enterCode'
            placeholder='Check email for code'
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            required
            />
            <button type='button' onClick={onSubmit} className='submit-button'>
                Submit
            </button>
            <div className='spacer'></div>
            <button type='button' onClick={onClose} className='submit-button'>Close</button>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
}
export default CodePopup;