import React, { useEffect, useState } from 'react';
import { getHoaxes } from '../api/apiCalls';
import HoaxListItem from './HoaxListItem';
import { useTranslation } from 'react-i18next';

const HoaxFeed = () => {

    const [page,setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        totalPages: 0
    });

    const {t} = useTranslation();

    useEffect(() => {
        loadHoaxes();
    },[]);

    const loadHoaxes = async (sizeNumber) => {
        const response = await getHoaxes(0,sizeNumber);
        setPage(response.data);    
    }

    const onClickLoadHoaxes = () => {
        const nextHoaxes = page.size + 5;
        loadHoaxes(nextHoaxes);
    }

    const {content: hoaxes} = page;

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
                        <HoaxListItem content={hoaxContent} timeStamp={timeStamp} />
                    </div>
                )
            })}
            <div className='text-center mt-2'>
                <button className='btn btn-primary' onClick={onClickLoadHoaxes}>{t("Load Hoaxes")}</button>
            </div>
        </div>
    );
};

export default HoaxFeed;