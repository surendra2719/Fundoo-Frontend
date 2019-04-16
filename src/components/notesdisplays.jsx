
import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import Tools from '../components/tools';
import { getNotes, updateColor, otherArray, updateArchives, isTrashed, setReminder, deleteNote, updateTitle, updateImages, updateDescription, saveLabel, updatePin } from '../services/note.services'
import { archiveArray, trashArray, remiderArray, pinArray } from '../services/note.services';
import ArchivedNavigator from '../components/navigators/archivenavigators';
import TrashNavigator from '../components/navigators/trashnavigator';
import ReminderNavigator from '../components/navigators/reminderNavigators'
import DialogBox from '../components/dialogboxComponent';
import PinAndOthers from '../components/notePin';
import EditPin from '../components/pin';
import SearchedNotes from './searchNotes'
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
// import { Container, Row, Col } from 'react-grid-system'
// import { DragDropContextProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
import '../App.css';
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext } from 'react-dnd'
// import Draggable from 'react-draggable'
export default class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
            open1: false,
            image: "",
            label: false,


        }
        this.cardsToDialogBox = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        // this.addLabelToNote = this.addLabelToNote.bind(this);
        // this.deleteLabelFromNote = this.deleteLabelFromNote.bind(this);
    }
    // onSortEnd = ({oldIndex, newIndex}) => {
    //     this.setState({
    //         items: arrayMove(this.state.notes, oldIndex, newIndex)
    //     });
    // };
    // dummy() {
    //     console.log(this.del);
    //     console.log(JSON.stringify(this.del));
    // }

    displayLabelledCards() {
        this.setState({ label: true })
    }
    handleClick = (note) => {
        this.setState({ open1: true })
        console.log("dilog note in notedisplay==>", note);
        this.cardsToDialogBox.current.getData(note);
    }
    closeEditBox = () => {
        this.setState({ open1: false })

    }
    makelabelfalse = () => {
        this.setState({ label: false })

    }

    archiveNote = (value, noteId) => {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        updateArchives(isArchived)
            .then((result) => {
                console.log("result in archive==>", result);

                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.result;
                        newArray[i].pinned = false;
                        newArray[i].trash = false;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    displayNewCard(newCard) {
        console.log("newCard", newCard);

        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    componentDidMount = () => {
        getNotes()
            .then((result) => {
                console.log("result",result);
                
                this.setState({
                    notes: result.data.result
                })
                // console.log("get notes", result.data.result[0].title);
                // console.log("this.state .notes", this.state.notes[0].title);
                console.log("get notes", result.data.result);
              
            })
            .catch((error) => {
            
                alert(error)
            });
    }

    getColor = (value, noteID) => {
        const color = {
            noteID: noteID,
            color: value
        }
        updateColor(color)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].color = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }

    deleteNote = (noteID) => {

        const deletedata = {
            noteID: noteID
        }
        deleteNote(deletedata)
            .then((result) => {
                console.log("delete note result==>", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray.splice(i, 1);
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((err) => {
                console.log("delete from the backend=> error");

            })


    }

    trashNote = (noteID) => {
        const trash = {
            noteID: noteID
        }
        console.log("noteid", noteID);

        isTrashed(trash)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].trash = result.data.result;
                        newArray[i].pinned = false;
                        newArray[i].archive = false
                        this.setState({
                            notes: newArray,
                            
                        })
                        console.log("newarray",newArray);
                        
                    }
                }

            })
            .catch((error) => {
                alert(error)
            });
    }
    uploadImage = (value, noteId) => {
        // console.log("image:--------======----", noteId);
        // let data = new FormData();
        // data.append('image', value);
        // data.append('noteID', noteId);
        // console.log("request----------------------------------", data.get("image"));
        const data = {
            noteID: noteId,
            image: value
        }
        updateImages(data)
            .then((result) => {
                console.log("result in updating note image", result.data.data);
                localStorage.setItem('image', result.data.data);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].image = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
    }

    pinNote = (value, noteID) => {
        const isPinned = {
            noteID: noteID,
            pinned: value
        }
        updatePin(isPinned)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].archive = false;
                        newArray[i].trash = false;
                        newArray[i].pinned = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }

            })
            .catch((error) => {
                alert(error)
            });
    }


    reminderNote = (value, noteID) => {
        console.log('notedisplay', noteID);

        const reminder1 = {
            noteID: noteID,
            reminder: value
        }
        setReminder(reminder1)
            .then((result) => {
                console.log('remider data-->', result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].reminder = result.data.result;

                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }

    editTitle = (value, noteID) => {
        const title = {
            noteID: noteID,
            title: value

        }
        updateTitle(title)
            .then((result) => {
                console.log('NOTE', result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].title = result.data.result;
                        this.setState({
                            notes: newArray
                        })

                    }
                }

            })
    }
    editDescription = (value, noteID) => {
        const description = {
            noteID: noteID,
            description: value
        }
        updateDescription(description)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].description = result.data.result;
                        this.setState({
                            notes: newArray
                        })

                    }
                }
            })
    }

    addLabelToNote = (noteID, value) => {
        const addLabel = {
            noteID: noteID,
            label: value
        }
        console.log("addlabel to note----->", addLabel);

        saveLabel('/saveLabelToNote', addLabel)
            .then((result) => {
                console.log("addlabel to note----->", result.data.data);

                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteID) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
                console.log("notes", this.state.notes);

            })
            .catch((error) => {
                alert(error)
            });
    }
    deleteLabelFromNote = (value, noteId) => {
        const deleteLabel = {
            pull: true,
            value: value,
            noteID: noteId
        }
        saveLabel('/saveLabelToNote', deleteLabel)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
    }


    makeLabelFalse = () => {
        this.setState({ label: false })
    }
    displayLabelledCards = () => {
        this.setState({ label: true })
    }
    render() {


        //         const notes={...notes}
        //         const SortableItem = SortableElement(({value}) => <li> {value}</li> );

        // const SortableList = SortableContainer(({...notes}) => {
        //     console.log("mapdwasda",notes);

        //     return (
        //       <span>
        //             {this.props.notes.map((value, index) =>
        //                 <SortableItem key={`item-${index}`} index={index} value={value} />

        //         )}
        //             </span>

        //     );
        // });

        let noteArray = otherArray(this.state.notes);
        console.log("NOTE DISPLAUY-->", noteArray);
        // const items = this.state.notes;
        if ((this.props.searchNote !== "" || this.state.label) && (!this.props.navigateArchived
            && !this.props.navigateReminder && !this.props.navigateTrashed)) {

            let searchNote;
            if (this.props.searchNote !== "") {

                searchNote = this.state.notes.filter(
                    obj => obj.title.includes(this.props.searchNote) ||
                        obj.description.includes(this.props.searchNote)
                )

            }
            else {
                searchNote = this.state.notes.filter(
                    obj => obj.label.length > 0 && obj.label.find((item) => item === this.props.labelValue))
            }
            return (
                <SearchedNotes
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    searchNote={searchNote}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else if (this.props.navigateArchived) {
            return (
                <ArchivedNavigator
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    archiveArray={archiveArray(this.state.notes)}
                    archiveNote={this.archiveNote}
                    reminder={this.reminderNote}
                    pinNote={this.pinNote}
                    noteProps={this.props.noteProps}
                    getColor={this.getColor}
                    trashNote={this.trashNote}
                    uploadImage={this.uploadImage}

                />
            )
        }
        else if (this.props.navigateTrashed) {
            return (
                <TrashNavigator
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    trashArray={trashArray(this.state.notes)}
                    othersArray={otherArray(this.state.notes)}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    trashNote={this.trashNote}
                    deleteNote={this.deleteNote}

                />
            )
        }
        else if (this.props.navigateReminder) {

            return (
                <ReminderNavigator
                    addLabelToNote={this.addLabelToNote}
                    remiderArray={remiderArray(this.state.notes)}
                    pinNote={this.pinNote}
                    othersArray={otherArray(this.state.notes)}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    uploadImage={this.uploadImage}
                    archiveNote={this.archiveNote}
                />
            )
        }
        else {
            let cardsView = this.props.noteProps ? "listCards" : "Cards";

            return (


                <div>
                    {pinArray(this.state.notes).length !== 0 ?
                        <PinAndOthers
                            createNotePropsToTools={this.getColor}
                            addLabelToNote={this.addLabelToNote}
                            deleteLabelFromNote={this.deleteLabelFromNote}
                            pinArray={pinArray(this.state.notes)}
                            pinNote={this.pinNote}
                            othersArray={otherArray(this.state.notes)}
                            getColor={this.getColor}
                            noteProps={this.props.noteProps}
                            reminder={this.reminderNote}
                            trashNote={this.trashNote}
                            archiveNote={this.archiveNote}
                            uploadImage={this.uploadImage}
                        // uploadImage={this.uploadImage}
                        />
                        :
                <div style={{display:"flex" }}>
                        <div className="CardsView">

                            {
                                Object.keys(noteArray).slice(0).reverse().map((key) => {

                                    console.log("NOTE DISPLAUY-->", noteArray[0].label.length);
                                    return (

                                        // <SortableList onSortEnd={this.onSortEnd} >
                                        // <  Draggable>
                                        <div>
                                            <Card key={key._id} className={cardsView} style={{ backgroundColor: noteArray[key].color, borderRadius: "10px", border: "1px solid #dadce0", marginLeft: "10px" }} >

                                                <div>
                                                    {noteArray[key].image ?
                                                        <img style={{ maxWidth: "100%", height: "auto" }}
                                                            src={noteArray[key].image} alt="cardImage">
                                                        </img>
                                                        :
                                                        null
                                                    }
                                                </div>

                                                <div onClick={() => this.handleClick(noteArray[key])} style={{ display: "flex", justifyContent: "space-between", wordBreak: "break-word" }} >
                                                    {noteArray[key].title}

                                                    <EditPin
                                                        cardPropsToPin={this.pinNote}
                                                        noteID={noteArray[key]._id}
                                                        pinStatus={noteArray[key].pinned}
                                                    />

                                                </div>

                                                <div onClick={() => this.handleClick(noteArray[key])} style={{ wordBreak: "break-word" }}>
                                                    {noteArray[key].description}
                                                </div>
                                                {noteArray[key].reminder ?
                                                    <Chip id="chipcss"
                                                        label={noteArray[key].reminder}
                                                        onDelete={() => this.reminderNote('', noteArray[key]._id)}
                                                    />
                                                    :
                                                    null}
                                                {noteArray[key].label.length > 0 ?
                                                    noteArray[key].label.map((key1, index) =>
                                                        <div key={index} >
                                                            <Chip
                                                                label={key1}
                                                                onDelete={() => this.deleteLabelFromNote(key1, noteArray[key]._id)}
                                                            />
                                                        </div>

                                                    )
                                                    :
                                                    null}
                                                <div id="">

                                                    <Tools
                                                        addLabelToNote={this.addLabelToNote}
                                                        deleteLabelFromNote={this.deleteLabelFromNote}
                                                        createNotePropsToTools={this.getColor}
                                                        noteID={noteArray[key]._id}
                                                        archiveNote={this.archiveNote}
                                                        archiveStatus={noteArray[key].archive}
                                                        trashNote={this.trashNote}
                                                        reminder={this.reminderNote}
                                                        note={noteArray[key].note}
                                                        uploadImage={this.uploadImage}
                                                        date={noteArray[key].reminder}
                                                        notetitle={noteArray[key].title}
                                                        notedescription={noteArray[key].description}

                                                    />
                                                </div>


                                            </Card>
                                        </div>
                                        //  </Draggable>  
                                        // </SortableList>
                                    )
                                })

                            }
                            {/* {
                                Object.keys(noteArray).map((key ,index)=>{
                                  <Key  note={notes.key} notes={notes}/>
                        

                                })
                            }

                        
                          <Drags/>  */}
                            {/* <RLDD
                                cssClasses="example"
                                items={items}
                                itemRenderer={this.itemRenderer}
                                onChange={this.handleRLDDChange}
                            /> */}

                        </div>
                        </div>
                    }
                    <DialogBox
                        addLabelToNote={this.addLabelToNote}
                        deleteLabelFromNote={this.deleteLabelFromNote}
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}
                        closeEditBox={this.closeEditBox}
                        archiveNote={this.archiveNote}
                        editTitle={this.editTitle}
                        editDescription={this.editDescription}
                        reminder={this.reminderNote}
                        createNotePropsToTools={this.getColor}
                        trashNote={this.trashNote}
                        ispinned={this.ispinned}
                        uploadImage={this.uploadImage}

                    />
                </div>
            );
        }
    }
    // itemRenderer(noteArray, index) {
    //     return (
    //         <div className="item">
    //             {/* <p className="title">{item.title}</p>
    //             <p className="body">{item.body}</p> */}
    //             <div className="small">
    //                 item.id: {noteArray.key} - index: {index}
    //             </div>
    //         </div>
    //     );
    // }
    // handleRLDDChange(reorderedItems) {
    //     this.setState({ items: reorderedItems });
    // }

}
// render(<Cards />, document.getElementById('root'));

