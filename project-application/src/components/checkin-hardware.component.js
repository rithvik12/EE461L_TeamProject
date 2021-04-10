import React, { Component } from 'react';
import axios from 'axios';

export default class CheckInHardware extends Component{
    constructor(props) {
        super(props);

        //testing a push
        this.onChangeHW1Available = this.onChangeHW1Available.bind(this);
        this.onChangeHW2Available = this.onChangeHW2Available.bind(this);
        this.onChangeHW1CheckedIn = this.onChangeHW1CheckedIn.bind(this);
        this.onChangeHW2CheckedIn = this.onChangeHW2CheckedIn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            hw1available: 900,
            hw2available: 100,
            hw1checkedIn: this.props.hw1checkedIn,
            hw2checkedIn: this.props.hw2checkedIn
        }
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

    onChangeHW1CheckedIn(e) {
        this.setState({
            hw1checkedIn: e.target.value
        });
    }

    onChangeHW2CheckedIn(e) {
        this.setState({
            hw2checkedIn: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const hardware = {
            hw1available: this.state.hw1available-this.state.hw1checkedIn,
            hw2available: this.state.hw2available-this.state.hw2checkedIn,
            hw1checkedIn: this.state.hw1checkedIn,
            hw2checkedIn: this.state.hw2checkedIn,
        };

        console.log(hardware);

        axios.post('http://localhost:5000/hardwares', hardware).then(res => console.log(res.data));

        window.location = '/hardware';
    }

    render() {
        return (
            <div>
                <h3>Check In Hardware</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>HW1 Available: </label>
                        //<p id="numAvailable"></p>
                    </div>
                    <div className="form-group">
                        <label>HW1 to Check In: <input type="text" /></label>
                        <button type="button">Check In</button>
                    </div>
                    <div className="form-group">
                        <label>HW2 Available</label>
                    </div>
                    <div className="form-group">
                        <label>HW2 to Check In: <input type="text" /></label>
                        <button type="button">Check In</button>
                    </div>
                </form>
            </div>
        )
    }
}
