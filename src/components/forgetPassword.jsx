/*****************************************************************************************
 * @purpose : it will provides forgetPassword component
 * @author  : Surendra      
 * @file    : forgetPassword.jsx
 * @overview: These file may contain forgetPassword component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react'
import '../App.css'
import { forgot } from '../services/services'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "react-toastify/dist/ReactToastify.css";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
class ForgetPasswordscreen extends React.Component {
    constructor(props) {
    
        super(props);
        this.state = {
            email: '',
            open: false,
            errormsg: '',
            formErrors: {
                email: ""
 
            }
        
        }
    }
    handleClose = (event, reason) => {
        try{
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
    }
    catch(err)
    {

        console.log("error in handle close in forget password");
        
    }
      };
    
    handleChange = e => {
         e.preventDefault();
try{
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
    
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    catch(err)
    {
        console.log("error in handle change in forget password");
        
    }
    };
    handleSubmit = e => {
        e.preventDefault();

        if (formValid( this.state)) {
        
             forgot(this.state.email)
             .then((res)=>{

                this.setState({ open: true, errormsg: " PLEASE CHECK YOUR MAIL " })
             })
             .catch((err)=>{
                this.setState({ open: true, errormsg: " USER NOT FOUND" })
             
             
             })
             
            
            // this.setState({ open: true, errormsg: " update unsucessesful" })
              console.log(`
              --SUBMITTING-
              email ${this.state.email}

      `);  
      console.log("result",this.state.res);
      
      
        } else if((this.state)) {

            this.setState({ open: true, errormsg: " INAVALID INPUT " })

        }
        else{
            this.setState({ open: true, errormsg: " INAVALID INPUT " })
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

    render() {const { formErrors } = this.state;

        return (
            <div class="background " >
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
                        <h2>Find Your mail </h2>
                  
                     <small>   <h2 id="loginheader">Enter Your Recovery mail</h2></small>
                   
                    </div>
                      <div  >
                        <form id="container " noValidate autoComplete="off">
                            <TextField
                                   className="textfieldInput"
                                   id="username"
                                   label="User name"
                                   type="email"
                                   margin="normal"
                                   variant="outlined"
                                   onChange={this.handleChange}
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
                        <div >
                            <form  noValidate autoComplete="off">
                                <Button onClick={this.handleSubmit} class="BUTTONS buttonslabel" type="submit" >
                                    SUBMIT
                                  </Button>
                                 
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
                                    /></form>
                                     <Button id="fbutton" onClick={this.registrationclick}  type="submit" variant="none" >
                                    Signin
                                  </Button>
                        </div >
                        <div >
                   
                        </div>
                    </div>
                    <div>
 {/* < ToastContainer/> */}
                    </div>

            
                </div>

            </div>

        )
    }
}
export {forgot };
export default ForgetPasswordscreen;

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);const formValid = ({ formErrors, ...rest }) => {
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