import React, {Component} from 'react';
const img_dir = "./images/labels/";

class ImageCaption extends Component{
    constructor(props){
        super(props);
    }
    renderImageCaption = () => {
        try {
            if(this.props.data.value ){
                var m = img_dir + this.props.data.value+ ".png";
                return <img src={m} alt={this.props.data.value} className="img-fluid"/>;
            }
        } catch (ex) {
            //console.log(ex);
        }
        
    }
    render () {
        return (
            <div className="">
                {this.renderImageCaption()}
            </div>
        )
    }
}

export default ImageCaption;