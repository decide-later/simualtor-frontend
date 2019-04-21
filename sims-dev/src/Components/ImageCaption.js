import React, {Component} from 'react';
const img_dir = "../Images/labels/";

class ImageCaption extends Component{
    constructor(props){
        super(props);
    }
    renderImageCaption = () => {
        return <img src={ img_dir + this.props.data.value} alt={this.props.data.value} className="img-fluid"/>;
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