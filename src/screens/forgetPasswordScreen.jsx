import React, { Component } from 'react';
import '../App.css';
import ForgetPassword from '../components/forgetPassword';
class Forgetpasswordpage extends Component {
    render() {
        return (
            <div >
                 <ForgetPassword props={this.props} />
            </div>
        );
    }
}
export default Forgetpasswordpage;