/*****************************************************************************************
 * @purpose : it will provides registration component
 * @author  : Surendra      
 * @file    : registration.jsx
 * @overview: These file may contain registration component and its functions
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
import { userRegister } from '../services/services';
import "react-toastify/dist/ReactToastify.css";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
class registerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            conformpassword: '',
            showPassword: false,
            showPassword1: false,
           open:false,
          
            errormsg: '',
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                conformpassword: "",
                toast: false
            }
        }
    }

    handleClick = state => () => {
        try{
        this.setState({ open: true, ...state });
        }
        catch(err)
        {
            console.log(err,"error in handle click in registration");
            
        }
      };
    
      handleClose = () => {
          try{

          
        this.setState({ open: false });
          }
          catch(err)
          {
              console.log(err,"error in handle close in registration");
              
          }
      };
    
  
    handleSubmit = e => {
        e.preventDefault();
try{
        if (formValid(this.state)) {


            userRegister(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
                .then((res) => {
                    console.log("reg page");
                    this.props.props.history.push("/login")
                })
                .catch( (err)=> {

                    this.setState({ open: true, errormsg: "REGISTRATION UNSUCESSFUL" })
                });
        } else {
            this.setState({ open: true, errormsg: "ENTER THE ALL FIELDS CORRECTLY" })
        }
    }
    catch(err){
        console.log(err,"error in handle submit in registration");
        
    }
    };

    registrationclick = e => {
        e.preventDefault();
        try{

        this.props.props.history.push("/login");
        }
        catch(err)
        {
            console.log(err,"error in registration click in registration");
            
        }
    };

    handleChange1 = e => {
        // e.preventDefault();
try{
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                +
                    value.length < 5 ? "minimum 5 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 5 ? "minimum 5 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "conformpassword":
                formErrors.conformpassword = 
                    value.length<6? "minimum 6 characaters required" : "";
                break;
            default:
                break;
                
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    catch(err)
    {
        console.log(err,"error in hadle submit in registration");
        
    }
    };

    handleChange = prop => event => {
        try{
        this.setState({ [prop]: event.target.value });
        }
         catch(err)
         {
             console.log(err,"error in handle change in registration");
                      }  
    };

    handleClickShowPassword = () => {
        try{
        this.setState(state => ({ showPassword: !state.showPassword }));
        }
        catch(err)
        {
            console.log(err,"error  in handle click password in registration");
            
        }
    };
    handleClickShowPassword1 = () => {
        try{
        this.setState(state => ({ showPassword1: !state.showPassword1 }));
        }
        catch(err){
            console.log(err,"error in handle click password1 in registration");
            
        }
    };

    render() {

        const { formErrors } = this.state;
     
        return (

            <div class="background " onSubmit={this.handleSubmit}>
                <div className="registrationwrapper">
                    <div>
                        <h1 >
                            <span id="headerF"><b>F</b></span>
                            <span id="headerR"><b>u</b></span>
                            <span id="headerg"><b>n</b></span>
                            <span id="headerB"><b>d</b></span>
                            <span id="headerY"><b>o</b></span>
                            <span id="headerR"><b>o</b></span>

                        </h1>
                    </div>
                    <div> <label>

                        <h2 id="loginheader">Create Your Fundoo Account</h2>
                        <form id="container1" noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                            <div>
                                <TextField
                                    className={formErrors.firstName.length > 0 ? "error" : null}
                                  
                                     id="firstName"
                                    label="First name"
                                    type="email"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange1}
                                    name="firstName"
                                    value={this.state.firstName}
                                />
                                <span>
                                    {formErrors.firstName.length > 0 && (
                                        <div className="errorMessage">{formErrors.firstName}</div>
                                    )}
                                </span>

                            </div>

                            <div>       <label >    <TextField
                                id="lastName"
                                label="Last name"
                                type="email"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange1}
                                name="lastName"
                                value={this.state.lastName}

                            />
                            </label>
                                <span>
                                    {formErrors.lastName.length > 0 && (
                                        <div className="errorMessage">{formErrors.lastName}</div>
                                    )}
                                </span>
                            </div>  </form>
                    </label>

                    </div>
                    <div >
                        <form id="container2" noValidate autoComplete="off">
                            <TextField
                                className="textfieldInput1"
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
                        <label>
                            <form id="container1" noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        className="TextFields"
                                        id="password1"
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
                                    </span>
                                </div>
                                <span>
                                    <label >
                                        <TextField
                                            id="conformpassword"
                                            label="Conform password"
                                            className="TextFields"
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

                                    </label>
                                    <div>
                                        <span>
                                            {formErrors.conformpassword.length > 0 && (
                                                <div className="errorMessage">{formErrors.conformpassword}</div>
                                            )}
                                        </span>
                                    </div>
                                </span>
                            </form>
                        </label>
                        <div >
                            <form noValidate autoComplete="off">
                                <Button  onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })} onSubmit={this.handleSubmit} class="BUTTONS buttonslabel" type="submit" >
                                    submit
                         </Button>
                         <Snackbar
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
                            <div>
                                <form id="container" noValidate autoComplete="off">
                                    <Button class="CREATEBUTTONS buttonslabel" type="submit"
                                    >
                                        <b onClick={this.registrationclick}> Sign in instead</b>
                                    </Button>
                                  
                                </form>
                            </div>
                        </div >

                    </div>

                </div>
      
            
            </div>

        )
    }
}
export { userRegister };
export default registerScreen;

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
