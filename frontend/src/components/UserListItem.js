import React from 'react';
import { Link } from "react-router-dom"
import ProfileImageWithDefault from './ProfileImageWithDefault';
const UserListItem = (props) => {
    const {user} = props;
    const {username,displayName,image} = user

    const {pendingApiCall} = props;
    return (
        <div>
            <li class="list-group-item list-group-item-action">
                <Link className="nav-link" to={"/user/" + username}>
                <ProfileImageWithDefault image={image} width="25" />
                <span className='ms-2'>
                {displayName}@{username}
                </span>
                </Link>
            </li>
        </div>
    );
};

export default UserListItem;