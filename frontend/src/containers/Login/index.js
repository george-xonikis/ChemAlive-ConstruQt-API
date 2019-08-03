import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loginAction } from "../../store/actions/loginActions";
import './index.css';
import logo from '../../assets/images/Logo2.png';

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  // single handler for all inputs
  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  login = e => {
    e.preventDefault();
    this.props.dispatch(loginAction(this.state)).then(res => {
      if (res) {
        this.props.history.push("/projects/");
      }
    });
  };

  render() {
    return (
      <div className='loginPage'>
     
          <div>
            <div className='image-container'>
              <img src={logo} height='100px' alt='chemalive_logo' />
            </div>

            <form onSubmit={this.login}>
              <div className='input-field'>
                <input
                  id='username'
                  style={{ color: "white" }}
                  type="text"
                  value={this.state.username}
                  // placeholder="Username"
                  name="username"
                  onChange={this.handleUserInput}
                />
                <label htmlFor='username'>Username</label>
              </div>
              <br />
              <div className='input-field'>
                <input
                  style={{ color: "white" }}
                  id='password'
                  type="password"
                  value={this.state.password}
                  // placeholder="Password"
                  name="password"
                  onChange={this.handleUserInput}
                />
                <label htmlFor='password'>Password</label>
              </div>
              <div className='login-buttons'>
                <button className='login-transpButton' onClick={this.login}>Login</button>
                <Link to='/registration'><button className='signup_button'>Sign Up</button></Link>
              </div>

              {/* <button onClick={this.saveChangesHandler}>Save changes</button> */}
            </form>
          </div>

        </div>
    );
  }
}

export default connect()(Login);
