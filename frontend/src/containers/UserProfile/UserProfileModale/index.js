import React from 'react';
import './index.css'

const UserProfileModal = props => {
    return (
        <div className='user-profile-modal-main-container'>
            <div className='user-profile-modal-interior-container'>
                <div className='status'>
                    <div className='text-delete'>
                        Your profile has been saved successfully.
                </div>
                    <div className='buttons'>
                        
                        <button className='small-button' onClick={() => props.userProfileModalHandler()}>OK</button>
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default UserProfileModal;