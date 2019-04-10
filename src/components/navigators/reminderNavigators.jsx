import React, { Component } from 'react';
import { Card, Chip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Tools from '../tools';
import EditPin from '../pin';
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                fontSize: 10,
                marginTop: 15,
                height: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                padding: 2
            },
            deleteIcon: {
                width: 20,
                height: 20
            }
        },

    },
    typography: {
        useNextVariants: true,
    },
})

class ReminderNavigator extends Component {
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        console.log("remindernoteprops", this.props.noteProps);

        return (
            <MuiThemeProvider theme={theme}>
                <label className="archievedLabel">REMINDERS</label>
                <div className="CardsView">
                    {this.props.remiderArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "10px", border: "1px solid #dadce0", marginLeft: "10px" }} >
                                <div>
                                    <div>
                                        {key.image !== "" ?
                                            <img style={{
                                                maxWidth: "100%",
                                                height: "auto"
                                            }} src={key.image} alt="cardImage"></img>
                                            :
                                            null}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                        <EditPin
                                            cardPropsToPin={this.props.pinNote}
                                            noteID={key._id}
                                            pinStatus={key.pinned}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    <Chip
                                        label={key.reminder}
                                        onDelete={() => this.props.reminder("", key._id)} />
                                </div>
                                <div className="noteicons">
                                    <Tools createNotePropsToTools={this.props.getColor}
                                        noteID={key._id}
                                        reminder={this.props.reminder}
                                        trashNote={this.props.trashNote}
                                        archiveNote={this.props.archiveNote}
                                        uploadImage={this.props.uploadImage}
                                        archiveStatus={key.archive}
                                    />
                                </div>
                            </Card>)
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ReminderNavigator;