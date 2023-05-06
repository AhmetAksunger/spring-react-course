import React, { Component } from 'react'
import logo from "../assets/hoaxify.png";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withTranslation } from 'react-i18next';
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

class TopBar extends Component {

    onClickLogout = () => {
        this.props.dispatch(logoutSuccess())
    }


    render() {
    const { t, isLoggedIn, username } = this.props;

    const onLogoutSuccess = () => {}

    //const cannot be reassigned once assigned
    //we should use let
    let links = (
        <ul className='navbar-nav ms-auto'>
        <li className='text-white'>
            <Link className="nav-link" to="/login">
            {t("Login")}
            </Link>
        </li>
        <li className='text-white'>
            <Link className="nav-link me-5" to="/signup">
            {t("Sign up")}
            </Link>
        </li>
    </ul>
    );

    if (isLoggedIn) {
        links = (
        <ul className='navbar-nav ms-auto'>
            <li className='nav-link text-white'>
                <Link className="nav-link" to={"/user/" + username}>
                {username}
                </Link>
            </li>
            <li className='nav-link text-white me-5' onClick={this.onClickLogout}>
                <Link className="nav-link" to="/login">
                {t("Logout")}
                </Link>

            </li>
        </ul>
        )
    }

    return (
        <div className='bg-light mb-2'>
            <nav className="navbar navbar-dark navbar-expand bg-primary shadow">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60"/>
                    Hoaxify
                </Link>

                {links}
            </nav>
        </div>
    )

  }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }
}

export default connect(mapStateToProps)(TopBarWithTranslation);