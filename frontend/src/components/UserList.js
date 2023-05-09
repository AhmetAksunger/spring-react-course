import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/apiCalls'
import { useTranslation } from 'react-i18next'
import UserListItem from './UserListItem'

const UserList=(props) => {

    const {t} = useTranslation();
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0,
        totalPages: 0
    });

    const loadUsers = (pageNumber) => {
        getUsers(pageNumber).then( (response) => {
            setPage(response.data);
        })
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
    return (
    <div>
        <div className='card'>
            <h3 className='card-header text-center'>{t("Users")}</h3>
            <ul className="list-group">
            {users.map((user,index) => {
                return (
                    <UserListItem key={user.username} user={user} />
                )
            })}
        </ul>    
        </div>
        <div>
            <button type='button' className='btn btn-light float-end' onClick={onClickRaquo} disabled={last}>&raquo;</button>
            <button type='button' className='btn btn-light float-end' onClick={onClickNext} disabled={last}>{t("Next")}</button>
            <button type='button' className='btn btn-light' onClick={onClickLaquo} disabled={first}>&laquo;</button>
            <button type='button' className='btn btn-light' onClick={onClickPrevious} disabled={first}>{t("Previous")}</button>

        </div>
    </div>
    )
}

export default UserList;