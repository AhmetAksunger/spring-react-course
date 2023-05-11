import React from 'react';
import defaultProfileLogo from "../assets/profile.png"


const ProfileImageWithDefault = (props) => {
    
    const {image, width} = props

    let imageSource = defaultProfileLogo;

    if(image){
        imageSource = image;
    }
    
    return (
        <img className='rounded-circle shadow' src={imageSource} width={width} />
    );
};


export default ProfileImageWithDefault;