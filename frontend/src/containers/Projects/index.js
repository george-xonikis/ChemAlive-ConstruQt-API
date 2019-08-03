import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getProjectsList} from '../../store/actions/projectAction';
import {getUserProfile} from '../../store/actions/premiumUserAction';
import ProjectCard from './ProjectCard';
import ProjectsHeader from '../../components/ProjectsHeader';
import NewProject from './NewProject';
import './index.css';
import {searchAction} from '../../store/actions/searchAction'


class Projects extends Component {
    state = {
        showModal: false,
        request: '',
    };

    componentDidMount = () => {
        // console.log('projects', this.props)
        // if (this.props.location.search && !this.props.location.search.startsWith('?/reloaded_')) {
        //     console.log("was here", this.props.location.search)
        //     let path = this.props.location.search.slice(1, this.props.location.search.length)
        //     console.log('path', path)
        //     window.location.search = '?/reloaded_' + path
        // } else if (this.props.location.search && this.props.location.search.startsWith('?/reloaded_')) {
        //     console.log("was there")
        //     let path = this.props.location.search.slice(11, this.props.location.search.length)
        //     setTimeout(()=>this.props.history.push(path), 1000)
        // }
        let application = document.querySelector('[role=application]')
        application.hidden = true
        this.props.dispatch(getProjectsList());
        this.props.dispatch(getUserProfile());
    };

    modalHandler = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    handleUserInput = (e) => {
        const request = e.target.value;
        this.setState({request});
    };

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.state.request)
        this.props.dispatch(searchAction(this.state.request)).then(res => {
            if (res) {
                this.props.history.push(`/projects/search/${this.state.request}`)
            }
        })
    }


    //     // this.props.dispatch(logout()).then(res => {
    //     // if (res) {
    //     //   this.props.history.push("/");
    //     // }
    // });

    render() {
        return (
            <div className='main-wrapper'>

                {this.state.showModal ? (
                    <NewProject modalHandler={this.modalHandler}/>
                ) : null}
                <ProjectsHeader/>
                <div className='projects-wrapper'>
                    <div className='projects-subheader'>
                        <div className='title-wrapper'>
                            <h1 className='title-projects'>My Projects</h1>
                            <button className='small-button' onClick={this.modalHandler}>Create project</button>
                        </div>

                        <div>
                            <form onSubmit={this.handleSearch} className='col s12'>
                                <div>
                                    <div className='input-field col s12' style={{width: '300px'}}>
                                        <input
                                            // placeholder="Search by name"
                                            id="search"
                                            value={this.state.request}
                                            onChange={this.handleUserInput}
                                            type="text"
                                            className="validate"/>
                                        <label htmlFor='search'>Search</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="projects">
                        {this.props.projects ? (
                            this.props.projects.map(project => {
                                return <ProjectCard key={project.id} project={project}/>;
                            })
                        ) : (
                            <h4>You don't have any project.</h4>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        projects: state.projectsReducer.projectsList
    }
};

export default connect(mapStateToProps)(Projects);
