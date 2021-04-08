import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hardware = props => (
    <tr>
        <td>{props.hardware.projectName}</td>
        <td>{props.hardware.availability}</td>
        {/* <td>{props.hardware.capacity}</td> */}
        {/* <td>{props.hardware.checkedIn}</td> */}
        <td>{props.hardware.checkedOut}</td>
        <td>
            <Link to={"/edit"}>edit</Link>
        </td>
    </tr>
)

export default class ViewHardware extends Component {
    constructor(props) {
        super(props);
        this.state = {hardwares: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/projects/')
        .then(response => {
            this.setState({ hardwares: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
    }
}