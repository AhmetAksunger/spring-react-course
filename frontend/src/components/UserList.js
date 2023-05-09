import React, { Component } from 'react'
import { getUsers } from '../api/apiCalls'
import { withTranslation } from 'react-i18next'
import UserListItem from './UserListItem'

class UserList extends Component {

    state = {
        page: {
            content: [],
            size: 3,
            number: 0
        }
    }

    loadUsers = (pageNumber) => {
        getUsers(pageNumber).then( (response) => {
            this.setState({
                page: response.data
            })
        })
    }

    componentDidMount() {
        this.loadUsers();
    }

    onClickNext = () => {
        const nextPage = this.state.page.number + 1;
        this.loadUsers(nextPage);
    }

    onClickPrevious = () => {
        const previousPage = this.state.page.number - 1;
        this.loadUsers(previousPage);
    }
    
    onClickRaquo = () => {
        const lastPage = this.state.page.totalPages - 1;
        this.loadUsers(lastPage)
    }

    onClickLaquo = () => {
        const firstPage = 0;
        this.loadUsers(0);
    }

    render() {
        const {t} = this.props;
        const {content: users, last, first} = this.state.page;
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
                <button type='button' className='btn btn-light float-end' onClick={this.onClickRaquo} disabled={last}>&raquo;</button>
                <button type='button' className='btn btn-light float-end' onClick={this.onClickNext} disabled={last}>{t("Next")}</button>
                <button type='button' className='btn btn-light' onClick={this.onClickLaquo} disabled={first}>&laquo;</button>
                <button type='button' className='btn btn-light' onClick={this.onClickPrevious} disabled={first}>{t("Previous")}</button>

            </div>
        </div>
        )
    }
}

export default withTranslation()(UserList)