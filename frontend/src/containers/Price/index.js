import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserProfile } from "../../store/actions/premiumUserAction";
import { getPremium } from "../../store/actions/premiumUserAction";
import ProjectsHeader from "../../components/ProjectsHeader";
import "./index.css";
import UpgradeStatusModal from "./UpgradeStatusModal";

class Price extends Component {
  state = {
    showConfirmModal: false
  };

  componentDidMount = () => {
    this.props.dispatch(getUserProfile());
  };

  handlePremiumUser = (e, id) => {
    e.preventDefault();

    this.props.dispatch(getPremium(id));
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {this.state.showConfirmModal ? <UpgradeStatusModal /> : null}
        <ProjectsHeader />
        <div className="costs">
          <div className="price-title-wrapper">
            <h2 className="costs-title1">Plans & Pricing</h2>
          </div>

          <div className="content-cards">
            <div className="price-card">
              <h4 className="card-header">STARTER</h4>
              <h4 className="card-text">Create up to 2 Projects</h4>
              <div className="price">$</div>
              {/* <p className="small-card-text">per user, month</p> */}
              <button
                className="blue-button"
                onClick={e => this.handlePremiumUser(e, this.props.user.id)}
              >
                Get it
              </button>
            </div>

            <div className="price-card">
              <h4 className="card-header">PRO</h4>
              <h4 className="card-text">Create up to 10 projects</h4>
              <div className="price">$$</div>
              {/* <p className="small-card-text">per user, month</p> */}
              <button
                className="blue-button"
                onClick={e => this.handlePremiumUser(e, this.props.user.id)}
              >
                Get it
              </button>
            </div>

            <div className="price-card">
              <h4 className="card-header">ADVANCED</h4>
              <h4 className="card-text">Create Unlimited Projects</h4>
              <div className="price">$$$</div>
              {/* <p className="small-card-text">per user, year</p> */}
              <button
                className="blue-button"
                onClick={e => this.handlePremiumUser(e, this.props.user.id)}
              >
                Get it
              </button>
            </div>
          </div>

          {/* <div className='content-cards'>
                        

                        <div className='content-card'>
                            <h4 className='card-header'>Light</h4>
                            <div className='subheader'>
                                <div>Free</div>
                                <div>$0</div>
                                <div>Create two projects</div>
                            </div>
                            <div className='card-body'>
                                <div className='content-card-text'>You can create two projects to try ConstruQt API</div>
                                <button className='blue-button' onClick={(e) => this.handlePremiumUser(e, this.props.user.id)}>Get it</button>
                            </div>

                        </div>
                        <div className='content-card'>
                            <h4 className='card-header'>Medium</h4>
                            <div className='subheader'>
                                <div>$10</div>
                                <div>Per month</div>
                                <div>Create unlimited amount of projects</div>
                            </div>
                            <div className='card-body'>
                                <div className='content-card-text'>You can create two projects to try ConstruQt API</div>
                                <button className='blue-button' onClick={() => this.handlePremiumUser(this.props.user.id)}>Get it</button>
                            </div>
                        </div>
                        <div className='content-card'>
                            <h4 className='card-header'>Pro</h4>
                            <div className='subheader'>
                                <div>$90</div>
                                <div>Per year</div>
                                <div>Create unlimited amount of projects</div>
                            </div>
                            <div className='card-body'>
                                <div className='content-card-text'>You can create two projects to try ConstruQt API</div>
                                <button className='blue-button' onClick={() => this.handlePremiumUser(this.props.user.id)}>Get it</button>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.premiumUserReducer.profile
  };
};

export default connect(mapStateToProps)(Price);
