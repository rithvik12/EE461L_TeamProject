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
            username:'',
            description:'',
            hw1available: 0,
            hw2available: 0,
            hw1checkedIn: 0,
            hw2checkedIn: 0,
        }
    }
    componentDidMount() {

        axios.get('http://localhost:5000/hardwares/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            username: response.data.username,
            description: response.data.description,
            hw1available: response.data.hw1available,
            hw2available: response.data.hw2available,
            hw1checkedOut: response.data.hw1checkedOut,
            hw2checkedOut: response.data.hw2checkedOut
        })
      })
      .catch(function (error) {
        console.log(error);
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
            username: this.state.username,
            description: this.state.description,
            hw1available: parseInt(this.state.hw1available)+parseInt(this.state.hw1checkedIn),
            hw2available: parseInt(this.state.hw2available)+parseInt(this.state.hw2checkedIn),
            hw1checkedIn: this.state.hw1checkedIn,
            hw2checkedIn: this.state.hw2checkedIn
        };

        console.log(hardware);

        axios.post('http://localhost:5000/hardwares/update/'+this.props.match.params.id, hardware)
      .then(res => console.log(res.data));

        axios.post('http://localhost:5000/hardwares/update'+this.props.match.params.id, hardware).then(res => console.log(res.data));

        window.location = '/hardware';
    }

    render() {
        return (
            <div>
                <h3>Check In Hardware</h3>
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
                      <label>HW1 to Check In: <input type="number"
                          required
                          className="form-control"
                          value={this.state.hw1checkedIn}
                          onChange={this.onChangeHW1CheckedIn}
                      /></label>
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
                      <label>HW2 to Check Out: <input type="number"
                          required
                          className="form-control"
                          value={this.state.hw2checkedIn}
                          onChange={this.onChangeHW2CheckedIn}
                      /></label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Check In" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
