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
          // accesses the /projects endpoint
        axios.get('http://localhost:5000/projects/')
         .then(response => {
           this.setState({ projects: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteProject(id) {
        axios.delete('http://localhost:5000/projects/'+id)
          .then(res => console.log(res.data));
        this.setState({
          projects: this.state.projects.filter(el => el._id !== id)
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