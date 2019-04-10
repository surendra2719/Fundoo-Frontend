import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import EditPin from '../components/pin';
import Tools from './tools';

class SearchedNotes extends Component {
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginLeft: "68px" }}>SEARCHED NOTES</label>
                <div className="CardsView" style={{ marginBottom: "30px" }}>
                    {this.props.searchNote.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color ,marginLeft:"10px",borderRadius: "10px", border: "1px solid #dadce0",}} >
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between"}}>
                                        <b>{key.title}</b>
                                        <EditPin cardPropsToPin={this.props.pinNote}
                                            noteID={key._id}
                                            pinStatus={key.pinned}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    {key.reminder !== "" ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)} />
                                        :
                                        null}
                                </div>

                                <div className="noteicons">
                                    <Tools createNotePropsToTools={this.props.getColor}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminder}
                                        trashNote={this.props.trashNote}
                                        archiveNote={this.props.archiveNote}
                                        archiveStatus={key.archive}
                                    />

                                </div>

                            </Card>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
export default SearchedNotes;