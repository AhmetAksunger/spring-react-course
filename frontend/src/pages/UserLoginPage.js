import React, { useEffect, useState } from "react";
import Input from "../components/input"
import { useTranslation } from "react-i18next"
import { login, setAuthorizationHeader } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";
//import { Authentication } from "../shared/AuthenticationContext";


const UserLoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error,  setError] = useState();

    const dispatch = useDispatch();

    // a hook function that will be executed if any effects occurs on the spesificed fields
    useEffect(() => {
        setError(undefined)
    }, [username, password])

    const onClickLogin = async event =>{

        setError(undefined)

        event.preventDefault();

        const creds = {
            username: username,
            password: password
        }

        try {
            const response = await login(creds);
            props.history.push("/");

            const authState = {
                username: response.data.username,
                displayName: response.data.displayName,
                image: response.data.image,
                password: password
            }
            
            dispatch(loginSuccess(authState))

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    
    const {t} = useTranslation();
    const {pendingApiCall } = props
    return(
        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>
                <Input type="text" name="username" label={t("Username")} onChange={(event) => {setUsername(event.target.value)}} />
                <Input type="password" name="password" label={t("Password")} onChange={(event) => {setPassword(event.target.value)}}/>
                
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

                <ButtonWithProgress buttonText={t("Login")} onClickMethod={onClickLogin} pendingApiCall={pendingApiCall} disabledStatement={!username || !password || pendingApiCall} />
                        
                </form>
        </div>
        
    )

}

const LoginPageWithApiProgress = withApiProgress(UserLoginPage,"post","/api/1.0/auth");

export default LoginPageWithApiProgress;