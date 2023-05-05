import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
    return (
        <Authentication.Consumer>
            {(value) => {
                
                const loggedInUsername = value.state.username;
                const pathUsername = props.match.params.username;

                return (
                    <div>
                        {loggedInUsername === pathUsername ? <label>editleyebilirsin</label> : <label>  editleyemezsin </label>}
                    </div>
                );
            }

            }
        </Authentication.Consumer>
    ) 
};

export default withRouter(ProfileCard);