import React from 'react';
import defaultProfileLogo from "../assets/profile.png"


const ProfileImageWithDefault = (props) => {
    
    const {image, width, tempImage, height} = props

    let imageSource = defaultProfileLogo;

    if(image){
        imageSource = "/images/" + image;
    }
    
    return (
        <img className='rounded-circle shadow' src={tempImage || imageSource} width={width} height={height} onError={(event) => {event.target.src=defaultProfileLogo}}/>
    );
};


export default ProfileImageWithDefault;