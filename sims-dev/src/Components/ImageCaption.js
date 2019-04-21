import React, {Component} from 'react';
const img_dir = "./images/labels/";

class ImageCaption extends Component{
    renderImageCaption = () => {
        try {
            if(this.props.data.image.value ){
                var m = img_dir + this.props.data.image.value+ ".png";
                return <img src={m} alt={this.props.data.text.value} className="img-fluid"/>;
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