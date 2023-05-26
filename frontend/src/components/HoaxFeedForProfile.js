import React, { useEffect, useState } from 'react';
import { getHoaxes, getOldHoaxes } from '../api/apiCalls';
import HoaxListItem from './HoaxListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonWithProgress from './ButtonWithProgress';

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
    const pendingApiCall = useApiProgress("get",`/api/1.0/users/${username}/hoaxes`)

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

    const onClickLoadOldHoaxes = async () => {
        const contentFirstElementId = page.content[0].id;
        const size = page.size + 5;
         try {
            const response = await getOldHoaxes(contentFirstElementId,0,size,username);
            setPage(response.data);    
        } catch (error) {
            
        }
    }

    const {content: hoaxes, last} = page;

    if(hoaxes.length === 0){
        return(
            <div className='text-center mt-4'>
                <span className='alert alert-secondary'>{t("There are no hoaxes")}</span>
            </div>
        );
    }

    const onDeleteSuccess = () => {
        loadHoaxes(page.size - 1);
    }

    return (
        <div>
            {hoaxes.map((value,index) => {
                const {content: hoaxContent, timeStamp, user, id, fileAttachment} = value;
                return (
                    <div>
                        <HoaxListItem key={index} content={hoaxContent} fileAttachment={fileAttachment} timeStamp={timeStamp} user={user} hoaxId={id} onDeleteSuccess={onDeleteSuccess}/>
                    </div>
                )
            })}
            <div className='text-center mt-2'>
                <ButtonWithProgress buttonText={t("Load Old Hoaxes")} className='btn btn-primary' onClickMethod={onClickLoadOldHoaxes} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall || last} />
            </div>
        </div>
    );
}

export default HoaxFeedForProfile;