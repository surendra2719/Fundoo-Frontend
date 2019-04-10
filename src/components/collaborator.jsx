/*****************************************************************************************
 * @purpose : it will provides collaborator component
 * @author  : Surendra      
 * @file    : collaborator.jsx
 * @overview: These file may contain collaborator component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import Collaborator from '../assets/collaborator.svg'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
class CollaboratorComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         }
  }
   render() {
        return (
        
             <div >
                <Tooltip title="collaborator">
                 <IconButton>
                 <img src={Collaborator} alt="collaborator"></img>
                 </IconButton>
                 </Tooltip>
                     </div>

        )
    }
  }
export default CollaboratorComponent;
