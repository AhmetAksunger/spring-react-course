import React, { useEffect, useState } from 'react';
import { getHoaxes, getNewHoaxesCount, getOldHoaxes } from '../api/apiCalls';
import HoaxListItem from './HoaxListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Spinner from './Spinner';

const HoaxFeed = () => {

    const [page,setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        totalPages: 0,
        last: false
    });

    const [newHoaxesCount, setNewHoaxesCount] = useState(0);

    let contentFirstElementId = 0
    if(page.content.length > 0){
        contentFirstElementId = page.content[0].id
    }

    const {t} = useTranslation();
    const pendingApiCall = useApiProgress("get",`/api/1.0/hoaxes/${contentFirstElementId}`);
    const pendingApiCallForNewHoaxes = useApiProgress("get",`/api/1.0/hoaxes?page`);

    useEffect(() => {
        loadHoaxes();
    },[]);

    useEffect(() => {
        let getCountLoop = setInterval(() => {
            getCount()
        }, 5000);

        return () => {
            clearInterval(getCountLoop)
        }
    },[contentFirstElementId])

    const getCount = async () => {

        try {
            const response = await getNewHoaxesCount(contentFirstElementId);
            setNewHoaxesCount(response.data.count);
        } catch (error) {
            console.log(error)
        }
    }


    const loadHoaxes = async (sizeNumber) => {
        
        try {
            const response = await getHoaxes(undefined,0,sizeNumber);
            setPage(response.data);    
        } catch (error) {
            
        }    
    }

    const loadOldHoaxes = async (sizeNumber = 5) => {
        
        try {
            const response = await getOldHoaxes(contentFirstElementId,page.number,sizeNumber)
            setPage(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickLoadOldHoaxes = () => {
        getCount();
        const nextHoaxes = page.size + 5;
        //loadHoaxes(nextHoaxes);
        loadOldHoaxes(nextHoaxes);
    }

    const onClickNewHoaxes = async () => {
        const sizeNumber = page.size + newHoaxesCount;
        await loadHoaxes(sizeNumber);
        setNewHoaxesCount(0);

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
        <div className='container'>
            {newHoaxesCount > 0 && 
            <div className='alert alert-secondary text-center mt-3' onClick={onClickNewHoaxes} style={{cursor: 'pointer'}}>
                
                {pendingApiCallForNewHoaxes ? <Spinner/> :
                (
                    <>
                    {t("There are some new hoaxes")}
                    <span class="ms-2 badge text-bg-secondary bg-danger">  {newHoaxesCount <= 9 ? newHoaxesCount : '9+'}</span>
                    </>
                )}
            </div>
            }
            {hoaxes.map((value,index) => {
                const {content: hoaxContent, timeStamp, fileAttachment ,user, id} = value;
                return (
                    <div>
                        <HoaxListItem key={index} content={hoaxContent} timeStamp={timeStamp} user={user} fileAttachment={fileAttachment} hoaxId={id} onDeleteSuccess={onDeleteSuccess} />
                    </div>
                )
            })}
            <div className='text-center mt-2'>
                <ButtonWithProgress buttonText={t("Load Old Hoaxes")} className='btn btn-primary' onClickMethod={onClickLoadOldHoaxes} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall || last} />
            </div>
        </div>
    );
};

export default HoaxFeed;