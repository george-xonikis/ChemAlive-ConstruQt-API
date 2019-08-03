import axios from "axios";
import { ERROR, LOGIN, LOGOUT } from "./types";

const URL = `https://chemalive.propulsion-learn.ch`;
//const URL = `http://localhost:8090`;

export const login = token => {
  return {
    type: LOGIN,
    payload: token
  };
};

const error = error => {
  return {
    type: ERROR,
    payload: error
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const loginAction = ({ username, password }) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.post(`${URL}/api/auth/token/`, {
      username,
      password
    });
    const token = response.data.access;
    localStorage.setItem("token", token);

    dispatch(login(token));
    return response;
  } catch (e) {
    dispatch(error("Wrong username or password"));
  }
};
