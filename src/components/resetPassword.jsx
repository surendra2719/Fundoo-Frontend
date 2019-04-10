/*****************************************************************************************
 * @purpose : it will provides resetPassword component
 * @author  : Surendra      
 * @file    : resetPassword.jsx
 * @overview: These file may contain resetPassword component and its functions
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
import { reset } from '../services/services';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
class Resetpasswordscreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            conformpassword: '',
            showPassword: false,
            showPassword1: false,
            open: false,
            errormsg: '',
            formErrors: {
                password: "",
                conformpassword: ""

            }
        }
    }
    handleSubmit = event => {
        try{
        event.preventDefault();
      
        let current_url = window.location.pathname;
        let verify_user_token = current_url.substr(15);
        console.log("resetpassComponent--Current url is--:", current_url);
        console.log("resetpassComponent--Token is--:", verify_user_token);
        reset(this.state.password, verify_user_token)
            .then((res) => {
                this.props.props.history.push("/login");
            })
            .catch((err) => {


                this.setState({ open: true, errormsg: "UPDATE UNSUCESSESFUL" })
                console.log("vhfhgfhfhfyhyhf", err);

            });
        }
        catch(err)
        {
            console.log(err,"error in handle submit in reset password");
            
        }
    };

    handleClose = (event, reason) => {
        try{
        if (reason === 'clickaway') {
            return;
        }

    }
    catch(err)
    {
        console.log(err,"error in handle close");
        
    }
    };
    handleChange1 = e => {
        //  e.preventDefault();
try{
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {

            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "conformpassword":
                formErrors.conformpassword =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    catch(err)
    {
        console.log(err,"error in handle change 1 in reset password");
        
    }
    };
    
    handleChange = prop => event => {
        try{
        this.setState({ [prop]: event.target.value });
        }
        catch(err)
        {
            console.log(err,"error in handle change in reset password");
            
        }
    };

    handleClickShowPassword = () => {
        try{
        this.setState(state => ({ showPassword: !state.showPassword }));
        }
        catch(err)
        {
            console.log(err,"error in handle click show password in reset password");
            
        }
    };
    handleClickShowPassword1 = () => {
        try{
        this.setState(state => ({ showPassword1: !state.showPassword1 }));
        }
        catch(err){
            console.log(err,"error in handle click show password 1 in reset password");
            
        }

    };
    render() {
        const { formErrors } = this.state;
        return (
            <div class="background " onSubmit={this.handleSubmit}  >
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
                        <h2> Reset Your password</h2>

                        <small id='color'>Please choose a new password to signing in</small>

                    </div>
                    <div  >
                        <form id="container" noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                            <TextField
                                id="newpassword"
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
                            </span></form>
                    </div>
                    <div>
                        <form id="container" noValidate autoComplete="off">
                            <TextField
                                id="cpassword"
                                label="Conform password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange1}
                                name="conformpassword"
                                value={this.state.conformpassword}
                                type={this.state.showPassword1 ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword1}
                                            >
                                                {this.state.showPassword1 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <span>
                                {formErrors.conformpassword.length > 0 && (
                                    <div className="errorMessage">{formErrors.conformpassword}</div>
                                )}
                            </span></form>
                        <div >
                            <form noValidate autoComplete="off">
                                <Button class="BUTTONS buttonslabel" type="submit" >
                                    <small onClick={this.handleSubmit}>submit</small>
                                </Button>
                            </form>

                            <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.open}
                                        autoHideDuration={6000}
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
                                    />


                        </div >

                    </div>
                    <div>

                    </div>


                </div>

            </div>

        )
    }
}
export { reset };
export default Resetpasswordscreen;
// const formValid = ({ formErrors, ...rest }) => {
//     let valid = true;

//     // validate form errors being empty
//     Object.values(formErrors).forEach(val => {
//         val.length > 0 && (valid = false);
//     });

//     // validate the form was filled out
//     Object.values(rest).forEach(val => {
//         val === null && (valid = false);
//     });

//     return valid;
// };
