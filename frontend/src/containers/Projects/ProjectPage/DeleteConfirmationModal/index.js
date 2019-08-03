import React from 'react';
import './index.css'

const DeleteConfirmationModal = props => {
    return (
        <div className='delete-modal-main-container'>
            <div className='delete-modal-interior-container'>
                <div className='status'>
                    <div className='text-delete'>
                        Are you sure want to delete this project?
                </div>
                    <div className='buttons'>
                        <button className='small-button' onClick={() => props.handleDelete(props.projectId)}>Yes</button>
                        <button className='small-button' onClick={() => props.deleteModalHandler()}>No</button>
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default DeleteConfirmationModal;