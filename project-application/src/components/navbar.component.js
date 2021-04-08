import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">EE461L</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Projects</Link>
          </li>
          <li className="navbar-item">
          <Link to="/hardware" className="nav-link">Hardware Sets</Link>
          </li>
          <li className="navbar-item">
          <Link to="/dataset" className="nav-link">Datasets</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="btn btn-secondary">Log In</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}