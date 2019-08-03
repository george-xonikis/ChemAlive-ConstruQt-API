import React, {Component} from 'react';
import {connect} from 'react-redux';
// import { withRouter, Link } from "react-router-dom";

import {getProjectProfile} from '../../../store/actions/projectAction';
import {deleteProject} from '../../../store/actions/projectAction';
import App from '../../../App';
// import {sendInvite} from '../../../store/actions/collaborationAction';
// import {deleteCollaboration} from '../../../store/actions/collaborationAction';
import {saveProject} from '../../../store/actions/projectAction';
import ProjectsHeader from '../../../components/ProjectsHeader'
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import './index.css';
// import settings from '../../../../src/assets/images/gear.svg';
import ProjectSettings from '../ProjectSettings'
import SaveProjectModal from './SaveProjectModal';


class ProjectPage extends Component {

    state = {
        collaborator: '',
        project_id: this.props.project.id,
        showDeleteModal: false,
        showSettingsModal: false,
        showSaveProjectModal: false
    };

    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.props.dispatch(getProjectProfile(id));
        
        let application = document.querySelector('[role=application]')
       
        application.hidden = false
        application.style.position = 'absolute'
        application.style.marginTop = '10%'
        application.style.height = '90%'
        application.style.zIndex = '1000'
        application.style.width = '50%'
        // application.style.top = '0'
        // application.style.left = '0'


    };

    handleDelete = (id) => {
        let application = document.querySelector('[role=application]')
        application.hidden = true
        this.props.dispatch(deleteProject(id))
            .then(res => {
                if (res) {
                    this.props.history.push("/projects/");
                }
            });

    };

    deleteModalHandler = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        })
    };

    settingsModalHandler = () => {
        this.setState({
            showSettingsModal: !this.state.showSettingsModal
        });
       
    }

    saveProjectModalHandler = () => {
        this.setState({
            showSaveProjectModal: !this.state.showSaveProjectModal
        })
    }


    reloadKetcher = () => {
        // console.log(this.props.location.pathname)
        this.props.history.push({
            pathname: '/waiting',
            search: `${this.props.location.pathname}`,
        })
    }

    save = (id, smiles) => {
        // alert('Project has been saved.')
        let application = document.querySelector('[role=application]')
       
        application.hidden = true
        this.props.dispatch(saveProject(id, smiles));
        this.saveProjectModalHandler()
    }

    render() {
        return (
            <>
                
                {this.state.showSettingsModal ? <ProjectSettings project_id={this.props.project.id} settingsModalHandler={this.settingsModalHandler} /> : null}
                {this.state.showSaveProjectModal ? <SaveProjectModal project_id={this.props.project.id} smiles={this.props.smiles} save={this.save} saveProjectModalHandler={this.saveProjectModalHandler} /> : null }
                {this.state.showDeleteModal ? <DeleteConfirmationModal projectId={this.props.project.id} handleDelete={this.handleDelete} deleteModalHandler={this.deleteModalHandler}/> : null}
                <ProjectsHeader/>
                <div className='project-page-wrapper'>
                {
                    this.props.project.owner ?
                        <div className='project-page-subheader'>
                            <div className='project-name-section'>

                                <div className='project-name'>{this.props.project.name}</div>
                                <button className='blue-project-button'  style={{ margin: '0 20px 0 0' }} onClick={this.settingsModalHandler}>Project settings</button>
                                <button className='show-ketcher-button' onClick={this.reloadKetcher}>Show Ketcher</button>
                            </div>

                            <div className='project-buttons'>
                                <button className='small-button' style={{ margin: '0 20px 0 0' }} onClick={this.deleteModalHandler}>Delete project</button>
                                <button className='small-button' onClick={() => this.save(this.props.project.id, this.props.smiles)}>Save project</button>
                                {/* <button className='small-button' onClick={this.saveProjectModalHandler}>Save project</button> */}
                            </div>

                       
                        </div> : <h4>Projects details are loading</h4>

                }


                <App />

                {/* <button onClick={this.deleteModalHandler}>Delete project</button>
                <button onClick={() => this.save(this.props.project.id, this.props.smiles)}>Save project</button> */}
               
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {

    return {
        project: state.projectsReducer.projectProfile,
        collaborators: state.projectsReducer.collaborators,
        smiles: state.ketcherReducer.smiles
    }
};

export default connect(mapStateToProps)(ProjectPage);
