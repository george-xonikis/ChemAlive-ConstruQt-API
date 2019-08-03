import React, { Component } from 'react'
import { connect } from 'react-redux';


export default ChildComponent => {
    class AuthComponent extends Component {
        componentDidMount() {
            this.redirectUser();
        }

        componentDidUpdate() {
            this.redirectUser();
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.auth) {
                this.redirectUser();
            }
        }

        redirectUser = () => {
            if (!this.props.auth) {
                this.props.history.push('/')
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return {
            auth: state.loginReducer.authenticated
        };
    }
    return connect(mapStateToProps)(AuthComponent);
}   
