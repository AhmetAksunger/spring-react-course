import React, { Component } from 'react'
import { getUsers } from '../api/apiCalls'
import { withTranslation } from 'react-i18next'
import UserListItem from './UserListItem'

class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        getUsers().then( (response) => {
            this.setState({
                users: response.data.content
            })
        })
    }

    render() {
        const {t} = this.props;
        const {users} = this.state;
        return (
        <div>
            <div className='card'>
                <h3 className='card-header text-center'>{t("Users")}</h3>
                <ul class="list-group">
                {users.map((user,index) => {
                    return (
                        <UserListItem key={user.username} user={user} />
                    )
                })}
            </ul>    
            </div>
        </div>
        )
    }
}

export default withTranslation()(UserList)