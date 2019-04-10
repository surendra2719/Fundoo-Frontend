import React, { Component } from 'react';
import '../App.css';
import Resetpassword from '../components/resetPassword';
class ResetpasswordPage extends Component {
    render() {
        return (
            <div >
                <Resetpassword props={this.props} />
            </div>
        );
    }
}
export default ResetpasswordPage;