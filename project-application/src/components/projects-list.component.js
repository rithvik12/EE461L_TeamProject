import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Project = props => (
    <tr>
      <td>{props.project.username}</td>
      <td>{props.project.description}</td>
      {/*<td>{props.project.projectID}</td>*/}
      <td>{props.project._id}</td>
      <td>{props.project.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit-project/"+props.project._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProject(props.project._id) }}>delete</a>
      </td>
    </tr>
  )

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
        axios.delete('http://localhost:5000/hardwares/'+(id+1))
        .then(res => console.log(res.data));
        axios.delete('http://localhost:5000/projects/'+id)
          .then(res => console.log(res.data));
        this.setState({
          projects: this.state.projects.filter(el => el._id !== id)
        })
      }
      

      // iterates through list of project items by using map function
      projectList() {
        return this.state.projects.map(currentproject => {
          return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
        })
      }

  render() {
    return (
      <div>
        <hgroup>
          <h3>Existing Projects</h3>
          <p>
            <Link to={"/create-project/"}>Create New Project</Link>
          </p>
        </hgroup>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Project ID</th>
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