import React, { Component } from 'react';
import axios from 'axios';

export default class EditHardware extends Component{
    constructor(props) {
        super(props);

        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.onChangeCheckedIn = this.onChangeCheckedIn.bind(this);
        this.onChangeCheckedOut = this.onChangeCheckedOut.bind(this);

        this.state = {
            projectName: '',
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
                    projects: response.data.map(project => project.projectName),
                    projectName: response.data[0].projectName
                });
            }
        })
    }

    onChangeProjectName(e) {
        this.setStete({
            projectName: e.target.value
        });
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
            projectName: this.state.projectName,
            availability: this.state.availability,
            capacity: this.state.capacity,
            checkedIn: this.state.checkedIn,
            checkedOut: this.state.checkedOut,
        };

        console.log(hardware);

        axios.post('http://localhost:5000/hardwares', hardware).then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Hardware</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project Name: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.projectName}
                            onChange={this.onChangeProjectName}>
                            {
                                this.state.projects.map(function(project){
                                    return <option
                                    key={project}
                                    value={project}>{project}
                                    </option>;
                                })
                            }
                            </select>
                    </div>
                </form>
            </div>
        )
    }
}