import React from 'react';
import UserList from '../components/UserList';
import HoaxifySection from '../components/HoaxifySection';
import { useSelector } from 'react-redux';
const HomePage = () => {

    const {isLoggedIn} = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn
        }
    })

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm'>
                    {isLoggedIn && <HoaxifySection />}
                </div>
                <div className='col-sm'>
                    <UserList />
                </div>

            </div>
        </div>
    );
};

export default HomePage;