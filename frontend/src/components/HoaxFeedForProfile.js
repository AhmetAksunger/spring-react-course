import React, { useEffect, useState } from 'react';
import { getHoaxes } from '../api/apiCalls';
import HoaxListItem from './HoaxListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const HoaxFeedForProfile = () => {
    const [page,setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        totalPages: 0,
        last: false
    });

    const {t} = useTranslation();
    const {username} = useParams();

    useEffect(() => {
        loadHoaxes();
    },[]);

    const loadHoaxes = async (sizeNumber) => {
        
        try {
            const response = await getHoaxes(username,0,sizeNumber);
            setPage(response.data);    
        } catch (error) {
            
        }    
    }

    const onClickLoadHoaxes = () => {
        const nextHoaxes = page.size + 5;
        loadHoaxes(nextHoaxes);
    }

    const {content: hoaxes, last} = page;

    if(hoaxes.length === 0){
        return(
            <div className='text-center mt-4'>
                <span className='alert alert-secondary'>{t("There are no hoaxes")}</span>
            </div>
        );
    }

    return (
        <div>
            {hoaxes.map((value,index) => {
                const {content: hoaxContent, timeStamp, user} = value;
                return (
                    <div>
                        <HoaxListItem key={index} content={hoaxContent} timeStamp={timeStamp} user={user}/>
                    </div>
                )
            })}
        </div>
    );
}

export default HoaxFeedForProfile;