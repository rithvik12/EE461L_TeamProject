import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/navbar.component"
import Landing from "./components/layout/landing.component";
import ProjectsList from "./components/projects-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
import Register from "./components/auth/register.component";
import ViewHardware from "./components/view-hardware.component";
import Login from "./components/auth/login.component";
import DatasetList from "./components/dataset-list.component";
import CheckOut from "./components/checkout-hardware.component";
import CheckIn from "./components/checkin-hardware.component";
import PrivateRoute from "./components/private-route/PrivateRoute";
//import Dashboard from "./components/dashboard/Dashboard";
//import EditHardware from "./components/edit-hardware.component";
//edit to route to edit-hardware component when complete

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

//<Route> element for each route of the application
//path attribute sets the url path
//component is the code that will be loaded when a user goes to that path
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={ProjectsList} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={ProjectsList} />
              <Route path="/edit-project/:id" component={EditProject} />
              <Route path="/create-project" component={CreateProject} />
              <Route path="/hardware" component={ViewHardware} />
              <Route path="/dataset" component={DatasetList} />
              <Route path="/edit-hardware" component={ViewHardware} />
              <Route path="/checkin-hardware/:id" component={CheckIn} />
              <Route path="/checkout-hardware/:id" component={CheckOut} />
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

{/* <Route path="/edit-project/:id" component={EditProject} />
          <Route path="/create-project" component={CreateProject} />
          <Route path="/hardware" component={ViewHardware} />
          <Route path="/dataset" component={DatasetList} />
          <Route path="/edit-hardware" component={ViewHardware} />
          <Route path="/checkin-hardware/:id" component={CheckIn} />
          <Route path="/checkout-hardware/:id" component={CheckOut} /> */}

export default App;
