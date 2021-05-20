import React from 'react'

//Component appears as a fraction of the screen. Is a text area that upon click of a button, sends string from box to parent component
//Also contains submit button to re render the HTML
class HTML extends React.Component {

    render() {
        return (<div>
            <textarea spellcheck="false" className="textbox" placeholder="Enter the page's HTML here. You are entering into the <body> tags." value={this.props.html} onChange={this.props.changeHTML.bind()} />
        </div>)
    }
    
}

export default HTML