import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js"
import ProjectsList from "./components/projects-list.component.js";
import EditProject from "./components/edit-project.component.js";
import CreateProject from "./components/create-project.component.js";
import CreateUser from "./components/create-user.component.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ProjectsList} />
        <Route path="/edit/:id" component={EditProject} />
        <Route path="/create" component={CreateProject} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;