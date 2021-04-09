import React, { Component } from 'react';
import axios from 'axios';

export default class EditHardware extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHW1Available = this.onChangeHW1Available.bind(this);
        this.onChangeHW2Available = this.onChangeHW2Available.bind(this);
        // this.onChangeCapacity = this.onChangeCapacity.bind(this);
        // this.onChangeCheckedIn = this.onChangeCheckedIn.bind(this);
        this.onChangeHW1CheckedOut = this.onChangeHW1CheckedOut.bind(this);
        this.onChangeHW2CheckedOut = this.onChangeHW2CheckedOut.bind(this);

        this.state = {
            username: '',
            hw1available: 100,
            hw2available: 100,
            // capacity: 100,
            // checkedIn: 0,
            hw1checkedOut: 0,
            hw2checkedOut: 0
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    users: response.data.map(project => project.projectName),
                    projectName: response.data[0].projectName
                });
            }
        })
    }

    onChangeUsername(e) {
        this.setStete({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setStete({
            description: e.target.value
        });
    }

    onChangeHW1Available(e) {
        this.setState({
            hw1available: e.target.value
        });
    }

    onChangeHW2Available(e) {
        this.setState({
            hw2available: e.target.value
        });
    }

    // onChangeCapacity(e) {
    //     this.setState({
    //         capacity: e.target.value
    //     });
    // }

    // onChangeCheckedIn(e) {
    //     this.setState({
    //         checkedIn: e.target.value
    //     });
    // }

    onChangeHW1CheckedOut(e) {
        this.setState({
            hw1checkedOut: e.target.value
        });
    }

    onChangeHW2CheckedOut(e) {
        this.setState({
            hw2checkedOut: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const hardware = {
            username: this.state.username,
            hw1available: this.state.hw1available,
            hw2available: this.state.hw2available,
            //capacity: this.state.capacity,
            //checkedIn: this.state.checkedIn,
            hw1checkedOut: this.state.hw1checkedOut,
            hw2checkedOut: this.state.hw2checkedOut,
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
                        <label>HW1 Available</label>
                        {/* <label>Project Name: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.projects.map(function(project){
                                    return <option
                                    key={project}
                                    value={project}>{project}
                                    </option>;
                                })
                            }
                            </select> */}
                    </div>
                    <div className="form-group">
                        <label>HW1 to Check Out</label>
                    </div>
                    <div className="form-group">
                        <label>HW2 Available</label>
                    </div>
                    <div className="form-group">
                        <label>HW2 to Check Out</label>
                    </div>
                </form>
            </div>
        )
    }
}