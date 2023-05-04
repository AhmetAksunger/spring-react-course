import React from "react";
import Input from "../components/input"
import { withTranslation } from "react-i18next"
import LanguageSelector from "../components/LanguageSelector";
import { login } from "../api/apiCalls";
import axios from "axios";
import ButtonWithProgress from "../components/ButtonWithProgress";

class UserLoginPage extends React.Component{

    state = {
        username: null,
        password: null,
        error: null,
    };

    onChange = (event) =>{
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })

    }

    onClickLogin = async event =>{

        this.setState({
            error: null
        })

        event.preventDefault();
        const creds = {
            username: this.state.username,
            password: this.state.password
        }

        try {
            const response = await login(creds)
        } catch (error) {
            if(error.response.data.message){
                this.setState({
                    error: error.response.data.message
                })
            }
        }
    }

    render(){
        const { t, pendingApiCall } = this.props
        const {username,password,error} = this.state
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">{t("Login")}</h1>
                    <Input type="text" name="username" label={t("Username")} onChange={this.onChange}/>
                    <Input type="password" name="password" label={t("Password")} onChange={this.onChange}/>
                    
                    {/*  ? excepts : but && doesn't except any else conditions
                    
                        i could also use &&. In that case if this.state.error existed, it would
                        write the message but else it wouldn't render anything
                    
                    */}

                    {error ? 
                    <div className="alert alert-danger mt-3">
                    {error}
                    </div>
                    :
                    <div></div>
                    }
{/*                     <button className="btn btn-primary" disabled={!username || !password || pendingApiCall} onClick={this.onClickLogin}>
                        {pendingApiCall &&
                        <span className="spinner-border spinner-border-sm"></span>                    
                        }
                        {t("Login")}
                    </button>*/}        

                    <ButtonWithProgress buttonText={t("Login")} onClickMethod={this.onClickLogin} pendingApiCall={pendingApiCall} disabledStatement={!username || !password || pendingApiCall} />
                            
                    </form>
                <LanguageSelector />

            </div>
            
        )
    }
}

export default withTranslation()(UserLoginPage);