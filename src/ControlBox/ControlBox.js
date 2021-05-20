import React from 'react';
import "./ControlBox.css"

class ControlBox extends React.Component {

    upload = () => {
        var element = document.getElementById('upload');
        console.log(element)
        element.click();

    }

    projectSite = () => {
        window.open("https://github.com/MichaelC1999/CSS-Practice-Engine", '_blank');
    }

    render() {
        return (
            <div className="controlBox" >
                <button type="none" onClick={this.props.changeSite}>New Image</button>
                <button type="none" onClick={() => this.props.changeDisplay("all")}>Display All</button>
                <button type="none" onClick={() => this.props.changeDisplay("inp")}>Inputs</button>
                <button type="none" onClick={() => this.props.changeDisplay("html")}>Current Render</button>
                <button type="none" onClick={() => this.props.changeDisplay("img")}>Wireframe</button>
                <button type="none" onClick={() => this.props.changeDisplay("img/html")}>Overlay</button>
                <button type="none" onClick={this.props.renderHTML}>Render HTML</button>
                <button type="none" onClick={this.props.renderCSS}>Render CSS</button>
                <button type="none" onClick={this.props.dload}>Save Code</button>
                <button type="none" onClick={this.upload}>Upload</button>
                <button type="none" onClick={this.projectSite}>Project</button>

                <input type="file" id="upload" style={{display: "none"}} onChange={(file) => this.props.fileUpload(file)}/>


            </div>
        )
    }
}

export default ControlBox