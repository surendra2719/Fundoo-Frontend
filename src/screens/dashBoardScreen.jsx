import React, { Component } from 'react';
import '../App.css';
import Dashboard from "../components/dashBoard";
class Dashboardpage extends Component {
    render() {
        return (
            <div >
                <Dashboard props={this.props}  />
            </div>
        );
    }
}
export default Dashboardpage;