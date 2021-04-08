import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ProjectsList from "./components/projects-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
import CreateUser from "./components/create-user.component";
import ViewHardware from "./components/view-hardware.component";
import LoginUser from "./components/log-in.component";
//import EditHardware from "./components/edit-hardware.component";

//edit to route to dataset component when complete
//edit to route to edit-hardware component when complete

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ProjectsList} />
        <Route path="/edit-project/:id" component={EditProject} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/user" component={CreateUser} />
        <Route path="/login" component={LoginUser} />
        <Route path="/hardware" component={ViewHardware} />
        <Route path="/dataset" component={ViewHardware} />
        <Route path="/edit-hardware" component={ViewHardware} />

      </div>
    </Router>
  );
}

export default App;