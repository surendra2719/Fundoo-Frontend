/*****************************************************************************************
 * @purpose : it will provides login component
 * @author  : Surendra      
 * @file    : login.jsx
 * @overview: These file may contain login component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react'
import '../App.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../services/services";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
var jwt = require('jsonwebtoken');

class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            open: false,
            errormsg: "",
            formErrors: {
                email: "",
                password: ""
            },

        }
    }
    handleClose = (event, reason) => {
        try {
            if (reason === 'clickaway') {
                return;
            }

            this.setState({ open: false });
        }
        catch (err) {
            console.log(err, "error in handle close in login");

        }
    };
    handleChange1 = event => {
        // event.preventDefault();
        try {
            const { name, value } = event.target;
            let formErrors = { ...this.state.formErrors };
            switch (name) {
                case "email":
                    formErrors.email = emailRegex.test(value)
                        ? ""
                        : "invalid email address";
                    break;
                case "password":
                    formErrors.password =
                        value.length < 6 ? "minimum 6 characaters required" : "";
                    break;

                default:
                    break;

            }
            this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        }
        catch (err) {
            console.log(err, "error in handle change1  in login");
        }
    };
    handleChange = prop => event => {
        try {
            this.setState({ [prop]: event.target.value });
        }
        catch (err) {
            console.log(err, "error in handle change  in login");

        }
    };
    handleClickShowPassword = () => {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        }
        catch (err) {
            console.log(err, "error in handle click password  in login");
        }
    };
    handleSubmit = event => {
        event.preventDefault();
        try {
            if (formValid(this.state)) {
                userLogin(this.state.email, this.state.password)
                    .then((res) => {


                        console.log("responce from backend", res.data);
                        jwt.verify(res.data, 'secretkeyAuthentications', (err, decoded) => {
                            if (err) {
                                console.log("token invalid--->");

                            } else {
                                console.log("decoded data==>", decoded.payload);

                                localStorage.setItem('username', decoded.payload.firstName);
                                localStorage.setItem('email', decoded.payload.email);
                                localStorage.setItem('userId', decoded.payload.user_id);
                                localStorage.setItem('token', res.data);
                                localStorage.setItem('profilePic', decoded.payload.profilePic);
                                this.setState({ open: true, errormsg: "Login sucessfull!!!!" });

                                this.props.props.history.push("/dashBoard")

                            }

                        })
                    })
                    .catch((err) => {

                        this.setState({ open: true, errormsg: "LOGIN UNSUCESSFUL" })

                        console.log(err);

                    });

            } else {
                this.setState({ open: true, errormsg: "invalid user" })
            }
        }
        catch (err) {
            console.log(err, "error in handle submit  in login");

        }
    };
    Onclick = e => {
        // e.preventDefault();
        try {
            this.props.props.history.push("/forgetpassword")
        }
        catch (err) {
            console.log(err, "error in on click  in login");

        }

    };
    registrationclick = e => {
        // e.preventDefault();
        try {
            this.props.props.history.push("/register")
        }
        catch (err) {
            console.log(err, "error in  registration click  in login");

        }
    };

    render() {

        const { formErrors } = this.state;
        return (
            <div className="background " >
                <div id="form-wrapper">
                    <div>
                        <h1 >
                            <span id="headerF"><b>F</b></span>
                            <span id="headerR"><b>u</b></span>
                            <span id="headerg"><b>n</b></span>
                            <span id="headerB"><b>d</b></span>
                            <span id="headerY"><b>o</b></span>
                            <span id="headerR"><b>o</b></span>
                        </h1>
                        <h2>Signin </h2>

                        <small>   <h2 id="loginheader">  With Your Fundoo Account</h2></small>

                    </div>
                    <div  >
                        <form id="container" noValidate autoComplete="off">

                            <TextField  style={{width:"324px"}}
                                className="textfieldInput"
                                id="username"
                                label="User name"
                                type="email"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange1}
                                name="email"
                                value={this.state.email}

                            />
                        </form>

                        <span>
                            {formErrors.email.length > 0 && (
                                <div className="errorMessage">{formErrors.email}</div>
                            )}
                        </span>

                    </div>
                    <div>
                        <form id="container" noValidate autoComplete="off" >
                            <TextField style={{width:"324px"}}
                                id="TextFields"
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange1}
                                name="password"
                                value={this.state.password}
                                type={this.state.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                            <span>
                                {formErrors.password.length > 0 && (
                                    <div className="errorMessage">{formErrors.password}</div>
                                )}
                            </span> </form>
                        <div >
                            <form noValidate autoComplete="off">
                                <Button onClick={this.handleSubmit} class="BUTTONS buttonslabel" type="submit" onKeyPress={this.handleKeyPress} >
                                    Signin</Button>              <Snackbar
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={this.state.open}
                                    autoHideDuration={2000}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">
                                        {this.state.errormsg}</span>}
                                    action={[
                                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                                            UNDO
                                        </Button>,
                                        <IconButton
                                            key="close"
                                            aria-label="Close"
                                            color="inherit"
                                            //   className={classes.close}
                                            onClick={this.handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>,
                                    ]}
                                /></form>
                        </div >
                        <div >
                            <form id="container" noValidate autoComplete="off">
                                <Button onClick={this.registrationclick} className="CREATEBUTTONS buttonslabel" type="submit"
                                >
                                    <b> Create account</b>
                                </Button>

                            </form>
                        </div>
                    </div>
                    <div>

                    </div>

                    <small >
                        <a onSubmit={this.Onclick} id="forgetlink"
                            href="forgetpassword"  > <b>forgot password</b></a>
                    </small>

                </div>

            </div>

        )
    }
}
export { userLogin };
export default loginScreen;

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
