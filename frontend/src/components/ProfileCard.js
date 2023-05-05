import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';

const ProfileCard = (props) => {
    
    const loggedInUsername = props.username;
    const pathUsername = props.match.params.username;

    return (
        <div>
            {loggedInUsername === pathUsername ? <label>editleyebilirsin</label> : <label>  editleyemezsin </label>}
        </div>
    );
};

export default withRouter(ProfileCard);