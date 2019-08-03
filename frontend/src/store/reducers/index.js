import { combineReducers } from "redux";

import { loginReducer } from "./loginReducer";
import { projectsReducer } from "./projectsReducer";
import { signUpReducer } from "./signUpReducer";
import { ketcherReducer } from "./ketcherReducer";
import { premiumUserReducer } from "./premiumUserReducer";
import userProfileReducer from "./userProfileReducer";

export const reducer = combineReducers({
  loginReducer,
  projectsReducer,
  signUpReducer,
  ketcherReducer,
  premiumUserReducer,
  userProfileReducer
});
