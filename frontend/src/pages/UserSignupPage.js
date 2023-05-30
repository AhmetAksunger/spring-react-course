import React, { useState } from "react";
import {signup, changeLanguage, login} from "../api/apiCalls"
import Input from "../components/input"
import { useTranslation } from "react-i18next"
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";

const UserSignupPage = (props) => {

    //each class component must override render
    
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null
    });
    
    const [errors, setErrors] = useState({});


    const onChange = (event) =>{

        const {name, value} = event.target
        //const name = event.target.name;
        //const value = event.target.value;
        const errorsCopy = {...errors}; // copy errors
        errorsCopy[name] = undefined;

        if(name == "password" || name == "confirmPassword"){
            if(name == "password" && value !== form.confirmPassword){
                errorsCopy.confirmPassword = t("Passwords do not match")
            }
            else if(name == "confirmPassword" && value !== form.password){
                errorsCopy.confirmPassword = t("Passwords do not match")
            }else{
                errorsCopy.confirmPassword = undefined;
            }
        }
        setErrors(errorsCopy);
        
        const formCopy = {...form};
        formCopy[name] = value;

        setForm(formCopy);
    };


    const onClickSignup = async event =>{
        event.preventDefault()
        
        const body = {
            "username": form.username,
            "displayName": form.displayName,
            "password": form.password
        }

        try {
            const response = await signup(body)

            const creds = {
                username: body.username,
                password: body.password
            }

            const loginResponse = await login(creds);

            const authState = {
                username: loginResponse.data.user.username,
                displayName: loginResponse.data.user.displayName,
                image: loginResponse.data.user.image,
                password: body.password,
                token: loginResponse.data.token
            }

            dispatch(loginSuccess(authState))

            props.history.push("/")
            
        } catch (error) {
            if(error.response.data.validationErrors != null){
                setErrors(error.response.data.validationErrors)
            }
            console.log(error.response.data.validationErrors)            
        }
        
        

    };

    const {t} = useTranslation();
    const {pendingApiCall} = props;
    return(
        <div className="container">
            <form> 
                <h1 className="text-center">{t("Sign up")}</h1>
                <Input type="text" name="username" label={t("Username")} error ={errors.username} onChange={onChange} />
                <Input type="text" name="displayName" label={t("Display Name")} error ={errors.displayName} onChange={onChange} />
                <Input type="password" name="password" label={t("Password")} error ={errors.password} onChange={onChange} />
                <Input type="password" name="confirmPassword" label={t("Confirm Password")} error ={errors.confirmPassword} onChange={onChange} />
                
                {/*
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className={errors.username == null ? "form-control" : "form-control is-invalid"} name="username" onChange={this.onChange}/>
                    <div className="invalid-feedback">
                        {errors.username}
                    </div>
                </div>
                */}
                <ButtonWithProgress buttonText={t("Sign up")} pendingApiCall={pendingApiCall} onClickMethod={onClickSignup} disabledStatement={pendingApiCall || errors.confirmPassword !== undefined}/>
                
            </form>
        </div>
    );

}

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage,"post","/api/1.0/users")

export default UserSignupPageWithApiProgress;