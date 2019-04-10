import React, { Component } from 'react';
import { Dialog, Input, Button, MuiThemeProvider, createMuiTheme, Chip } from '@material-ui/core';
import Tools from '../components/tools';
import EditPin from '../components/pin';
import '../App.css'
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                borderRadius: "20px",
                boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
                overflowY: "inherit",
                border: "1px solid #dadce0",
            }
        },
        MuiBackdrop:
        {
            root: {
                backgroundColor: "rgba(11, 11, 11, 0.18)"
            }
        },
        MuiInputBase:
        {
            multiline: {
                padding: "9px 30px 7px"
            }

        },
        MuiChip: {
            root: {
                fontSize: 10,
                height: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            title: "",
            description: "",
            color: "",
            archive: false,
            _id: "",
            reminder: "",
            image: ""
        }
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
        this.getData = this.getData.bind(this);
    }
    async handleTitleClick(evt) {
        await this.setState({ title: evt.target.value })
    }
    async handleDescClick(evt) {
        await this.setState({ description: evt.target.value })
    }
    async handleToggle(e) {
        console.log("this.state.title==>", this.state.title);
        console.log("this.state.description==>", this.state.description);
        await this.props.editTitle(this.state.title, this.state._id)
        await this.props.editDescription(this.state.description, this.state._id)
        this.props.closeEditBox(e);
    }
    getData(note) {
        console.log("note in dialog==>", note.title);
        if (note.title !== undefined || note.descrption !== undefined) {
            this.setState({
                note: note,
                title: note.title,
                color: note.color,
                description: note.description,
                archive: note.archive,
                _id: note._id,
                pinned: note.pinned,
                reminder: note.reminder,
                image: note.image
            })
        }
    }
    closeDialogPopper = (e) => {
        this.props.closeEditBox(e);
    }
    reminder1 = () => {
        this.setState({ reminder: "" })
        this.props.reminder('', this.state._id)

    }
    createNotePropsToTools = (value, noteID) => {
        this.setState({ color: value })
        this.props.createNotePropsToTools(value, noteID)

    }
    archiveNote = (value, noteID) => {
        this.setState({ archive: value })
        this.props.archiveNote(value, noteID)
        this.props.closeEditBox();
    }
    image = (value, noteID) => {
        this.setState({ image: value })
        this.props.uploadImage(value, noteID)

    }
    reminder = (value, noteID) => {
        this.setState({ reminder: value })
        this.props.reminder(value, noteID);
        console.log("csadsadasdsadsadsd");

    }
    trashNote = (noteID) => {
        this.props.trashNote(noteID);
        this.props.closeEditBox();
    }
    ispinned = (value, noteID) => {
        this.setState({ pinned: value })
        this.props.ispinned(value, noteID);
    }
    // reminderchip = () => {
    //     this.setState({ reminder: "" })
    //     console.log("sssssssssssssssssssssssssssssssssss", this.state.reminder);


    //     }
    render() {
        // console.log("note on dialog----", this.state.color);
        return (
            <div >
            <MuiThemeProvider theme={theme}> 
                <Dialog  style={{overflow:"auto"}}
                    id="dailogmain"
                    aria-labelledby="responsive-dialog-title"
                    open={this.props.parentProps}
                // noteID={this.props.noteID}
                >
                    <div id="dialogbox" style={{ backgroundColor: this.state.color,overflow:"hidden"}} >
                        <div>
                            {this.state.image !== "" ?
                                <img style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }} src={this.state.image} alt="cardImage"></img>
                                :
                                null}
                        </div>
                        <div id ="dailoginputtitleinput"style={{ display: "flex", justifyContent: "space-between", wordBreak: "break-word" ,overflow:'unset', }}>
                            <Input 
                                className="dialogInputBase"
                                disableUnderline={true}
                                placeholder="edit title"
                                multiline
                                value={this.state.title}
                                onChange={this.handleTitleClick}
                            />
                            <EditPin 
                                initialpinstatus={this.state.pinned}
                                noteID={this.state._id}
                                pinstatus={this.ispinned}
                            />
                        </div>
                        <div id="dailoginputdescription" style={{ display: "flex", justifyContent: "space-between", wordBreak: "break-word",marginLeft: "0px" }}>
                            <Input 
                                className="dialogInputBase"
                                disableUnderline={true}
                                placeholder="edit note"
                                multiline
                                value={this.state.description}
                                onChange={this.handleDescClick}
                            />
                        </div>
                        {this.state.reminder ?
                            <Chip id="chipcss"
                                label={this.state.reminder}
                                onDelete={() => this.reminder1()}
                            />
                            :
                            null}

                        <div className="cardToolsClose">
                            <Tools
                                // createNotePropsToTools={this.createNotePropsToTools}
                                // noteID={this.state._id}
                                // reminder={this.props.reminder}
                                // trashNote={this.trashNote}
                                // archiveStatus={this.state.archive}
                                // archiveNote={this.archiveNote}
                                archiveStatus={this.state.archive}
                                archiveNote={this.archiveNote}
                                noteID={this.state._id}
                                reminder={this.reminder}
                                createNotePropsToTools={this.createNotePropsToTools}
                                trashNote={this.trashNote}
                                uploadImage={this.image}

                            />
                            <Button id="doneButton" onClick={this.handleToggle.bind(this)}>Close</Button>
                        </div>
                    </div>
                </Dialog>
            </MuiThemeProvider>
            </div>
        )
    }
}