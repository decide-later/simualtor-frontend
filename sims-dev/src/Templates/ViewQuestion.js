import React, {Component} from "react";
import MapPickerOption from "../Components/MapPickerOption";
import CheckBox from "../Components/Option";
import Text from "../Components/Text"

class ViewQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillReceiveProps(){
        this.setState(this.props.viewdata)
    }
    renderQuestion(data){
        //data.question.question
        if(data.question){
            return data.question.question;
        }
        return "";
    }
    renderAnswerPrompt(data){
        if(data.question){
            switch(data.question.component){
                case "map_picker": 
                    return <MapPickerOption
                            onClick={this.props.onClick}
                            data={data}
                        />;
                case "radio":
                case "checkbox":
                    return <CheckBox
                        onClick={this.props.onClick}
                        data={data}
                    />;
                default:
                return <Text
                        onClick={this.props.onClick}
                        data={data}
                    />;
            }
        }
    }
    render () {
        return (
            <div className="">
                <div className="">
                    {this.renderQuestion(this.props.viewdata)}
                </div>
                <div className="mt-1">
                    {this.renderAnswerPrompt(this.props.viewdata)}
                </div>
            </div>
        )
    }
}

export default ViewQuestion;