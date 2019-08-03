import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';

import './index.css';
import icon from '../../../assets/images/chemistry.png'


class ProjectCard extends Component {


    render() {
        return (
            <div className='project-card'>
                <div className='project-subheader'>
                    <h2 className='project-title'>{this.props.project.name}</h2>
                    <img src={icon} height='50px' alt='molecule' />
                </div>
                <div className='project-details'>
                    <p className='project-card-text-bold'>Owner: <span className='project-card-text'>{this.props.project.owner.username}</span></p>
                    { this.props.project.collaborators.length ? <p className='project-card-text-bold'>Collaborators:</p> : null }
                    {this.props.project.collaborators ? (
                    this.props.project.collaborators.map(collaborator => {
                        return <p key={collaborator.collaboration_id} className='project-card-text'>{collaborator.username}</p>

                    })): null
                    }
                    <p className='project-card-text-bold'>Created: <span className='project-card-text'>{moment(this.props.project.created).format('MMMM Do YYYY, H:MM')}</span></p>
                    <p className='project-card-text-bold'>Updated: <span className='project-card-text'>{moment(this.props.project.updated).format('MMMM Do YYYY, H:MM')}</span></p>
                </div>
                <div className='project-card-footer'>
                    <Link className='project-link' to={`/projects/${this.props.project.id}`}>View project</Link>
                </div>
                

            </div>
        )
    }
}

export default connect()(ProjectCard);
