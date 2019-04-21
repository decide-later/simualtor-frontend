import React, {Component} from 'react';
import Label from "./Label"

class OptionBox extends Component{
    constructor(props){
        super(props);
    }
    onChangevalue = (e) => {
        let optboxes = document.querySelectorAll("input.optbox");
        let optVals = [];
        for(var i in optboxes){
            if(optboxes[i].value){
                optVals.push( {
                    "key" : optboxes[i].value,
                    "value" : optboxes[i].checked
                });
            }
        }
        console.log(optVals)
        this.props.onClick(optVals);
    }
    renderOptionBoxes = () => {
        let opts = this.props.data.question.options;
        let options = [];
        let name = this.props.data.case + "__" + this.props.data.level;
        let type = this.props.data.question.component ;
        let html_name = name+"[]";

        for(var val in opts){
            options.push(
                <div className="" key={"optbx_container"+val} >  
                    <label 
                        className=""
                        htmlFor={"optbx_"+val}
                        key={"optbx_label"+val} 
                        >
                        {Label(opts[val].caption)}
                    </label>
                    <input 
                        className={"optbox d-nonex optbox"+name}
                        type={type}
                        key={"optbx_"+val} 
                        id={"optbx_"+val} 
                        name={"optbx_"+html_name} 
                        value={opts[val].value}
                        onChange={this.onChangevalue}
                    />
                </div>
                
            )
        }
        console.log(this.props.data)
        return options;
    }
    render () {
        return (
            <div className="">
                {
                    this.renderOptionBoxes()
                }
            </div>
        )
    }
}

export default OptionBox;