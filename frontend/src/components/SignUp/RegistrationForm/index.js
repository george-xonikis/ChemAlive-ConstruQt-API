import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendData} from '../../../store/actions/signUpAction';
import './index.css';
import { withRouter } from 'react-router'
import RedirectModal from "../RedirectModal";

class RegistrationForm extends Component {
    state = {
        email: '',
        validation_code: '',
        username: '',
        password: '',
        password_repeat: '',
        showRedirectionModal: false
    };

    handleUserInput = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    };


   send = (e) => {
        e.preventDefault();
        this.props.dispatch(sendData(this.state));
        if (this.state.error_message) {
            this.setState({showRedirectionModal: !this.state.showRedirectionModal});
            setTimeout(() => this.props.history.push('/login'), 2000);
        }

    };

    render() {
        const isEnabled = this.state.password === this.state.password_repeat;
        return (
            <div className='Sign-up-main-container'>
                { this.state.showRedirectionModal && <RedirectModal/> }
               <form className='Sign-up-form-container' onSubmit={ this.send }>
                       <div id='input-row' className="input-field col s12">
                           <input
                               id="email"
                               type="email"
                               name='email'
                               className="validate"
                               value={this.state.email}
                               onChange={this.handleUserInput}
                               required
                           />
                           <label htmlFor="email">Email</label>
                       </div>
                       {this.props.error_message && this.props.error_message.email
                           ? <p className='error-messsage'>{this.props.error_message.email}</p>
                           : null}

                       <div id='input-row' className="input-field col s12">
                           <input
                               type="text"
                               id="validaton_code"
                               name='validation_code'
                               className="validate"
                               value={this.state.validation_code}
                               onChange={this.handleUserInput}
                               required
                           />
                           <label htmlFor="validation_code">Activation Code</label>
                       </div>
                       {this.props.error_message && this.props.error_message.code
                           ? <p className='error-messsage'>{this.props.error_message.code}</p>
                           : null
                       }
                       <div id='input-row' className="input-field col s12">
                           <input
                               type="text"
                               id="username"
                               name='username'
                               className="validate"
                               value={this.state.username}
                               onChange={this.handleUserInput}
                               required
                           />
                           <label htmlFor="username">Username</label>
                       </div>
                       {this.props.error_message && this.props.error_message.username
                           ? <p className='error-messsage'>{this.props.error_message.username}</p>
                           : null
                       }
                   <div id='input-row' className="input-field col s12">
                       
                           <input id="password"
                                  type="password"
                                  className="validate"
                                  name='password'
                                  value={this.state.password}
                                  onChange={this.handleUserInput}
                                  required
                           />
                               <label htmlFor="password">Password</label>
                       </div>
                       {this.props.error_message && this.props.error_message.password
                       ? <p className='error-messsage'>{this.props.error_message.password}</p>
                       : null
                   }
                
                   <div id='input-row' className="input-field col s12">
                       
                           <input id="password"
                                  type="password"
                                  className="validate"
                                  name='password_repeat'
                                  value={this.state.password_repeat}
                                  onChange={this.handleUserInput}
                                  required
                           />
                           <label htmlFor="password_repeat">Repeat Password</label>
                       </div>
                   
                   {!isEnabled ? <p className='error-messsage'>Passwords do not match</p> : null}
                   
                   {this.props.error_message && this.props.error_message.password_repeat
                       ? <p className='error-messsage' >{this.props.error_message.password_repeat}</p>
                       : null
                   }
                  
                   <button className='create-account-button' onClick={this.send} >Create Account</button>
                   {/* <button className='small-button' onClick={this.send} disabled={!isEnabled}>Create Account</button> */}
                </form> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error_message: state.signUpReducer.error_message,
    }
};

export default withRouter(connect(mapStateToProps)(RegistrationForm));

// const {error_message} = this.props

// if (error_message && error_message.email) {
//     alert(error_message.email);
// }

// if (error_message && error_message.code) {
//     alert(error_message.code)
// }

// if (error_message && error_message.username) {
//     alert(error_message.username)
// }

//     if (error_message && error_message.password) {
//         alert(error_message.password)
//     }

//     if (error_message && error_message.password_repeat) {
//         alert(error_message.password_repeat)
//     }


// {/*<input */}
// {/*type='email' */}
// {/* placeholder="Insert your email"*/}
// {/* name='email'*/}
// {/*className='validate'*/}
// {/* // value={this.state.email}*/}
// {/* // onChange={this.handleUserInput}*/}
// {/* required*/}
// {/*/>*/}
// {/*{this.props.error_message && this.props.error_message.email */}
// {/*? <span>{this.props.error_message.email}</span>*/}
// {/* : null*/}
// {/* }*/}


// {/*<input*/}
// {/*type='password' */}
// {/* placeholder='Repeat password'*/}
// {/* name='password_repeat'*/}
// {/* value={this.state.password_repeat}*/}
// {/* onChange={this.handleUserInput}*/}
// {/* required*/}
// {/*/>*/}
// {/*{!isEnabled ? <span>Passwords do not match</span> : null}*/}
// {/*{this.props.error_message && this.props.error_message.password_repeat */}
// {/*? <span>{this.props.error_message.password_repeat}</span>*/}
// {/* : null*/}
// {/* }*/}


// {/*<input */}
// {/* type='password' */}
// {/*  placeholder='Password'*/}
// {/*  name='password'*/}
// {/*  value={this.state.password}*/}
// {/*  onChange={this.handleUserInput}*/}
// {/*  required*/}
// {/* />*/}
// {/* {this.props.error_message && this.props.error_message.password */}
// {/* ? <span>{this.props.error_message.password}</span>*/}
// {/*  : null*/}
// {/*  }*/}


// {/*<input */}
// {/*type='text' */}
// {/* placeholder='Username'*/}
// {/* name='username'*/}
// {/* value={this.state.username}*/}
// {/* onChange={this.handleUserInput}*/}
// {/* required*/}
// {/*/>*/}
// {/*{this.props.error_message && this.props.error_message.username */}
// {/*? <span>{this.props.error_message.username}</span>*/}
// {/* : null*/}
// {/* }*/}



// {/*<input */}
// {/*// type='text' */}
// {/*//  placeholder='Activation Code'*/}
// {/*//  name='validation_code'*/}
// {/*//  value={this.state.validation_code}*/}
// {/*//  onChange={this.handleUserInput}*/}
// {/*//  required*/}
// {/*/>*/}
// {/*{this.props.error_message && this.props.error_message.code */}
// {/*? <span>{this.props.error_message.code}</span>*/}
// {/* : null*/}
// {/* }*/}
