import React from 'react';
import defaultProfileLogo from "../assets/profile.png"
import { Link } from "react-router-dom"
const UserListItem = (props) => {
    const {user} = props;
    const {username,displayName,image} = user

    let imageSource = defaultProfileLogo;

    if(image){
        imageSource = image;
    }

    return (
        <div>
            <li class="list-group-item list-group-item-action">
                <Link className="nav-link" to={"/user/" + username}>
                <img className='rounded-circle me-2' src={imageSource} width="25" />
                {displayName}@{username}
                </Link>
            </li>
        </div>
    );
};

export default UserListItem;