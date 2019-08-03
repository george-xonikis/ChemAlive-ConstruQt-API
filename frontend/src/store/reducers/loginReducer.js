import { ERROR, LOGIN, LOGOUT } from "../actions/types";
const initialState = {};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        token: action.payload,
        error: null,
        authenticated: true
      };
    }
    case ERROR: {
      return {
        ...state,
        token: null,
        error: action.payload,
        authenticated: false
      };
    }
    case LOGOUT: {
      console.log('from logout reducer')
      localStorage.clear();
      return { ...state, 
        token: null, 
        error: null, 
        authenticated: false };
    }
    default:
      return state;
  }
};
