import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditProject extends Component {
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

  //use axios.get to get the current project from the database and load the data into the state variables
  componentDidMount() {
    
    axios.get('https://dry-reaches-42443.herokuapp.com/projects/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          projectID: response.data.projectID,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://dry-reaches-42443.herokuapp.com/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
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

  async onSubmit(e) {
    e.preventDefault();

    const project = {
      username: this.state.username,
      description: this.state.description,
      projectID: this.state.projectID,
      date: this.state.date,
    };

    console.log(project);

    await axios.post('https://dry-reaches-42443.herokuapp.com/projects/update/'+this.props.match.params.id, project)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Project Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
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
          <div className="form-group">
            <label>Project ID: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.projectID}
                onChange={this.onChangeProjectID}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Project Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
