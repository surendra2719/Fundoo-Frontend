import React, { Component } from 'react';
import '../App.css';
import Register from '../components/registration';
class Registrationpage extends Component {
    render() {
        return (
            <div >
                <Register props={this.props}  />
            </div>
        );
    }
}
export default Registrationpage;