import React from 'react';

function ChangePasswordPopup({ onSubmit, username, setUsername, newPassword, setNewPassword, confirmPassword, setConfirmPassword, message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
            <h3>Change Password</h3>
            <input
                type='text'
                id='username'
                
                placeholder='Enter Username'
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required
            />
            <input
                type='password'
                id='newPassword'
                
                placeholder='New Password'
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                required
            />
            <input
            type="password"
            id="confirmPassword"
            
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
            <button type='button' onClick={onSubmit} className='submit-button'>
                Submit
            </button>
            <div className='spacer'></div>
            <button type='button' onClick={onClose} className='submit-button2'>Close</button>
            {message && <p className="popup-message">{message}</p>}
        </div>
    </div>
  );
}

export default ChangePasswordPopup;