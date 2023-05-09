import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/apiCalls'
import { useTranslation } from 'react-i18next'
import UserListItem from './UserListItem'
import { withApiProgress } from '../shared/ApiProgress'

const UserList=(props) => {

    const {t} = useTranslation();
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0,
        totalPages: 0
    });

    const [loadFailure,setLoadFailure] = useState(false);

    const loadUsers = async (pageNumber) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(pageNumber);
            setPage(response.data)
        } catch (error) {
            setLoadFailure(true);
        }
    }

    // if you give an empty error, it will act like componentdidmount
    useEffect(() => {
        loadUsers();
    }, [])

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }
    
    const onClickRaquo = () => {
        const lastPage = page.totalPages - 1;
        loadUsers(lastPage)
    }

    const onClickLaquo = () => {
        const firstPage = 0;
        loadUsers(0);
    }

    const {content: users, last, first} = page;
    const {pendingApiCall} = props
    return (
    <div>
        <div className='card'>
            <h3 className='card-header text-center'>{t("Users")}</h3>
            {!pendingApiCall ?
            <ul className="list-group">
            {users.map((user,index) => {
                return (
                    <UserListItem key={user.username} user={user} />
                )
            })}
            </ul> 
            :
            <div class="d-flex justify-content-center">
                <span class="spinner-border mt-3" role="status" />
            </div>
            }

            {loadFailure && <div className='text-center text-danger'> {t("Failure")} </div>}

            <div>
                <button type='button' className='btn btn-light float-end' onClick={onClickRaquo} disabled={last || pendingApiCall}>&raquo;</button>
                <button type='button' className='btn btn-light float-end' onClick={onClickNext} disabled={last || pendingApiCall}>{t("Next")}</button>
                <button type='button' className='btn btn-light' onClick={onClickLaquo} disabled={first || pendingApiCall} >&laquo;</button>
                <button type='button' className='btn btn-light' onClick={onClickPrevious} disabled={first || pendingApiCall}>{t("Previous")}</button>
            </div>
        </div>
    </div>
    )
}

export default withApiProgress(UserList, "/api/1.0/users");