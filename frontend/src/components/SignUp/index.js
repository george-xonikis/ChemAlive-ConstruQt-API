import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendCode} from '../../store/actions/signUpAction';
import logo from '../../assets/images/Logo2.png'
import './index.css';
import EmailSentModal from "./EmailSentModal";
import RegistrationForm from "./RegistrationForm";

class SignUp extends Component {
    state = {
        email: '',
        showEmailForm: true,
        showEmailSentModal: false,
        showRegistrationForm: false
    };

    handleUserInput = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSendSubmit = (e) => {
        e.preventDefault();
        this.setState({showEmailSentModal: !this.state.showEmailSentModal});
        this.props.dispatch(sendCode(this.state))
            .then(
                setTimeout(() => this.setState({
                    showRegistrationForm: !this.state.showRegistrationForm,
                    showEmailSentModal: !this.state.showEmailSentModal,
                    showEmailForm: !this.state.showEmailForm
                }), 2000)
            );
    };

    hereHandler = () => {
        this.setState({
            showRegistrationForm: !this.state.showRegistrationForm,
            showEmailForm: !this.state.showEmailForm
        })
    };

    render() {
        return (
            <div className='signupPage'>
                <div className='left'>
                    <img src={logo} alt='chemalive_logo'/>
                    <p className='sign-up-message-main'>- One step away to enhance your <br/>chemistry workflow -</p>
                </div>
                <div className='right'>
                    {this.state.showEmailSentModal && <EmailSentModal/>}
                    {this.state.showRegistrationForm && <RegistrationForm/>}
                    {
                        this.state.showEmailForm && (
                            <form className='form-container' onSubmit={this.handleSendSubmit}>
                                <div></div>
                                <form id='top-form-container' className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
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
                                    </div>
                                    <button className='small-button'>Submit</button>
                                </form>
                                <p className='have-a-code'>Do you have a code? Enter  
                                <span><a onClick={this.hereHandler} className='here'> here.</a></span></p>

                            </form>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default connect()(SignUp);
