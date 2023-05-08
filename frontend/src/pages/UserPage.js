import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';

const UserPage = (props) => {
    return (
        <div className='container'>
            <ProfileCard />
        </div>
    );
};



export default (UserPage);