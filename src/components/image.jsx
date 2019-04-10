/*****************************************************************************************
 * @purpose : it will provides image component
 * @author  : Surendra      
 * @file    : image.jsx
 * @overview: These file may contain image component and its functions
 * @version : 1.0
 * @since   : 23/02/2019 
************************************************************************************************/
import React from 'react';
import image from '../assets/imaage.svg'
import IconButton from '@material-ui/core/IconButton';
import { uploadProfilePic1 } from "../services/note.services";
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    }
  }
  triggerInputFile() {
    this.fileInput.click();
  }
  uploadImage = (e) => {
    let data = new FormData();
    console.log("image:------------", e.target.files[0]);
    data.append('image', e.target.files[0]);
    uploadProfilePic1(data)
      .then((result) => {
        console.log("profile", result.data.data);
        // localStorage.setItem('profilePic', result.data.data);
        this.setState({
          image: result.data.data
        })
        this.props.uploadImage(this.state.image, this.props.noteID)
        // console.log("s33333333333333333333",this.state.image);

      }).catch((err) => {
        alert(err);
      })
  }
  render() {
    return (

      <div id="" >
        <IconButton onClick={() => { this.triggerInputFile() }}>
          <img src={image} alt="remainder"></img>
          <input ref={fileInput => this.fileInput = fileInput}
            type="file" style={{ 'display': 'none' }}
            className="uploadImage"
            onChange={(evt) => this.uploadImage(evt)}
          />
        </IconButton>
      </div>

    )
  }
}
export default Image;
