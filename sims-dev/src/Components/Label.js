import React from "react";
import ImageCaption from "./ImageCaption";

const Label = (caption) => {
    switch(caption.type){
        case "image":
            return <ImageCaption data={caption}/>;
        case "image_text":
            return <div className="">
                        <ImageCaption data={caption}/>
                        <span className = {caption.classes}> {caption.text.value}</span>
                    </div>
        case "text_image": 
            return <div className="">
                        <span className = {caption.classes}> {caption.text.value}</span>
                        <ImageCaption data={caption}/>
                    </div>
            
        default:
            return <span className = {caption.classes}> {caption.value}</span>
    }
}

export default Label;