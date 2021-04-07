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

      // iterates through list of project items by using map function
      projectList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

  render() {
    return (
        <div>
        <h3>Existing Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
      </div>
    )
  }
}