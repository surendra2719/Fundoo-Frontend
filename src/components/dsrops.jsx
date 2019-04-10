
	// import React from 'react'


	// import { DragDropContextProvider } from 'react-dnd'
	// import HTML5Backend from 'react-dnd-html5-backend'
	
	// function App() {
	// 	return (
	// 		<div className="App">
	// 			<DragDropContextProvider backend={HTML5Backend}>
	// 				<Example />
	// 			</DragDropContextProvider>
	// 		</div>
	// 	)
	// }
    import React, { Component } from 'react';
    	import { DragDropContextProvider } from 'react-dnd'
    import HTML5Backend from 'react-dnd-html5-backend'
    import Notes from '../components/notesdisplays'
import '../App.css';

class Drops extends Component {
    render() {
        return (
            <div >
               		<DragDropContextProvider backend={HTML5Backend}>
    // 				< Notes/>
	// 			</DragDropContextProvider>
            </div>
        );
    }
}
export default Drops;