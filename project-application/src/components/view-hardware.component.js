import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectsList from "./projects-list.component";

const Hardware = props => (
    <tr>
        <td>{props.hardware.username}</td>
        <td>{props.hardware.description}</td>
        <td>{props.hardware.hw1available}</td>
        {/* <td>{props.hardware.capacity}</td> */}
        {/* <td>{props.hardware.checkedIn}</td> */}
        <td>{props.hardware.hw1checkedOut}</td>
        <td>{props.hardware.hw2available}</td>
        <td>{props.hardware.hw2checkedOut}</td>
        <td>
            <Link to={"/checkout-hardware/"+props.hardware._id}>check out</Link> | <Link to={"/checkin-hardware/"+props.hardware._id}>check in</Link> | <a href="/hardware" onClick={() => { props.deleteHardware(props.hardware._id) }}>delete</a>
        </td>
    </tr>
)

export default class ViewHardware extends Component {
    constructor(props) {
        super(props);
        this.state = {hardwares: []};
    }

    componentDidMount() {
        axios.get('http://quiet-lowlands-32326/hardwares/')
        .then(response => {
            this.setState({ hardwares: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteHardware(id) {
        axios.delete('http://quiet-lowlands-32326/hardwares/'+id)
        .then(res => console.log(res.data));
        this.setState({
          hardwares: this.state.hardwares.filter(el => el._id !== id)
        })
      }

    hardwareList() {
        return this.state.hardwares.map(currenthardware => {
            return <Hardware hardware={currenthardware} deleteHardware={this.deleteHardware} key={currenthardware._id}/>;
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
                            <th>HW1 Last Checked Out</th>
                            <th>HW2 Available</th>
                            <th>HW2 Last Checked Out</th>
                            <th>Actions</th>
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
