import React, { Component } from 'react';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { uploadProfilePic } from "../services/services";
/**
* @description:This method is used to Logout ui.. 
*/
class Logout extends Component {

    state = {
        anchorEl: null,
        open: false,
        placement: null,
        profilePic: ""
    };
    /**
    * @description:This method is used to handle the Toggele event.. 
    */

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    /**
    * @description:This method is used to handle the close event.. 
    */
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };
    /**
    * @description:This method is used to handle the Logou Button event.. 
    */
    handlelogout = event => {
        event.preventDefault();
        localStorage.clear();
        this.props.props.props.history.push("/login");

    }
    /**
    * @description:This method is used to handle the Register Button event.. 
    */
    handleregister = event => {
        event.preventDefault();
        this.props.props.props.history.push("/register");

    }
    triggerInputFile() {
        this.fileInput.click();
    }
    handleClick = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };
    uploadImage = (e) => {
        let data = new FormData();
        console.log("image:------------", e.target.files[0]);
        data.append('image', e.target.files[0]);
        uploadProfilePic(data)
            .then((result) => {
                console.log("profile", result.data.data);
                localStorage.setItem('profilePic', result.data.data);
                this.setState({
                    profilePic: result.data.data
                })
            }).catch((err) => {
                alert(err);
            })
    }
    componentDidMount() {
        if (localStorage.getItem("profilePic") !== 'undefined') {
            this.setState({
                profilePic: localStorage.getItem("profilePic")
            })
        }
    }
    render() {
        const { anchorEl, open, placement } = this.state;
        const userDetails = localStorage.getItem('username');
        const initial = userDetails.substring(0, 1)
        return (
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper id="papperlogout">

                                < ClickAwayListener onClickAway={this.handleToggle}>
                                    <div style={{ width: "250px", padding: "10px", marginTop: "13px" }}>
                                        <div id="userProfileDetails">
                                            <IconButton id="avatar">
                                                <Tooltip
                                                    title="Change Profile">
                                                    <Avatar style={{ width: "80px", height: "80px", backgroundColor: "purple" }}
                                                        onClick={() => { this.triggerInputFile() }}>
                                                        {this.state.profilePic !== "" ?
                                                            <img style={{
                                                                width: "-webkit-fill-available",
                                                                height: "-webkit-fill-available"
                                                            }} src={this.state.profilePic} alt="change Profile pic"></img>
                                                            :
                                                            <b style={{ fontSize: "33px" }}>{initial}</b>
                                                        }
                                                        <input ref={fileInput => this.fileInput = fileInput}
                                                            type="file" style={{ 'display': 'none' }}
                                                            className="uploadImage"
                                                            onChange={(evt) => this.uploadImage(evt)}
                                                        />
                                                    </Avatar>
                                                </Tooltip>
                                            </IconButton>
                                            <span style={{ marginTop: "-1px", marginReft: "20px" }}>
                                                <p style={{ marginBottom: "0px" }}>{userDetails}<br></br> </p>
                                                <small style={{ marginBottom: "0px" }}>{localStorage.getItem('email')} </small>
                                            </span>
                                        </div>
                                        <Divider />
                                        <div id="signoutComponentbutton">
                                            <Button
                                                onClick={this.handleregister}>Add account</Button>
                                            <Button
                                                onClick={this.handlelogout}>Logout</Button>
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <IconButton id="userProfileIcon">
                    <Avatar style={{ width: "40px", height: "40px", backgroundColor: "purple" }} onClick={this.handleClick('bottom-end')} >
                        {this.state.profilePic !== "" ?
                            <img style={{
                                width: "40px", height: "40px"
                            }} src={this.state.profilePic} alt="change Profile pic"></img>
                            :
                            initial
                        }
                    </Avatar>
                </IconButton>
            </div>
        );
    }
}

export default Logout;