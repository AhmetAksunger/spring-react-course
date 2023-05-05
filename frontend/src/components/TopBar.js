import React, { Component } from 'react'
import logo from "../assets/hoaxify.png";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withTranslation } from 'react-i18next';

class TopBar extends Component {
  render() {
    const { t } = this.props;

    return (
        <div className='bg-light mb-2'>
            <nav className="navbar navbar-dark navbar-expand bg-primary shadow">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60"/>
                    Hoexify
                </Link>
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
            </nav>
        </div>
    )
  }
}

export default withTranslation()(TopBar)
