import React, { Component, useState } from 'react'

export const ImageUpload = ({text,setText}) => {

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.useState({
            base64TextString: btoa(binaryString)
        })
    }

    onchange= (e) => {
        console.log("File to upload:", e.target.files[0])
        let file = e.target.files[0];

        if (file){
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    onFileSubmit = (e) => {
        e.preventDefault()
        const preview = document.getElementById('profile-picture');
        console.log("binary string ", this.state.base64TextString);

        let payload = {image: this.state.base64TextString};

    }

    return 
        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
            <input 
                type="file"
                name="image"
                id="file"
                accept=".jpeg, .png, .jpg"
            />
            <input type="submit" />
        </form>
        
}

export default ImageUpload;