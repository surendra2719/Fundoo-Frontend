/*****************************************************************************************
 * @purpose : it will provides girdview component
 * @author  : Surendra      
 * @file    : girdview.jsx
 * @overview: These file may contain girdview component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

class CardsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            view: false
        }
        //this.handleCardsView = this.handleCardsView.bind(this);
    }

    handleCardsView=(evt)=> {
        evt.preventDefault();
      //  console.log("controll coomes in handle view==>");
        
        this.setState({ view: !this.state.view });
        this.props.notes123();
    }

    render() {
        return (
            this.state.view ?
                <div>
                    <IconButton>
                        <Tooltip title="List View" onClick={this.handleCardsView}>
                            <img src={require('../assets/gird.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
                :
            <div>
                    <IconButton >
                        <Tooltip title="Grid View" onClick={this.handleCardsView}>
                            <img src={require('../assets/list.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
        )

    }
}
export default CardsView