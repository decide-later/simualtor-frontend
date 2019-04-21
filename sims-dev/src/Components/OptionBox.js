import React, {Component} from 'react';
import Label from "./Label"

class OptionBox extends Component{
    constructor(props){
        super(props);
    }
    onChangevalue = (e) => {        
        let optboxes = document.querySelectorAll("input.optbox");
        let optVals = [];
        let active = "active";
        let p_active = "active_choice";
        for(var i in optboxes){
            if(optboxes[i].value){
                if(optboxes[i].checked){
                    optboxes[i].className += " "+active
                    optboxes[i].parentNode.className += " " + p_active;
                }else{
                    let cls = optboxes[i].className;
                    let p_cls = optboxes[i].parentNode.className;

                    optboxes[i].className = cls.replace(active,"");
                    optboxes[i].parentNode.className = p_cls.replace(p_active,"");
                }
                optVals.push( {
                    "key" : optboxes[i].value,
                    "value" : optboxes[i].checked
                });
            }
        }
        this.props.onClick(optVals);
    }
    renderOptionBoxes = () => {
        let opts = this.props.data.question.options;
        let options = [];
        let name = "response";
        let type = this.props.data.question.component ;
        let html_name = name+"[]";

        for(var val in opts){
            options.push(
                <div className="px-1 py-1" key={"optbx_container"+val} >  
                    <label 
                        className=""
                        htmlFor={"optbx_"+val}
                        key={"optbx_label"+val} 
                        >
                        {Label(opts[val].caption)}
                    </label>
                    <input 
                        className={"optbox d-none"}
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
        return options;
    }
    render () {
        return (
            <div className="d-inline-block">
                {
                    this.renderOptionBoxes()
                }
            </div>
        )
    }
}

export default OptionBox;