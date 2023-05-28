import logo from "../assets/hoaxify.png";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useTranslation} from 'react-i18next';
//import { Authentication } from '../shared/AuthenticationContext';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import { clearAuthorizationHeader } from "../api/apiCalls";
import DropdownMenu from "./DropdownMenu";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useState } from "react";

const TopBar = (props) => {

    const [menuVisible,setMenuVisible] = useState(false);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const { isLoggedIn, username, displayName, image} = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image: store.image
        };
    });

    const onClickLogout = () => {
        dispatch(logoutSuccess())
        setMenuVisible(false)
    }

    const onClickMyProfile = () => {
        setMenuVisible(false);
    }
    
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
            <li className="nav-item dropdown">
                <div className="d-flex align-items-center" style={{cursor: "pointer"}} onClick={() => {setMenuVisible(!menuVisible)}}>
                    <ProfileImageWithDefault image={image} width="32" height="32" />
                    <span className='nav-link text-white dropdown-toggle me-5'>{displayName}</span>
                </div>
                <div className={menuVisible ? "dropdown-menu show shadow p-0" : "dropdown-menu shadow p-0"}>
                    <div className="d-flex align-items-center">
                        <span class="material-symbols-outlined">
                        person
                        </span>
                        <Link className="dropdown-item" to={"/user/" + username} onClick={onClickMyProfile}>
                        {t("My Profile")}
                        </Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <span class="material-symbols-outlined text-danger">
                        logout
                        </span>
                        <Link className="dropdown-item me-5" to="/login" onClick={onClickLogout}>
                        {t("Logout")}
                        </Link>
                    </div>

                </div>
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


export default TopBar;