import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';

const UserPage = (props) => {
    return (
        <div className='container'>
            <ProfileCard username = {props.username} />
        </div>
    );
};



const mapStateToProps = (store) => {
    return {
        username: store.username
    }
}

export default connect(mapStateToProps)(UserPage);