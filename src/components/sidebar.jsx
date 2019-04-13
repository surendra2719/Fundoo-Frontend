/*****************************************************************************************
 * @purpose : it will provides sidebar component
 * @author  : Surendra      
 * @file    : sidebar.jsx
 * @overview: These file may contain sidebar component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react'
import '../App.css'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import notes from '../assets/notes.svg'

import remainder from "../assets/remainder.svg"
import archives from '../assets/archives.svg'
import bin from '../assets/bin.svg'
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menuedit from "../assets/menuEdit.svg"
import Lables from "../assets/labelIcon.svg"
import {getLabels} from "../services/note.services"
import EditLabel from "./editlabels"
// import Typography from '@material-ui/core/Typography';
const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        top: 67,
        width: 270,
      },
      paperAnchorDockedLeft: {
        borderRight: "white"
      }
    }
  }
})
const styles = theme => ({
  menuItem: {
    borderRadius: "0 25px 25px 0",
    '&:focus': {
      backgroundColor: "#fff9c4",
      borderRadius: "0 25px 25px 0",
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  root: {
    display: 'flex',
  }
})

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
      open: false,
      open1:false,
      navigateReminder: false,
      navigateArchived: false,
      navigateTrashed: false,
      label: []
    
    }

    this.handleEditLabel = this.handleEditLabel.bind(this);
    this.showLabels = this.showLabels.bind(this);
    this.newLabels=this.newLabels.bind(this);
  }
  handleEditLabel() {
    this.setState({ open1: !this.state.open1 })
}
componentDidMount() {
  getLabels()
      .then((result) => {
          this.setState({
              label: result
          })
      })
      .catch((error) => {
          alert(error)
      });
}
displaySearchLabels=(value)=>{
  console.log("value",value);
  
  this.props.searchLabels(value)
}
showLabels(value) {
  // let labelArr=this.state.label;
  // if(value!==undefined){
  //     labelArr.push(value);
  //     this.setState({label:labelArr});
  // }
  this.setState({
      label: [...this.state.label, value]
  })
}

newLabels(value){
  this.setState({label:value})
}

  handleMobileMenuOpen = event => {
    try {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    }
    catch (err) {
      console.log("error in handle mobile menu open in side bar");

    }
  };

  handleDrawerOpen = () => {
    try {
      this.setState({ open: true });
    }
    catch (err) {
      console.log("error in handle drawer open in side bar");

    }
  };
  handleDrawerClose = () => {
    try {
      this.setState({ open: false });
    }
    catch (err) {
      console.log("error in handle drawer close in side bar");

    }
  };
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }))
    }
    catch{
      console.log("error in handle toggle in side bar");

    }
  }

  async handleArchived() {
  

    await this.setState({
      navigateReminder: false,
      navigateArchived: true,
      navigateTrashed: false
    })
    this.props.makelabelfalse();
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
  }
  async handleNotes() {
    await this.setState({
        navigateReminder: false,
        navigateArchived: false,
        navigateTrashed: false,
    })
    this.props.makelabelfalse();
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
}
async handleTrashed() {

  await this.setState({
      navigateReminder: false,
      navigateArchived: false,
      navigateTrashed: true
  })
  this.props.makelabelfalse();
  this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
}
async handleReminder() {
  await this.setState({
      navigateReminder: true,
      navigateArchived: false,
      navigateTrashed: false
  })
  this.props.makelabelfalse();
  this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
}
  render() {
    let displayLabels = this.state.label;
        if (this.state.label !== "") {
            displayLabels = this.state.label.map((key) =>
                <MenuItem style={{ display: "flex", flexDirection: "row",color: "#202124",fontFamily: "Google Sans, Roboto, Arial, sans-serif", fontSize: ".875rem" }} onClick={()=>this.displaySearchLabels(key.label)} key={key.label}>

                    <img src={Lables} alt="label icon" style={{ marginRight: "50px" }} />

                    <div style={{  marginRight: "50px",  marginBottom: "10px", marginTop: "10px",fontWeight:"550" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }

    const { classes } = this.props;
    return (
      <div  style={{marginTop:"auto"}} >

        <Toolbar>
          <IconButton
            title='main menu'
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleToggle}
          >
            <  MenuIcon />
          </IconButton>
          <div className="MuiDrawer-paper-61">

            <MuiThemeProvider theme={theme} >
              <Drawer
                variant="persistent"
                anchor="left"
                open={this.props.menuact}
              >
                <Divider />
                <ClickAwayListener onClickAway={() => this.handleToggle()}>
                  <MenuItem className={classes.menuItem} onClick={() => this.handleNotes()}
                  ><img src={notes} alt="" style={{ marginRight: "32px" }}></img>Notes </MenuItem>
                  <MenuItem className={classes.menuItem} onClick={() => this.handleReminder()}
                  ><img src={remainder} alt="" style={{ marginRight: "32px" }}></img>Reminders </MenuItem>
                  <Divider />
                  <List>
                    <small id="lable" >LABLES</small>
                    {/* {['Edit labels'].map((text, index) => (
                      <ListItem className={classes.menuItem} button key={text} >
                        <ListItemIcon >{index % 2 === 0 ? <img src={Label} alt=""></img> : <DeleteOutlinedIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        
                      </ListItem>
                    ))} */}
                          <div>
                            <div>
                                {displayLabels}
                            </div>
                            <MenuItem className={classes.menuItem} id="labelMenu" onClick={this.handleEditLabel}>

                                <img src={Menuedit} alt="edit icon"
                                    style={{ marginRight: "50px" }} />
                                Edit Labels
                            </MenuItem>
                        </div>  


                    <Divider />
                
                  </List>
                  <MenuItem className={classes.menuItem} onClick={() => this.handleArchived()}
                  ><img src={archives} alt="" style={{ marginRight: "32px" }}></img>Archive</MenuItem>
                  <MenuItem className={classes.menuItem} onClick={() => this.handleTrashed()}><img src={bin} alt="" style={{ marginRight: "32px" }}></img>Bin</MenuItem>
                </ClickAwayListener>
              </Drawer>
              <EditLabel
                    newLabels={this.newLabels}
                    label={this.state.label}
                    showLabels={this.showLabels}
                    drawerPropstoEditLabels={this.state.open1}
                    labelToggle={this.handleEditLabel} />
        <IconButton onClick={this.handleMobileMenuOpen} color="inherit">
        </IconButton>
            </MuiThemeProvider>

          </div>
        </Toolbar>
 
  

      </div>
      
    )
  }
}
export default withStyles(styles, { withTheme: true })(SidebarComponent);