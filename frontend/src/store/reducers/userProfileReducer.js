import * as actionTypes from "../actions/types";

const initialState = {
  user: []
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERPROFILE:
      console.log("UserPofileReducer");
      console.log("state:", state);
      console.log("action payload:", action.payload);
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default userProfileReducer;
