import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {projects: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/projects/')
         .then(response => {
           this.setState({ projects: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }
  render() {
    return (
      <div>
        <p>You are on the Projects List component!</p>
      </div>
    )
  }
}