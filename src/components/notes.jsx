/*****************************************************************************************
 * @purpose : it will provides note component
 * @author  : Surendra      
 * @file    : notes.jsx
 * @overview: These file may contain note component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Button } from '@material-ui/core';
import Tools from '../components/tools';
import Pin from '../components/pin'
import Image from '../components/image'
import { createNote } from '../services/note.services'
import { Chip, } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
class CreateNotescard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            reminder: "",
            description: "",
            image: "",
            pinned: false,
            color: "rgb(255, 255, 255)",
            trash: false,
            archive: false,
            newNote: {},
            notes: []
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.handleReminder = this.handleReminder.bind(this);
        this.handlePinned = this.handlePinned.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }
    handleTitle(event) {
        try { this.setState({ title: event.target.value }) }
        catch (err) {
            console.log(err, "error in handle titte in notes");

        }
    }

    handleDescription(event) {
        try { this.setState({ description: event.target.value }) }
        catch (err) {
            console.log(err, "error in handle descrption in notes");

        }
    }


    handlePinned(value) {
        try {
            this.setState({ pinned: value });

        }
        catch (err) {
            console.log("error in handle pinned in notes");

        }
    }
    handleColor(value) {
        try {
            this.setState({ color: value });
        }
        catch (err) {
            console.log("error in handle color in create note");

        }
    }
    handleImage(value) {
        try {
            this.setState({ image: value });
        } catch (err) {
            console.log("error at handleImage in createNotes");
        }
    }
    handleReminder(value) {
        try {
            this.setState({ reminder: value })
        }
        catch (err) {
            console.log("error in handle remiander in create note");

        }
    }

    handleArchive(value) {
        this.setState({ archive: value });
    }

    handleToggle() {
        this.setState({ openNote: !this.state.openNote });
        console.log("pinned", this.state);

        if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
            const note = {
                userId: localStorage.getItem('userId'),
                title: this.state.title,
                description: this.state.description,
                reminder: this.state.reminder,
                color: this.state.color,
                image: this.state.image,
                archive: this.state.archive,
                pinned: this.state.pinned,
                trash: this.state.trash
            }

            createNote(note)
                .then((result) => 
                {

                    console.log("result in the result==>", result);

                    this.setState({
                        newNote: result.data.result
                    })
                    console.log("NOTES ARRY", this.state.newNote);

                    this.props.getNewNote(this.state.newNote)
                })

                .catch((error) => {
                    alert(error);
                })

            this.setState({
                title: "",
                description: "",
                reminder: "",
                color: "rgb(255, 255, 255)",
                image: "",
                archive: false,
                pinned: false,
                trash: false,
            })

        }

    }
    reminderchip = () => {
        this.setState({ reminder: "" })
        console.log("sssssssssssssssssssssssssssssssssss", this.state.reminder);


    }


    render() {

        // const { classes } = this.props;
        return (!this.state.openNote ?
            <MuiThemeProvider theme={theme}>
                <div className="createNoteParent">
                    <Card className="createNote">
                        <div className="staticCreateNote">
                            <Input
                                id="noteInputBase"
                                multiline
                                disableUnderline={true}
                                placeholder="Take a Note ...."
                                readOnly={true}
                                onClick={this.handleToggle}
                                value=""
                            />
                            <Image />
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
            :
            <MuiThemeProvider theme={theme}>
                <div className="createNoteParent"
                >
                    <Card id="createNote1" style={{ backgroundColor: this.state.color }}>
                        <div>
                            {this.state.image ?
                                <img style={{ maxWidth: "100%", height: "auto" }}
                                    src={this.state.image} alt="cardImage">
                                </img>
                                :
                                null
                            }
                        </div>
                        <div id="createNotePinIcon">
                            <Input
                                id="titleInput"
                                multiline
                                disableUnderline={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                            /> <div >
                                <Pin
                                    pinStatus={this.state.pinned}
                                    cardPropsToPin={this.handlePinned}
                                />

                            </div>

                        </div>
                        <Input
                            id="noteInputBase"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a Note ...."
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                        {this.state.reminder ?
                            <Chip id="chipcss"
                                label={this.state.reminder}
                                onDelete={() => this.reminderchip("")}
                            />
                            :
                            null}
                        <div className="cardToolsClose" >
                            <Tools
                                reminder={this.handleReminder}
                                createNotePropsToTools={this.handleColor}
                                archiveNote={this.handleArchive}
                                archiveStatus={this.state.archive}
                                uploadImage={this.handleImage}
                            />
                            <Button onClick={this.handleToggle}>Close</Button>

                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }


}

export default CreateNotescard;
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "10px",
            },
            elevation1: {
                boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },

})
