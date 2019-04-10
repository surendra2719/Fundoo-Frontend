/*****************************************************************************************
 * @purpose : it will provides moreOptions component
 * @author  : Surendra      
 * @file    : moreOptions.svg
 * @overview: These file may contain moreOptions  component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import moreOptions from '../assets/moreOptions.svg'
import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
import { MenuItem, Popper, Paper, Fade, Tooltip, ClickAwayListener, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AddLabelsOnNote from './addlabels';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                margin: "0px",
                marginTop: 72
            },

        },
    },
    //   typography: {
    //       useNextVariants: true,
    //   },
})

class MoreComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
     
        this.moreOptionsToAddLabels = React.createRef();
        this.clickMoreOptions = this.clickMoreOptions.bind(this);
        this.handleTrashedNotes = this.handleTrashedNotes.bind(this);
        this.handleLabelsOnNote = this.handleLabelsOnNote.bind(this);
    }
    clickMoreOptions=(event)=> {
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,

        }));
    }
    handleTrashedNotes = () => {
        this.closeLabelPopper();
        this.props.trashNote(this.props.noteID);
        console.log("dasdasdsa",this.props.noteID);
        
    }
  
    closeLabelPopper = () => {
        this.setState({
            open: false
        })
    }
    handleLabelsOnNote=(e)=> {
        this.setState({
            open: false
        })
        this.moreOptionsToAddLabels.current.addLabelPopup(e);
    }
    render() {
        const { anchorEl, open } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div >
                    <Tooltip title="Moreoptions">
                        <IconButton>
                            <img
                                onClick={this.clickMoreOptions}
                                src={moreOptions} alt="moreOptions"></img>
                        </IconButton>
                    </Tooltip>
                    <Popper open={open} anchorEl={anchorEl} placement={'right'} transition style={{ position: "fixed", zIndex:9999 }}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={0}>
                                <Paper className="moreOptionsPopper" >
                           
                                        <div id="selectMoreOptions">
                                        <ClickAwayListener onClickAway={() => this.closeLabelPopper()}>
                                            <MenuItem id="moreOptionsMenu" onClick={this.handleTrashedNotes}>Delete Note</MenuItem>
                                            <MenuItem id="moreOptionsMenu"  onClick={this.handleLabelsOnNote} >Add Label</MenuItem>
                                            </ClickAwayListener>
                                        </div>
                                   
                                </Paper>
                            </Fade>
                        )}
                    </Popper>

           <AddLabelsOnNote ref={this.moreOptionsToAddLabels} noteID={this.props.noteID} addLabelToNote={this.props.addLabelToNote} anchorEl={this.state.anchorEl}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default MoreComponents;
