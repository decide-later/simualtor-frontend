import React, { Component} from 'react';

class ActionCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: true
        }
    }

    render () {
        return (
            <button 
                className={ this.props.className + " action-card "}
                style={ {color : this.props.color}}
                onClick={()=>{
                    this.props.onClick(this.props.view)
                    }}>
                {this.props.caption}
            </button>
        )
    }

}

export default ActionCard;