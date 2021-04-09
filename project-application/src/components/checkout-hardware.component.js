import React, { Component } from 'react';
import axios from 'axios';

export default class CheckoutHardware extends Component{
    constructor(props) {
        super(props);

        //testing a push
        this.onChangeHW1Available = this.onChangeHW1Available.bind(this);
        this.onChangeHW2Available = this.onChangeHW2Available.bind(this);
        this.onChangeHW1CheckedOut = this.onChangeHW1CheckedOut.bind(this);
        this.onChangeHW2CheckedOut = this.onChangeHW2CheckedOut.bind(this);

        this.state = {
            hw1available: 100,
            hw2available: 100,
            hw1checkedOut: this.props.hw1checkedOut,
            hw2checkedOut: this.props.hw2checkedOut
        }
    }

    componentDidMount() {
        this.setState({
            hw1available: this.state.hw1available,
            hw2available: this.state.hw2available,
            hw1checkedOut: this.state.hw1checkedOut,
            hw2checkedOut: this.state.hw2checkedOut
        })

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
            hw1available: this.state.hw1available-this.state.hw1checkedOut,
            hw2available: this.state.hw2available-this.state.hw2checkedOut,
            hw1checkedOut: this.state.hw1checkedOut,
            hw2checkedOut: this.state.hw2checkedOut,
        };

        console.log(hardware);

        axios.post('http://localhost:5000/hardwares', hardware).then(res => console.log(res.data));

        window.location = '/hardware';
    }

    render() {
        return (
            <div>
                <h3>Check Out Hardware</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>HW1 Available: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.hw1available}
                            onChange={this.onChangeHW1Available}
                            />
                    </div>
                    <div className="form-group">
                        <label>HW1 to Check Out: <input type="number" /></label>
                        {/* <button type="button">Check Out</button> */}
                    </div>
                    <div className="form-group">
                        <label>HW2 Available</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.hw2available}
                            onChange={this.onChangeHW2Available}
                            />
                    </div>
                    <div className="form-group">
                        <label>HW2 to Check Out: <input type="number" /></label>
                        {/* <button type="button">Check Out</button> */}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Check Out" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
