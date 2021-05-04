import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class CreateProject extends Component {
  constructor(props) {
    super(props);


    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeProjectID = this.onChangeProjectID.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    ////set the initial state of the component by assigning an object to this.state
    this.state = {
      username: '',
      description: '',
      projectID: 0,
      date: new Date(),
      users: []
    }
  }

  //get the list of users from the database to add to the users dropdown menu in the form
  //data returned from the database to set the state of users and username
  componentDidMount() {
    axios.get('https://dry-reaches-42443.herokuapp.com/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeProjectID(e) {
    this.setState({
      projectID: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async onSubmit(e) {
      // prevents default HTML form submit behavior from taking place
    e.preventDefault();

    const project = {
      username: this.state.username,
      description: this.state.description,
      projectID: this.state.projectID,
      date: this.state.date,
    };

    const hardware = {
      username: this.state.username,
      description: this.state.description,
    };

    console.log(project);

    await axios.post('https://dry-reaches-42443.herokuapp.com/projects/add', project).then(res => console.log(res.data));
    await axios.post('https://dry-reaches-42443.herokuapp.com/hardwares/add', hardware).then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    const { user } = this.props.auth;
    return (
      
      <div>
        
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          {/* <div className="form-group">
            <label>Project ID: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.projectID}
                onChange={this.onChangeProjectID}
                />
          </div> */}
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create New Project" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

CreateProject.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(
  CreateProject);