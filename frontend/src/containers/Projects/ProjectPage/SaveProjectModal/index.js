import React from 'react';
import './index.css'

const SaveProjectModal = props => {
    return (
        <div className='delete-modal-main-container'>
            <div className='delete-modal-interior-container'>
                <div className='status'>
                    <div className='text-delete'>
                        Your project has been saved successfully.
                </div>
                    <div className='buttons'>
                        
                        <button className='small-button' onClick={() => props.saveProjectModalHandler()}>OK</button>
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default SaveProjectModal;