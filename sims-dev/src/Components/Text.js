import React, {Component} from 'react';

class TextBox extends Component{
    constructor(props){
        super(props);
    }
    renderTextBox = () => {
        let attr = this.props.data.question.component_attr;
        let name = this.props.data.case + "__" + this.props.data.level;
        return <input id={attr.type+"_"+name} {...attr} />;
    }
    render () {
        return (
            <div className="">
                {this.renderTextBox()}
            </div>
        )
    }
}

export default TextBox;