import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Projects from "./containers/Projects";
import Login from "./containers/Login";
import { login } from "./store/actions/loginActions";
import ProjectPage from "./containers/Projects/ProjectPage";
import AuthComponent from "./HOC";
import SignUp from "./components/SignUp";
import ProjectSettings from "./containers/Projects/ProjectSettings";
import Home from "../src/components/Home";
import Price from "./containers/Price";
import UserProfile from "./containers/UserProfile";
import SearchResults from './containers/SearchResults'
import Waiting from './components/Waiting'


const token = localStorage.getItem("token");
if (token) {
  store.dispatch(login(token));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/" component={Login} />
        <Route exact path="/prices/" component={Price} />
         <Route
          exact
          path="/waiting"
          component={Waiting}
        />
        <Route
          exact
          path="/projects/"
          component={AuthComponent(Projects)}
        />
        <Route exact path="/registration/" component={SignUp} />
        <Route exact path="/userprofile/" component={UserProfile} />
        <Route
          exact
          path="/projects/search/:search"
          component={AuthComponent(SearchResults)}
        />
        <Route
          exact
          path="/projects/:id/"
          component={AuthComponent(ProjectPage)}
        />

        <Route
          exact
          path="/projects/:id/settings/"
          component={AuthComponent(ProjectSettings)}
        />
        {/* <Route exact path="/projects/list/" component={ AuthComponent(NewProject) }/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/workspace" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
