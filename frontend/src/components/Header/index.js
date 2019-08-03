import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import chemaliveLogo from '../../assets/images/logo_transparent.png';
import './index.css';
import { logout } from '../../store/actions/loginActions';


class Header extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout()); 
        this.props.history.push('/');
    }

    render() {
       
        return (
            <div className='header-wrapper'>
                <div className='header'>
                    <div className='luna_logo'>
                        <img src={chemaliveLogo} height='50px' alt="logo"/>
                    </div>
                    {this.props.token ?
                    <><div className='header_right'>
                    {/* <div className='link-div'><Link className='link' to='/'>Home</Link></div>
                    <div className='link-div'><Link className='link' to='/search'></Link></div> */}
                    <div className='link-div' onClick={()=> this.props.history.push('/prices/')}>Plans & Pricing</div>
                    <div className='link-div' onClick={()=> this.props.history.push('/userprofile/')}>My Profile</div>
                    <div className='link-div' onClick={()=> this.props.history.push('/projects/')}>My Projects</div>
                    
                    <button className='transpButton' onClick={this.handleLogout}>LOGOUT</button>
                </div> </>
                    : <> <div className='header_right'>
                    {/* <div className='link-div'><Link className='link' to='/'>Home</Link></div>
                    <div className='link-div'><Link className='link' to='/search'></Link></div> */}
                    <div className='link-div' onClick={()=> this.props.history.push('/')}>About Us</div>
                    
                    <div className='link-div'>Team</div>
                    <button onClick={()=> this.props.history.push('/login/')} className='transpButton'>SIGN IN</button>
                </div> </>
                    }
                    

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
   
    return {
        token: state.loginReducer.token,
    }
};

export default withRouter(connect(mapStateToProps)(Header));
