/*****************************************************************************************
 * @purpose : it will provides color component
 * @author  : Surendra      
 * @file    : color.jsx
 * @overview: These file may contain color component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import color from '../assets/color.svg'
import { IconButton, Tooltip, Card } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import { withStyles } from '@material-ui/core/styles';
// // import {  MuiThemeProvider } from '@material-ui/core';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const colorCodesAndNames = [{ name: "white", colorCode: "rgb(255, 255, 255)" },
{ name: "lightGreen", colorCode: "rgb(0,128,0)" },
{ name: "purple", colorCode: "rgb(128,0,128)" },
{ name: "red", colorCode: "rgb(255,0,0)" },
{ name: "Teal", colorCode: "rgb(167, 255, 235)" },
{ name: "pink", colorCode: "rgb(253, 207, 232)" },
{ name: "orange", colorCode: "rgb(251, 188, 4)" },
{ name: "blue", colorCode: "rgb(203, 240, 248)" },
{ name: "brown", colorCode: "rgb(230, 201, 168)" },
{ name: "yellow", colorCode: "rgb(255, 244, 117)" },
{ name: "darkBlue", colorCode: "rgb(174, 203, 250)" },
{ name: "gray", colorCode: "rgb(232, 234, 237)" }]


  
class ColorComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false

         }
          this.handleToggle = this.handleToggle.bind(this);
         this.handleColor = this.handleColor.bind(this);
        //  this.handleMouseEnter = this.handleMouseEnter.bind(this);
      
  }
  
  closePopper() {
    this.setState({
        open: false
    })
}

handleColor(evt) {
    console.log("fghty", this.props.noteID)
    this.props.toolsPropsToColorpallete(evt.target.value, this.props.noteID);
    console.log("noteid",this.props.noteID);
    
}
 handleToggle() {
    this.setState({ open: !this.state.open });
    this.props.handleToggle(!this.state.open)
}
   render() {
    const changeCardColor = colorCodesAndNames.map((colorKey) =>
    
    <Tooltip title={colorKey.name}>
    <IconButton style={{ backgroundColor: colorKey.colorCode, "margin": "2px", }}
        value={colorKey.colorCode}
        onClick={this.handleColor}
        >
    </IconButton>
</Tooltip>
);
        return (
          // <MuiThemeProvider theme={theme} >
             <div style={{overflow:"hidden"}} >
                      <Tooltip title="Change Color">
               <IconButton>
                <img src={color} alt="color"
              onClick={this.handleToggle} 
                    >
                </img>
                     </IconButton>
                     </Tooltip>
               <div>
                    {this.state.open ?
                        <ClickAwayListener onClick={() => this.closePopper()}>
                            <Card id="colorPalleteCard" style={{overflow:"hidden"}}>
                                {changeCardColor}
                            </Card>
                        </ClickAwayListener>
                        : null}
                </div>
                  </div>
                  /* </MuiThemeProvider> */
        )
    }
  }
  export default ColorComponent;
  // export default withStyles( { withTheme: true })(ColorComponent);