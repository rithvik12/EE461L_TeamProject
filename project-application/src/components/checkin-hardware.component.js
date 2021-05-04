import React, { Component } from 'react';
import axios from 'axios';

export default class CheckInHardware extends Component{
    constructor(props) {
        super(props);

        //testing a push
        //make sure 'this' works properly in our methods, we need to bind the methods to 'this'
        this.onChangeHW1Available = this.onChangeHW1Available.bind(this);
        this.onChangeHW2Available = this.onChangeHW2Available.bind(this);
        this.onChangeHW1CheckedIn = this.onChangeHW1CheckedIn.bind(this);
        this.onChangeHW2CheckedIn = this.onChangeHW2CheckedIn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //set the initial state of the component by assigning an object to this.state
        this.state = {
            username:'',
            description:'',
            hw1available: 0,
            hw2available: 0,
            hw1checkedIn: 0,
            hw2checkedIn: 0,
        }
    }

    //user list will come directly from the MongoDB database
    //select the user associated with the exercise from a drop down list
    //componentDidMount() method is part of the React life cycle and is invoked immediately after a component is mounted
    componentDidMount() {

        axios.get('https://dry-reaches-42443.herokuapp.com/hardwares/'+this.props.match.params.id)
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

    //add methods to update the state properties
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

    async onSubmit(e) {
        e.preventDefault();

        if(100<this.state.hw1checkedIn+this.state.hw1available){
            this.state.hw1checkedIn=100-this.state.hw1available;
        }

        if(100<this.state.hw2checkedIn+this.state.hw2available){
            this.state.hw2checkedIn=100-this.state.hw2available;
        }
        const hardware = {
            username: this.state.username,
            description: this.state.description,
            hw1available: parseInt(this.state.hw1available)+parseInt(this.state.hw1checkedIn),
            hw2available: parseInt(this.state.hw2available)+parseInt(this.state.hw2checkedIn),
            hw1checkedIn: this.state.hw1checkedIn,
            hw2checkedIn: this.state.hw2checkedIn
        };

        console.log(hardware);

        await axios.post('https://dry-reaches-42443.herokuapp.com/hardwares/update/'+this.props.match.params.id, hardware)
      .then(res => console.log(res.data));

        //axios.post('https://dry-reaches-42443.herokuapp.com/hardwares/update'+this.props.match.params.id, hardware).then(res => console.log(res.data));

        //location is updated so the user is taken back to the hardware page
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
                          //onChange={this.onChangeHW1Available}
                          readonly
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
                          //onChange={this.onChangeHW2Available}
                          readonly
                          />
                    </div>
                    <div className="form-group">
                      <label>HW2 to Check In: <input type="number"
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
