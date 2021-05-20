import React from 'react'

class CSS extends React.Component {

    render() {
        return (<div>
            <textarea spellcheck="false" className="textbox" placeholder="Enter the CSS here" value={this.props.css} onChange={this.props.changeCSS.bind()} />
        </div>)
    }
    
}

export default CSS