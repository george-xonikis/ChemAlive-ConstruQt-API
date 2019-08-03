import * as actionTypes from "./types";

import axios from "axios";

const URL = `https://chemalive.propulsion-learn.ch`;

const get_user = user => {
  return {
    type: actionTypes.GET_USERPROFILE,
    payload: user
  };
};

export const getUser = () => async (dispatch, getState) => {
  // receive the token from the state
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${URL}/api/users/me`, config);
  const user = response.data;

  dispatch(get_user(user));
};

export const saveUserInfo = ({ first_name, last_name, email }) => async (
  dispatch,
  getState
) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email
  };

  //second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.put(`${URL}/api/users/me/`, data, config);
  const user = response.data;
  await dispatch(get_user(user));

  return response;
};

export const saveUserProfileInfo = ({ company, phone }) => async (
  dispatch,
  getState
) => {
  const token = getState().loginReducer.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const data = {
    company: company,
    phone: phone
  };

  //second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.put(
    `${URL}/api/users/me/profile/`,
    data,
    config
  );
  const user = response.data;
  await dispatch(get_user(user));

  return response;
};

export const uploadImage = ({ image }) => async (dispatch, getState) => {
  const token = getState().loginReducer.token;
  const data = new FormData();
  const profile_pic = image;
  data.append("profile_pic", profile_pic);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };

  //second argument should be DATA, then CONFIG, DATA can be empty string
  const response = await axios.put(
    `${URL}/api/users/me/profile/`,
    data,
    config
  );
  const user = response.data;
  await dispatch(get_user(user));

  return response;
};
