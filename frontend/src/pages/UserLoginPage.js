import React from "react";
import Input from "../components/input"
import { withTranslation } from "react-i18next"
import LanguageSelector from "../components/LanguageSelector";
import { login } from "../api/apiCalls";

class UserLoginPage extends React.Component{

    state = {
        username: null,
        password: null
    };

    onChange = (event) =>{
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })

    }

    onClickLogin = event =>{
        event.preventDefault();
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        login(creds)
    }

    render(){
        const { t } = this.props
        const {username,password} = this.state
        return(
            <div className="container">
                <form>
                    <h1>{t("Login")}</h1>
                    <Input type="text" name="username" label={t("Username")} onChange={this.onChange}/>
                    <Input type="password" name="password" label={t("Password")} onChange={this.onChange}/>
                    <button className="btn btn-primary" disabled={!username || !password} onClick={this.onClickLogin}>{t("Login")}</button>
                </form>
                <LanguageSelector />

            </div>
            
        )
    }
}

export default withTranslation()(UserLoginPage);