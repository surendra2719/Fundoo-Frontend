/*****************************************************************************************
 * @purpose : it will provides remainder component
 * @author  : Surendra      
 * @file    :remainder.jsx
 * @overview: These file may contain remainder component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import remainder from '../assets/remain.svg'
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { MenuItem, Paper, Tooltip, ListItem, createMuiTheme, MuiThemeProvider, ClickAwayListener } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';



// class Remainder extends React.Component {
//   state = {
//     anchorEl: null,
//     open: false,
//     placement: null,
//   }

//   handleClick = placement => event => {
//     const { currentTarget } = event;

//     this.setState(state => ({
//       anchorEl: currentTarget,
//       open: state.placement !== placement || !state.open,
//       placement,
//     }));
//   };
//   handleClose = () => {
//     this.setState(state => ({ open: !state.open }))
//   }
//   setTodayReminder = () => {
//     this.handleClose();
//     let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
//     var date = new Date().toDateString();
//     console.log("date ==>", date);
//     var reminder1 = date + ", 8 " + ampm;
//     console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr",reminder1);
//     this.props.reminder(reminder1, this.props.noteID)
//     console.log("note",this.props.noteID);

//   }
//   setTomorrowReminder = () => {

// let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
// var date = new Date().toDateString();
// date = date.replace(new Date().getDate().toString(), new Date().getDate() + 1);
// date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
// var reminder1 = date + ", 8 AM";
// console.log("notereminder-->", reminder1);
// this.props.reminder(reminder1, this.props.noteID)
//     this.handleClose();
//   }
//   setWeeklyReminder = () => {
//     this.handleClose();
//   }
//   render() {
//     const setAMPM = this.props.parentToolsProps;
//     const { anchorEl, open, placement } = this.state;
//     return (
//       <MuiThemeProvider theme={theme}>
//         <div>
//           <div>
//             <Tooltip title="Remind me">

//               <IconButton >  <img src={remainder}
//                 className="reminderIcon"
//                 onClick={this.handleClick('bottom-start')} alt="remider icon" />
//               </IconButton>
//             </Tooltip>
//           </div>
//           <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: 9999 }}>
//             {({ TransitionProps }) => (
//               <Fade {...TransitionProps} timeout={350}>
//                 <Paper id="reminderPopper">
//                   <ClickAwayListener onClickAway={this.handleClose}>
//                     <div >
//                       <ListItem className="listRemindr" >Reminder:</ListItem>
//                       <MenuItem className="currentDate"  onClick={() => this.setTodayReminder()}
//                       >
//                         <div>Later today</div>
//                         <div>8:00 {setAMPM}</div>
//                       </MenuItem>
//                       <MenuItem className="currentDate" onClick={() => this.setTomorrowReminder()} >
//                         <div>Tomorrow</div>
//                         <div>8:00 AM</div>
//                       </MenuItem>
//                       <MenuItem className="currentDate" onClick={() => this.setWeeklyReminder()}   >
//                         <div>Next Week</div>
//                         <div>Mon, 8:00 AM</div>
//                       </MenuItem>
//                       <MenuItem className="currentDate"  >
//                         <div>Home</div>
//                         <div>Mumbai</div>
//                       </MenuItem>
//                     </div>
//                   </ClickAwayListener>
//                 </Paper>
//               </Fade>
//             )}
//           </Popper>
//         </div>
//       </MuiThemeProvider>
//     )
//   }
// }
// export default Remainder;




import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { askForPermissioToReceiveNotifications } from "../push-notification";
const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        borderbottomrightradius: 0,
        bordertoprightradius: 0,
        height: "13px",
        marginTop: "8px",
        marginBottom: "8px",
        width: "268px",
        fontSize: "12px",
      }
    },
    MuiPaper: {
      root: {
        zIndex: "1"
      }
    },
  },
  typography: {
    useNextVariants: true,
  },
})
export default class reminder extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    placement: null,
    date: "",
    snak2open: false,
    title: "",
    description: ""

  };
  /**
   * @description:it handles the onclick on reminder event
   */
  handleClick = placement => event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: state.placement !== placement || !state.open,
        placement,
      }));
    } catch (err) {
      console.log("error at handleClick in reminder");
    }
  };
  /**
   * @description:it handles the close the current event
   */
  handleClose = () => {
    try {
      this.setState(state => ({ open: !state.open }))
    } catch (err) {
      console.log("error at handleClose in reminder");
    }
  }
  setTodayReminder = () => {
    this.handleClose();
    let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
    var date = new Date().toDateString();
    var reminder1 = date + ", 8 " + ampm;
    console.log("today reminder data=====>", reminder1);
    this.props.reminder(reminder1, this.props.noteID)
  }
  setTomorrowReminder = () => {
    this.handleClose();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
    var date = new Date().toDateString();
    date = date.replace(new Date().getDate().toString(), new Date().getDate() + 1);
    date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
    var reminder1 = date + ", 8 AM";
    console.log("tomorow reminder data====>", reminder1);
    this.props.reminder(reminder1, this.props.noteID)
  }
  // setWeeklyReminder = () => {
  //     this.handleClose();
  //     var date = new Date().toDateString();
  //     date = date.replace(new Date().getDate().toString(), (new Date().getDate() + 7));
  //     var reminder1 = date + ", 8 AM";
  //     console.log("weekly reminder data=====>", reminder1);
  //     this.props.reminder(reminder1, this.props.noteID)
  // }

  handlesubmit = event => {
    event.preventDefault();
    this.handleClose();
    console.log("datedatedatedate", this.state.date);
    //console.log("notess in reminder==>", this.props.note);
    this.props.reminder(this.state.date, this.props.noteID);
  }
  
  componentDidUpdate() {
    console.log("reminder date in componentwillmount-->", this.props.date);
    if (this.props.date !== undefined && this.props.date !== "") {
      askForPermissioToReceiveNotifications(this.props.date, this.props.notetitle, this.props.notedescription)
        .then((diff) => {
          console.log("difff in reminder-------", diff);
          setTimeout(() => {
            this.setState({ snak2open: true });
            console.log("start----------->");
            this.props.reminder("", this.props.noteID);
          }, diff);
        })
        .catch((err) => {
          console.log("error in set timeout reminder", err);
        })
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });

  };

  handleClose1 = () => {

    this.setState({ snak2open: false });
  };

  render() {
    // const setAMPM = this.props.parentToolsProps;
    const { anchorEl, open, placement } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
<IconButton>
          <Tooltip title="Remind me">
            <img src={remainder}
              // className="reminderIcon"
              className="toolBtn"
              onClick={this.handleClick('bottom-start')} alt="remider icon" />
          </Tooltip>
          </IconButton>
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: 9999 }}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper id="reminderPopper">
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <div>
                      <ListItem className="listRemindr" >Reminder:</ListItem>
                      <MenuItem >
                        <TextField
                          id="datetime-local"
                          //label="Next appointment"
                          type="datetime-local"
                          defaultValue="2019-04-06T10:28"
                          // className={classes.textField}
                          onChange={this.handleChange('date')}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </MenuItem>
                      <MenuItem className="currentDate" onClick={() => this.setTodayReminder()}>
                      </MenuItem>
                      <MenuItem className="currentDate" onClick={() => this.setTomorrowReminder()}>
                        <div>Tomorrow</div>
                        <div>8:00 AM</div>
                      </MenuItem>
                      {/* <MenuItem className="currentDate" onClick={() => this.setWeeklyReminder()}>
                                                <div>Next Week</div>
                                                <div>Mon, 8:00 AM</div>
                                            </MenuItem> */}
                      {/* <MenuItem className="currentDate">
                                                <div>Home</div>
                                                <div>Bangalore</div>
                                            </MenuItem> */}
                      <div id="savereminder">
                        <Button onClick={this.handlesubmit} >
                          Save
                       </Button>
                      </div>
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snak2open}
            message={
              <span>{this.props.notetitle}, {this.props.notedescription}</span>
            }
            action={[
              <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
                UNDO
                            </Button>,
              <IconButton
                onClick={this.handleClose1}
              >
                <CloseIcon />
              </IconButton>,

            ]}
          />







        </div>
      </MuiThemeProvider>
    )
  }
}