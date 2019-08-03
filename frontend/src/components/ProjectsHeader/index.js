import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import chemaliveLogo from "../../assets/images/logo_transparent.png";
import "./index.css";
import { logout } from "../../store/actions/loginActions";

class ProjectsHeader extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
        this.props.history.push('/');
    }

    render() {

        return (
            <div className='header-wrapper'>
                <div className='project_header'>
                    <div className='logo_small'>
                        <Link to='/'><img src={chemaliveLogo} height='30px' alt="logo" /></Link>
                    </div>
                    {this.props.project ?
                        <><div className='header_right'>
                            {/* <div className='link-div'><Link className='link' to='/'>Home</Link></div> */}
                            {/* <div className='link-div'>{this.props.project.name}</div> */}
                            <div className='link-small-div' onClick={()=> this.props.history.push('/prices/')}>Plans & Pricing</div>
                            <div className='link-small-div' onClick={()=> this.props.history.push('/projects/')}>Projects</div>
                            <div className='link-small-div' onClick={()=> this.props.history.push('/userprofile')}>My profile</div>

                            <button className='transpButton' onClick={this.handleLogout}>LOGOUT</button>
                        </div></>
                        : <><div className='header_right'>
                            <div className='link-small-div'><Link className='link_text' to='/'>Home</Link></div>
                          
                            <div className='link-small-div'><Link className='link_text' to='/projects/'>My projects</Link></div>

                            <button onClick={this.handleLogout}>LOGOUT</button>
                        </div></>
                    }




                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        project: state.projectsReducer.projectProfile,
    }
};

export default withRouter(connect(mapStateToProps)(ProjectsHeader));
