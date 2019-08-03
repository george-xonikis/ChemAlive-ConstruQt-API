import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import './index.css';
import { sendInvite } from '../../../store/actions/collaborationAction';
import { deleteCollaboration } from '../../../store/actions/collaborationAction';
import { getProjectProfile } from '../../../store/actions/projectAction';

class ProjectSettings extends Component {

    state = {
        collaborator: '',
        project_id: this.props.project.id
    }

    handleUserInput = (e) => {
        
        const collaborator = e.target.value;
        const project_id = this.props.project.id;
        this.setState({ collaborator, project_id });
    };

    handleInvitation = (e) => {
        e.preventDefault();
        this.props.dispatch(sendInvite(this.state)).then(res => {
            if (res) {
                this.props.dispatch(getProjectProfile(this.state.project_id));
            }
        });
        this.setState({collaborator: ''})

    }

    handleDeleteCollaborator = (id, project_id) => {
        this.props.dispatch(deleteCollaboration(id, project_id)).then(res => {
            if (res) {
                this.props.dispatch(getProjectProfile(project_id));
                // this.props.showSettingsModal();     
            }
        });
    }


    render() {
        return (
            <div className='settings-modal-main-container'>
                <div className='settings-modal-interior-container'>
                    <div className='title_settings'>Settings</div>
                    <table className='striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.project.owner.username}</td>
                                <td>owner</td>
                                <td></td>
                            </tr>
                            {this.props.collaborators.map(collaborator => {
                                return <tr key={collaborator.collaboration_id}>
                                    <td>{collaborator.username}</td>
                                    <td>collaborator</td>
                                    <td><button className='delete-collaborator-button' onClick={() => this.handleDeleteCollaborator(collaborator.collaboration_id, this.props.project.id)}>Delete</button></td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    {/* <p>Owner: {this.props.project.owner.username} </p>
                            <div>
                                <p>Collaborators: </p>
                                {this.props.collaborators.map(collaborator => {
                                    return <div key={collaborator.collaboration_id}>
                                        <p>{collaborator.username}</p>
                                        <button onClick={() => this.handleDeleteCollaborator(collaborator.collaboration_id, this.props.project.id)}>Delete collaborator</button>
                                    </div>
                                })}

                            </div>
                            <p>Created: {moment(this.props.project.created).format('MMMM Do YYYY, H:MM')} </p>
                            <p>Updated: {moment(this.props.project.updated).format('MMMM Do YYYY, H:MM')} </p> */}
                    <div className='settings-footer'>
                        <form className='invitation-form' onSubmit={this.handleInvitation}>
                            <div className='input-field col s12' style={{ width: '300px' }}>
                                <input
                                    type='email'
                                    id='invite'
                                    // placeholder='Invite collaborator (optional)'
                                    value={this.state.collaborator}
                                    onChange={this.handleUserInput}
                                    required
                                />
                                <label htmlFor='invite'>Invite collaborator by email</label>
                                <div className='settings-buttons'>
                                    <button className='small-button' onClick={this.handleInvitation}>Send invitation</button>
                                    <button className='small-button' onClick={() => this.props.settingsModalHandler()}>Back</button>
                                </div>

                            </div>
                        </form>



                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        project: state.projectsReducer.projectProfile,
        collaborators: state.projectsReducer.collaborators
    }
};

export default withRouter(connect(mapStateToProps)(ProjectSettings));
