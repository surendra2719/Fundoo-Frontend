/*****************************************************************************************
 * @purpose : it will provides dash board component
 * @author  : Surendra      
 * @file    : dashBoard.jsx
 * @overview: These file may contain dashhboard component
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react'
import '../App.css'
import Dashboard from '../screens/dashBoardScreen'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import img from '../assets/keep_48dp.png';
import Sidebar from './sidebar';
import Gird from '../components/view'
import Logout from './Logout';
import Notes from '../components/notes'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NoteDisplay from '../components/notesdisplays'

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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -90,
    marginTop: -14.5
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginTop: -18.5
  },
})
class dashBoardscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
      open: true,
      trash: false,
      archive: false,
      reminder: false,
      cardStyles: false,
      searchNote: ""

    }
    // this.getNewNote = this.getNewNote.bind(this);
    // this.noteToCards = React.createRef();

    this.noteToCards = React.createRef();


    this.handleNavigation = this.handleNavigation.bind(this);



  }
  makelabelfalse=()=>{
    this.noteToCards.current.makelabelfalse();
  }


  searchLabels=(value)=> {
    this.setState({ label: value });
    console.log("searchlabels", value);
    this.noteToCards.current.displayLabelledCards();
}


  handleSearchBar=(evt)=> {
    this.setState({ searchNote: evt.target.value });
    this.getSearchedNotes(evt.target.value)
  }
  getNewNote = (newCard) => {
    console.log("asdhvgfjsadfsadgfysdf", newCard);
    this.noteToCards.current.displayNewCard(newCard);
  }
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }))
    }
    catch (err) {
      console.log(err, "error in toggle ");

    }
  }
  handleSubmit = e => {
    try {
      e.preventDefault();
    }
    catch (err) {
      console.log("error in handle submit in dash board");

    }
  };

  handleMobileMenuOpen = event => {
    try {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    }
    catch (err) {
      console.log("error in handle mobile menu open in dash board+");

    }

  };

  getSearchedNotes=(value)=> {
    this.setState({ searchNote: value })
  }

  handleDrawerOpen = () => {
    try {
      this.setState({ open: true });
    }
    catch (err) {
      console.log("error in handle drawer open in dashboard");

    }
  };
  handleDrawerClose = () => {
    try {
      this.setState({ open: false });
    }
    catch (err) {
      console.log("error in handle close drawer in dash board");

    }
  };
  // getNewNote(newCard) {
  //   this.noteToCards.current.displayNewCard(newCard);
  // }

  handleNavigation = (reminder, archive, trash) => {
    console.log("handleNAvigation", reminder, archive, trash);

    if (reminder === true || archive === true || trash === true) {

      this.setState({
        reminder: reminder,
        archive: archive,
        trash: trash
      })
    } else {
      this.setState({
        reminder: false,
        archive: false,
        trash: false
      })
    }
  }
  handleCardStyle = () => {
    console.log("view is changed==>");
    this.setState({ cardStyles: !this.state.cardStyles });


  }
  // handleAppbar=()=> {
  //   this.handleCardStyle();
  // }

//   searchLabels=(value)=> {
//     // this.searchLabels(value)
// }
  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div className="">
        <AppBar id="appbarinfunddo" position="fixed" color="inherit"
        >
          <Toolbar>
            <IconButton className="menuButton" color="inherit" aria-label="Open drawer"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <span><img src={img} alt="" ></img></span>
            <Typography className="title" variant="h6" color="inherit" noWrap>
              Fundoo
             </Typography>
            <span id="search">
              <div id="searchIcon">
                <SearchIcon 
                   />
              </div>
              <InputBase
                id="inputRoot"
                placeholder="Search"
     
                onChange={this.handleSearchBar}
                  getSearchedNotes={this.getSearchedNotes} 
              />
            </span>
            
            <span>
              < Gird
                notes123={this.handleCardStyle}
              />
            </span>
            < Logout props={this.props} />
          </Toolbar>
        </AppBar>

        <div>    <Sidebar 
        makelabelfalse={this.makelabelfalse}
        menuact={this.state.open}
          handleNavigation={this.handleNavigation}
          searchLabels={this.searchLabels}
          // makeLabelFalse={this.props.makeLabelFalse}
   /> </div>
        <div className={classes.drawerHeader} >
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            {this.state.archive ||
              this.state.trash ||
              this.state.searchNote
              ?
              <NoteDisplay
                noteProps={this.state.cardStyles}
                navigateArchived={this.state.archive}
                navigateTrashed={this.state.trash}
                searchNote={this.state.searchNote}
                ref={this.noteToCards}
              />
              :
              <p>
                < Notes getNewNote={this.getNewNote}
                          />
                <NoteDisplay
                   labelValue={this.state.label}
                  noteProps={this.state.cardStyles}
                  navigateArchived={this.state.archive}
                  navigateTrashed={this.state.trash}
                  navigateReminder={this.state.reminder}
                  searchNote={this.state.searchNote}
                  ref={this.noteToCards}

                />
              </p>
            }
          </main>
        </div>
      </div>

    );
  }
}
dashBoardscreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export { Dashboard };
export default withStyles(styles, { withTheme: true })(dashBoardscreen);


