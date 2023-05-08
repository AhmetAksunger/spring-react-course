import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
//import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {


    const routeParams = useParams();

    const {loggedInUsername} = useSelector((store) => {
        return {
            loggedInUsername: store.username
        }
    })

    
    const pathUsername = routeParams.username;

    return (
        <div>
            {loggedInUsername === pathUsername ? <label>you can edit</label> : <label>  you cannot edit </label>}
        </div>
    );

};

export default ProfileCard;