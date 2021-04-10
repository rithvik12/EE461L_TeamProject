import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        // new stuff
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        axios.post('https://quiet-lowlands-32326.herokuapp.com/users/add', newUser).then(res => console.log(res.data));
        
        this.setState({
            username: '',
            password: ''
          })
  
          window.location = '/';
      }
  render() {
    return (
        <div>
        <h3>Create New User</h3>
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
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>


        </form>
      </div>
    )
  }
}