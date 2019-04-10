import React, { Component } from 'react';
import '../App.css';
import { DragSource } from 'react-dnd'
const notesource ={
    beginDrag(props){
        return props.notes
    },
    endDrag( props,monitor,Component){
        return props.handleDrop( props.notes.key);
    }
}
function collect (connect,monitor){
    return{
        connectDragsource:connect.dragSource(),
        connectDragPreview:connect.dragPreview(),
        isDragging:monitor.isDragging()
    }
}
class Drag extends Component {
    render() {
        const{
            isDragging,connectDragsource,notes
        }=this.props
        return (
            <div 
                  noteID={this.props.noteID}
        >
            </div>
        );
    }
}
export default DragSource('notes', notesource, collect)(Drag)