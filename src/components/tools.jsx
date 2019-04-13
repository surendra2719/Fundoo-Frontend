import React, { Component } from 'react';
import Reminder from './remainder'
import Color from './color'
// import Collaborator from './collaborator'
import Archieves from './archives'
import Moreoptions from './moreOptions'
import Image from '../components/image'
class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.moreOptionsToAddLabels = React.createRef();
        this.handleLabelsOnNote = this.handleLabelsOnNote.bind(this);
    }
    handleToggle() {
        this.setState({ open: !this.state.open });
    }
    closeLabelPopper() {
        this.setState({
            open: false
        })
    }
    handleLabelsOnNote(e) {
        this.setState({
            open: false
        })
        this.moreOptionsToAddLabels.current.addLabelPopup(e);
    }
    render() {

        return (
            <div>
                <div id="cardTools">
                    <Reminder
                        reminder={this.props.reminder}
                        note={this.props.note}
                        noteID={this.props.noteID}
                        date={this.props.date}
                        notetitle={this.props.notetitle}
                        notedescription={this.props.notedescription}
                    />
                    < Color
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                    {/* < Collaborator/> */}

                    <Archieves
                        archiveNote={this.props.archiveNote}
                        archiveStatus={this.props.archiveStatus}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                    <Image
                        uploadImage={this.props.uploadImage}
                        noteID={this.props.noteID}
                    />
                    <Moreoptions
                        addLabelToNote={this.props.addLabelToNote}
                        trashNote={this.props.trashNote}
                        noteID={this.props.noteID}
                    />
                </div>
            </div>

        )
    }
}
export default Tools;

