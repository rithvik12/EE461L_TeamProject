import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from 'axios';

class Register extends Component {
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
             password: '',
             errors: {}
          };
      }

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }

      UNSAFE_componentWillReceiveProp(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      //add the methods to change the username and submit the form
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
    async onSubmit(e) {
        e.preventDefault();
        const newUser = {
          username: this.state.username,
          password: this.state.password,
        };
       
        this.props.registerUser(newUser, this.props.history);

        console.log(newUser);

        //connect our code to the backend
        //causing our frontend to send HTTP request to the server endpoints on the backend
        //use the Axios library to send HTTP requests to our backend
        //axios.post method sends HTTP POST request to backend endpoint as listed below
        // endpoint is expecting a JSON object in the request body so 'newUser' object is passed as second argument
        await axios.post('https://dry-reaches-42443.herokuapp.com/users/add',  newUser ).then(res => {
          console.log(res.data) 
          this.setState({
            username: '',
            password: ''
        }) });

        

          window.location = '/login';
      }
  render() {
    const { errors } = this.state;
    return (
        <div>
        <h3>Register</h3>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  
                type="username"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                error={errors.username}
                id="username"
                
                // className={classnames("", {
                //   invalid: errors.username
                // })}
                />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input  
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                error={errors.password}
                id="password"
                type="password"
                // className={classnames("", {
                //   invalid: errors.password
                // })}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  //errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));