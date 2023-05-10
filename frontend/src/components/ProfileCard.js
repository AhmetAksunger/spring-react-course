import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
//import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {

    const routeParams = useParams();

    const {user} = props;
    const {username, displayName, image} = user;

    const {loggedInUsername} = useSelector((store) => {
        return {
            loggedInUsername: store.username
        }
    })


    const pathUsername = routeParams.username;

    return (
        <div class="card">
            <div className='card-header text-center'>
                <ProfileImageWithDefault image={image} width="256" />
            </div>
            <div class="card-body">
                <h5 class="card-title">{displayName}@{username}</h5>
            </div>
        </div>
    );

};

export default ProfileCard;