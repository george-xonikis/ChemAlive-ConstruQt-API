import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.css";

import { newProject } from "../../../store/actions/projectAction";
import { getProjectsList } from '../../../store/actions/projectAction';

class NewProject extends Component {
  state = {
    name: ""
  };

  create = e => {
    e.preventDefault();
    this.props.dispatch(newProject(this.state)).then(res => {
      if (res) {
        this.props.dispatch(getProjectsList());
        this.props.modalHandler();
      }
    });
    //this.setState({name: ''})
  };

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    return (
      <div className="new-project-main-container">
        <div className="new-project-interior-container">

          <div>
            {this.props.projects && this.props.projects.length >= 2 && !this.props.userStatus ? (
              <div className='status'>
                <h2 className='title_small'>Upgrade to premium</h2>
                <p className='text'>
                  You have already created two projects fo free. Do you want to
                  continue as premium user?
                </p>
                <div className='buttons'>
                  <button className='small-button' onClick={() => this.props.history.push("/prices")}>Yes</button>
                  <button className='small-button' onClick={this.props.modalHandler}>No</button>
                </div>
              </div>
            ) : (
                <div>
                  <h2 className='title_small'>Create a new project</h2>
                  <form className="project_input" onSubmit={this.create}>
                    <div className='input-field'>
                      <input
                        type="text"
                        id='project'
                        // placeholder="Insert project name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleUserInput}
                        className="validate"
                        required
                      />
                      <label htmlFor='project'>Project name</label>
                    </div>


                    <br />
                    <div className='buttons'>
                      <button className='small-button'>Create project</button>
                      <button className='small-button' onClick={() => this.props.modalHandler()}>
                        Cancel
                    </button>
                    </div>
                  </form>

                </div>
                // <form onSubmit={this.create}>
                //   <h2 className='title_small'>Create a new project</h2>
                //     <div className="row">
                //       <form className="col s12">
                //         <div className="row">
                //           <div className="input-field col s12">
                //             <input
                //               id="project"
                //               type="text"
                //               name='project'
                //             // className="validate"
                //               value={this.state.name}
                //               onChange={this.handleUserInput}
                //               required
                //             />
                //             <label htmlFor="project">Project name</label>
                //         </div>
                //       </div>
                //     </form>
                //   </div>
                //   <div className='buttons'>
                //     <button className='small-button'>Create project</button>
                //     <button className='small-button' onClick={() => this.props.modalHandler()}>
                //       Cancel
                //     </button>
                //   </div>
                //  </form>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projectsReducer.projectsList,
    userStatus: state.premiumUserReducer.premiumUser
  };
};

export default withRouter(connect(mapStateToProps)(NewProject));
