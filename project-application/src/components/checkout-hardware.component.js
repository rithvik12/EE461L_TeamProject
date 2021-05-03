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
        this.onSubmit = this.onSubmit.bind(this);

        //set the initial state of the component by assigning an object to this.state
        this.state = {
            username:'',
            description:'',
            hw1available: 0,
            hw2available: 0,
            hw1checkedOut: 0,
            hw2checkedOut: 0,
            // hw1checkingOut: 0,
            // hw2checkingOut: 0
        }
    }

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

    //     axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
    //   .then(response => {
    //     this.setState({
    //       username: response.data.username,
    //       description: response.data.description,
    //       projectID: response.data.projectID,
    //       date: new Date(response.data.date)
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })

    //     axios.get('http://localhost:5000/users/')
    //     .then(response => {
    //       if (response.data.length > 0) {
    //         this.setState({
    //           users: response.data.map(user => user.username),
    //           username: response.data[0].username
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })

        // this.setState({
        //     hw1available: this.state.hw1available,
        //     hw2available: this.state.hw2available,
        //     hw1checkedOut: this.state.hw1checkedOut,
        //     hw2checkedOut: this.state.hw2checkedOut
        // })

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
            hw1checkedOut: e.target.value,
        });
    }

    onChangeHW2CheckedOut(e) {
        this.setState({
            hw2checkedOut: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        //let hw1available = this.state.hw1available-this.state.hw1checkedOut;
        //let hw2available = this.state.hw2available-this.state.hw2checkedOut;

        const hardware = {
            username: this.state.username,
            description: this.state.description,
            hw1available: this.state.hw1available-this.state.hw1checkedOut,
            hw2available: this.state.hw2available-this.state.hw2checkedOut,
            hw1checkedOut: this.state.hw1checkedOut,
            hw2checkedOut: this.state.hw2checkedOut
        };

        console.log(hardware);

        //axios.post('http://localhost:5000/projects/add', hardware).then(res => console.log(res.data));

        await axios.post('https://dry-reaches-42443.herokuapp.com/hardwares/update/'+this.props.match.params.id, hardware)
      .then(res => console.log(res.data));

        //await axios.post('https://dry-reaches-42443.herokuapp.com/hardwares/update'+this.props.match.params.id, hardware).then(res => console.log(res.data));

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
                        <label>HW1 to Check Out: <input type="number"
                            required
                            className="form-control"
                            value={this.state.hw1checkedOut}
                            onChange={this.onChangeHW1CheckedOut}
                        /></label>

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
                        <label>HW2 to Check Out: <input type="number"
                            required
                            className="form-control"
                            value={this.state.hw2checkedOut}
                            onChange={this.onChangeHW2CheckedOut}
                        /></label>

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
