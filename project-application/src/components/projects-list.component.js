import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//projectlist component is implemented as a functional React component
//what makes this type of component different from a class component is the lack of state and lifecycle methods
//use a functional component instead of a class componen when all you need is to accept props and return JSX
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

        //set the initial state of the component by assigning an object to this.state
        this.state = {projects: []};
      }

      //Get the list of projects from the database
      componentDidMount() {
          // axios.get accesses the /projects endpoint
        axios.get('https://dry-reaches-42443.herokuapp.com/projects/')
         .then(response => {
           this.setState({ projects: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      //allow users to delete projects
      deleteProject(id) {
        //use the axios.delete method
        axios.delete('https://dry-reaches-42443.herokuapp.com/projects/'+id)
          .then(res => console.log(res.data));
        //update the state of projects and filter out the project that was deleted
        this.setState({
          projects: this.state.projects.filter(el => el._id !== id)
        })
      }
      

      // iterates through list of project items by using map function
      // returns the rows of the project table
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