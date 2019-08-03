import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectCard from '../Projects/ProjectCard';
import ProjectsHeader from '../../components/ProjectsHeader';
import {searchAction} from '../../store/actions/searchAction'
import './index.css'



class SearchResults extends Component {

    componentDidMount = () => {
        this.props.dispatch(searchAction(this.props.match.params.search));
    };

  
  render() {

    console.log(this.props)
    return (
      <div className='main-wrapper'>
        
        <ProjectsHeader />
        <div className='projects-wrapper'>
          <div className='projects-subheader'>
            <div className='title-wrapper'>
              <h1 className='title-projects'>Search results</h1>
              
            </div>
          </div>


          <div className="projects">
            {this.props.projects.length ? (
              this.props.projects.map(project => {
                return <ProjectCard key={project.id} project={project} />;
              })
            ) : (
                <h4>Sorry, we couldn't find any matching projects</h4>
              )}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    projects: state.projectsReducer.search_results
  }
};

export default connect(mapStateToProps)(SearchResults);
