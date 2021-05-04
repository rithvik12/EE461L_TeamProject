import axios from 'axios';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


class Login extends Component{
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
             errors: {},
             
          };
      }

      componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }

      UNSAFE_componentWillReceiveProp(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
    
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
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
        const userData = {
          username: this.state.username,
          password: this.state.password,
        };
        console.log(userData);

        //this.props.loginUser(userData, this.props.history);
        //this.props.auth.isAuthenticated = true;

        // sends HTTP POST request to backend endpoint as listed below
        // endpoint is expecting a JSON object in the request body so 'newUser' object is passed as second argument
        axios.post('https://dry-reaches-42443.herokuapp.com/users/add', userData).then(res => console.log(res.data));

        this.setState({
            username: '',
            password: ''
          })

          window.location = '/home';
      }
  render() {
    const { errors } = this.state;
    return (
        <div>
        <h3>Login with Existing User</h3>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                id="username"
                type="username"
                error={errors.username}
                // className={classnames("", {
                //   invalid: errors.username || errors.usernamenotfound
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
                id="password"
                type="password"
                error={errors.password}
                // className={classnames("", {
                //   invalid: errors.password || errors.passwordincorrect
                // })}
                />
          </div>
          <div class="row">
          <div className="form-group">&nbsp;
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>

          <div className="form-group">&nbsp;
             <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  //errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
