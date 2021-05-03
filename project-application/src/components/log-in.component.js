import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        // new stuff
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //set the initial state of the component by assigning an object to this.state
        this.state = {
            username: '',
            // new stuff
             password: ''
          };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
      //new stuff
      onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
          username: this.state.username,
          password: this.state.password,
        };
        console.log(newUser);

        // sends HTTP POST request to backend endpoint as listed below
        // endpoint is expecting a JSON object in the request body so 'newUser' object is passed as second argument
        axios.post('https://dry-reaches-42443.herokuapp.com/users/add', newUser).then(res => console.log(res.data));

        this.setState({
            username: '',
            password: ''
          })

          window.location = '/';
      }
  render() {
    return (
        <div>
        <h3>Login with Existing User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div class="row">
          <div className="form-group">&nbsp;
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>

          <div className="form-group">&nbsp;
             <Link to="/create-user" className="btn btn-primary">Create New User</Link>
          </div>
          </div>
        </form>
      </div>
    )
  }
}
