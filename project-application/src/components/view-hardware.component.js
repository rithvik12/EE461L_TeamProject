import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectsList from "./projects-list.component";

const Hardware = props => (
    <tr>
        <td>{props.hardware.username}</td>
        <td>{props.hardware.description}</td>
        <td>{props.hardware.hw1available}</td>
        <td>{props.hardware.hw2available}</td>
        {/* <td>{props.hardware.capacity}</td> */}
        {/* <td>{props.hardware.checkedIn}</td> */}
        <td>{props.hardware.hw1checkedOut}</td>
        <td>{props.hardware.hw2checkedOut}</td>
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

    hardwareList() {
        return this.state.hardwares.map(currenthardware => {
            return <Hardware hardware={currenthardware} key={currenthardware._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Hardware Sets</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>HW1 Available</th>
                            <th>HW1 Checked Out</th>
                            <th>HW2 Available</th>
                            <th>HW2 Checked Out</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.hardwareList() }
                    </tbody>
                </table>
            </div>
        )
    }
}