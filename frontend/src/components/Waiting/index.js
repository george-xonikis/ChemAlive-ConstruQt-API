import React, {Component} from 'react';
import {connect} from "react-redux";
import {getProjectsList} from "../../store/actions/projectAction";
import {getUserProfile} from "../../store/actions/premiumUserAction";
import ProjectsHeader from '../ProjectsHeader';

class Waiting extends Component {
    componentDidMount = () => {
        console.log('projects', this.props)
        if (this.props.location.search && !this.props.location.search.startsWith('?/reloaded_')) {
            let path = this.props.location.search.slice(1, this.props.location.search.length)
            window.location.search = '?/reloaded_' + path
        } else if (this.props.location.search && this.props.location.search.startsWith('?/reloaded_')) {
            let path = this.props.location.search.slice(11, this.props.location.search.length)
            setTimeout(() => this.props.history.push(path), 1000)
        }
        this.props.dispatch(getProjectsList());
        this.props.dispatch(getUserProfile());
    }

    render() {
        return (
            <div>
                <ProjectsHeader />
                <h4 style={{textAlign: 'center', fontFamily: 'Roboto'}}>Ketcher is loading...</h4>
            </div>
        );
    }
}

export default connect()(Waiting);
