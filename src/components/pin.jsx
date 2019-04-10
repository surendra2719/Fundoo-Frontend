/*****************************************************************************************
 * @purpose : it will provides pin component
 * @author  : Surendra      
 * @file    : pin.jsx
 * @overview: These file may contain pin component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import pinned from '../assets/pinned.svg'
import unpinned from '../assets/unpinned.svg'
import { Tooltip } from '@material-ui/core';
class EditPin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPinned: false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
    if (typeof this.props.pinStatus !== "undefined") {
      this.setState({
        isPinned: this.props.pinStatus
      })

    }
  }
  async handleClick() {
    await this.setState({ isPinned: !this.state.isPinned });
    this.props.cardPropsToPin(this.state.isPinned, this.props.noteID)
  }

  render() {

    return (
      this.props.pinStatus ?

        <Tooltip title="Unpin Note" onClick={this.handleClick}>
          <img src={pinned}
            className="pinIcon" alt="pinIcon" />
        </Tooltip>


        :
        <Tooltip title="Pin Note" onClick={this.handleClick}>
          <img src={unpinned}
            className="pinIcon" alt="pinIcon" />
        </Tooltip>
    )
  }
}
export default EditPin;