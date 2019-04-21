import React, {Component} from 'react';

class TextBox extends Component{
    renderTextBox = () => {
        let attr = this.props.data.question.component_attr;
        let name = this.props.data.case + "__" + this.props.data.level;
        return <input className="form-control" id={attr.type+"_"+name} {...attr} name="response" onChange={(e)=>{
                let response = {
                    "response" : e.target.value
                }
                this.props.onChange(response);
            }
        }/>;
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