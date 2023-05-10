import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';

const UserPage = (props) => {

    const[user, setUser] = useState({});
    const[notFound, setNotFound] = useState(false);

    const {username} = props.match.params;
    const {t} = useTranslation();

    const loadUser = async () => {
        setNotFound(false);
        try {
            const response = await getUser(username);
            setUser(response.data)
            
        } catch (error) {
            setNotFound(true)            
        }
    }
    
    useEffect(() => {
        loadUser();
    }, [username])



    return (
        <div className='container'>
            {notFound ? 
            <div class="rounded p-3 mb-2 bg-danger text-white text-center"
            style={{opacity: 0.8}}
            >
                <div>
                    <span class="material-symbols-outlined" style={{fontSize: 32}}>
                    error
                    </span>
                </div>
            {t("User not found")}
            </div>
            : 
            <ProfileCard user={user}/>
            }
        </div>
    );
};



export default (UserPage);