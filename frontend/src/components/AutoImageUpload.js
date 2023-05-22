import React from 'react';
import "./AutoImageUploadCSS.css";

const AutoImageUpload = (props) => {
    const {image,pending} = props;
    return (
        <div className='myContainer'>
            <img className='img-thumbnail' src={image}/>
            <div className='overlay' style={pending ? {opacity: 1} : {opacity: 0}}>
                <div class="text-white d-flex justify-content-center h-100">
                    <span class="spinner-border m-auto" role="status" />
                </div>
            </div>
        </div>
    );
};

export default AutoImageUpload;