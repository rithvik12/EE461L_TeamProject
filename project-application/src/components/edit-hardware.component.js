import React, { Component } from 'react';
import axios from 'axios';

export default class EditHardware extends Component{
    constructor(props) {
        super(props);

        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.onChangeCheckedIn = this.onChangeCheckedIn.bind(this);
        this.onChangeCheckedOut = this.onChangeCheckedOut.bind(this);

        this.state = {
            availability: 100,
            capacity: 100,
            checkedIn: 0,
            checkedOut: 0
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    projects: response.data.map(project => project.projectname),
                    projectname: response.data[0].projectname
                });
            }
        })
    }

    onChangeAvailability(e) {
        this.setState({
            availability: e.target.value
        });
    }

    onChangeCapacity(e) {
        this.setState({
            capacity: e.target.value
        });
    }

    onChangeCheckedIn(e) {
        this.setState({
            checkedIn: e.target.value
        });
    }

    onChangeCheckedOut(e) {
        this.setState({
            checkedOut: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const hardware = {
            availability: this.state.availability,
            capacity: this.state.capacity,
            checkedIn: this.state.checkedIn,
            checkedOut: this.state.checkedOut,
        };

        console.log(hardware);

        axios.post('http://localhost:5000/hardwares', hardware).then(res => console.log(res.data));

        window.location = '/';
    }
}