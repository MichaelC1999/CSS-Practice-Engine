import React from 'react'
import { Markup } from 'interweave';


class RenderBox extends React.Component {
    

    render() {

        return (
            <div className="HTMLRender">
                <Markup content={this.props.HTML} />

            </div>
            
        )
    }

}

export default RenderBox