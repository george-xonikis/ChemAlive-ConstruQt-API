import React from 'react';
import './index.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const UpgradeStatusModal = (props) => {
    return (
        <div className='upgrade-status-modal-container'>
            <div className='upgrate-status-interior-container'>
                <div className='upgrade-status-card'>
                    <div className='text-delete'>Your status has been successfully upgrated to premium!</div>
                    <div className='buttons'>
                        <button className='small-button' onClick={ () => props.history.push('/projects/')}>Back to projects</button>
                        {/* <button onClick={ () => setTimeout(() => props.history.push('/projects/list/'), 1000)}>Back to projects</button> */}
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default withRouter(connect()(UpgradeStatusModal));