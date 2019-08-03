import moment from "moment";
import "./index.css";
import profile_logo from "../../assets/images/profile_pic_logo.png";

import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser, uploadImage } from "../../store/actions/userProfileActions";
import { saveUserInfo } from "../../store/actions/userProfileActions";
import { saveUserProfileInfo } from "../../store/actions/userProfileActions";
import ProjectsHeader from "../../components/ProjectsHeader";
import UserProfileModal from "./UserProfileModale";

class UserProfile extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    profile_pic: "",
    image: "",
    imagePreview: "",
    showUserProfileModal: false
  };

  renderImage = () => {
    return this.state.profile_pic ? (
      <img
        className="file-uploaded-preview"
        src={this.state.profile_pic}
        alt=""
      />
    ) : this.state.imagePreview ? (
      <img src={this.state.imagePreview} alt="Avatar" />
    ) : (
      <img src={profile_logo} alt="Avatar" />
    );
  };

  imageHandler = e => {
    const reader = new FileReader();
    const image = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        profile_pic: "",
        image: image,
        imagePreview: reader.result
      });
      this.props.dispatch(uploadImage(this.state)).then(res => {
        if (res) {
          this.props.dispatch(getUser());
          this.userProfileModalHandler();
        }
      });
    };
    reader.readAsDataURL(image);
  };

  componentDidMount() {
    this.props.dispatch(getUser()).then(() => {
      this.setState({
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email,
        company: this.props.user.user_profile.company,
        phone: this.props.user.user_profile.phone,
        profile_pic: this.props.user.user_profile.profile_pic
      });
    });
  }

  handleUserInput = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  userProfileModalHandler = () => {
    this.setState({
      showUserProfileModal: !this.state.showUserProfileModal
    });
  };

  saveChanges = event => {
    event.preventDefault();

    this.props.dispatch(saveUserInfo(this.state));
    this.props.dispatch(saveUserProfileInfo(this.state)).then(res => {
      if (res) {
        this.props.dispatch(getUser());
        this.userProfileModalHandler();
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.showUserProfileModal ? (
          <UserProfileModal
            userProfileModalHandler={this.userProfileModalHandler}
          />
        ) : null}
        <ProjectsHeader />
        {this.props.user.user_profile ? (
          <div className="profile-wrapper">
            <form className="user-profile-form" onSubmit={this.saveChanges}>
              <div className="profile-pic-wrapper">
                <div className="profile_pic-container">
                  {this.renderImage()}
                </div>
                <div className="photo-upload">
                  {/* <label forHTML="file">Image Upload</label> */}
                  <input
                    type="file"
                    className="Upload-file"
                    name="image"
                    onChange={e => this.imageHandler(e)}
                  />
                </div>
              </div>
              <div>
                <div className="title-welcome">
                  {" "}
                  Welcome, {this.props.user.username}!
                </div>
                <div>
                  <p className="text-user-profile">
                    {"Member Since: "}
                    {moment(this.props.user.date_joined).format("MMMM Do YYYY")}
                  </p>

                  <p className="text-user-profile">
                    Your status:{" "}
                    {this.props.user.user_profile.premium ? "Premium" : "Trial"}
                  </p>
                </div>
                <div className="profile-input-forms">
                  <div className="profile-titles">First Name</div>
                  <input
                    type="text"
                    placeholder={this.props.user.first_name}
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleUserInput}
                  />

                  <div className="profile-titles">Last Name </div>
                  <input
                    type="text"
                    placeholder={this.props.user.last_name}
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleUserInput}
                  />

                  <div className="profile-titles"> Email </div>
                  <input
                    type="text"
                    placeholder={this.props.user.email}
                    name="email"
                    value={this.state.email}
                    onChange={this.handleUserInput}
                  />

                  <div className="profile-titles"> Company </div>
                  <input
                    type="text"
                    placeholder={this.props.user.user_profile.company}
                    name="company"
                    value={this.state.company}
                    onChange={this.handleUserInput}
                  />

                  <div className="profile-titles"> Phone </div>
                  <input
                    type="text"
                    placeholder={this.props.user.user_profile.phone}
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleUserInput}
                  />
                </div>
                <div className="button-wrapper">
                  <button
                    className="blue-userprofile-button"
                    onClick={this.saveChanges}
                  >
                    {" "}
                    Save Changes{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userProfileReducer.user
  };
};

export default connect(mapStateToProps)(UserProfile);
