import React, { Component } from 'react';
import '../App.css';
import Login from '../components/login';
class Loginpage extends Component {
    render() {
        return (
            <div >
                <Login props={this.props}  />
            </div>
        );
    }
}
export default Loginpage;