/*****************************************************************************************
 * @purpose : it will provides archive component
 * @author  : Surendra      
 * @file    : archives.svg
 * @overview: These file may contain archive component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import Archieve from '../assets/archives.svg'

import { Snackbar, Button, IconButton, Tooltip } from '@material-ui/core';
class ArchieveComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        isArchived: false
         }
  }
  handleArchive=()=> {
    console.log("this.props.archiveStatus in handle",this.props.archiveStatus);
    
    if (this.props.archiveStatus === false) {
        // eslint-disable-next-line 
        this.state.isArchived= true;
        console.log("this.state.isArchived changed", this.state.isArchived);
        this.props.archiveNote(this.state.isArchived, this.props.noteID)
    }
    else{
         // eslint-disable-next-line 
        this.state.isArchived= false;
    console.log(" this.state.isArchived changle else", this.state.isArchived);
    this.props.archiveNote(this.state.isArchived, this.props.noteID)
    }
}

handleClick = () => {
  this.setState({ open: false });

}

   render() {
        return (
          this.state.isArchived ?
             <div > 
                 <Tooltip title="Archives">
                 <IconButton
                     onClick={
                      this.handleArchive}>
                 <img src={Archieve} alt="archives"      onClick={
                            this.handleArchive}></img>
                     </IconButton> 
                     </Tooltip>
                     </div>
                       :
                       <div>
                           <Tooltip title="Archive Note" 
                           >
                             <IconButton   onClick={
                                    this.handleArchive}>
                               <img
                               src={Archieve}
                                   alt="archive note icon"
                                 
                               />
                                </IconButton> 
                           </Tooltip>
                           <Snackbar
                               anchorOrigin={{
                                   vertical: 'bottom',
                                   horizontal: 'left',
                               }}
                               open={this.state.open}
                               message={<span>Note archived</span>}
                               action={[
                                   <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
                                       UNDO
                                    </Button>,
                                   <IconButton
                                       onClick={this.handleClick}
                                   >
                                       {/* <img src={closeIcon} alt="snackBar close" /> */}
                                   </IconButton>,
                               ]}
                           />
                       </div>

        )
    }
  }
export default ArchieveComponent;
