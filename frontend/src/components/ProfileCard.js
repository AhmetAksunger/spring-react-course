import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
//import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {

    const loggedInUsername = props.username;
    const pathUsername = props.match.params.username;

    return (
        <div>
            {loggedInUsername === pathUsername ? <label>you can edit</label> : <label>  you cannot edit </label>}
        </div>
    );

};

export default withRouter(ProfileCard);