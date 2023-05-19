import React, { useEffect, useState } from 'react';
import { getHoaxes } from '../api/apiCalls';
import HoaxListItem from './HoaxListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const HoaxFeed = () => {

    const [page,setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        totalPages: 0,
        last: false
    });

    const {t} = useTranslation();
    const pendingApiCall = useApiProgress("get","/api/1.0/hoaxes");

    useEffect(() => {
        loadHoaxes();
    },[]);

    const loadHoaxes = async (sizeNumber) => {
        
        try {
            const response = await getHoaxes(0,sizeNumber);
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
                const {content: hoaxContent, timeStamp} = value;
                return (
                    <div>
                        <HoaxListItem key={index} content={hoaxContent} timeStamp={timeStamp} />
                    </div>
                )
            })}
            <div className='text-center mt-2'>
                <ButtonWithProgress buttonText={t("Load Hoaxes")} className='btn btn-primary' onClickMethod={onClickLoadHoaxes} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall || last} />
            </div>
        </div>
    );
};

export default HoaxFeed;