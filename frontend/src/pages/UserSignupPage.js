import React from "react";
import {signup, changeLanguage} from "../api/apiCalls"
import Input from "../components/input"
import { withTranslation } from "react-i18next"
import ButtonWithProgress from "../components/ButtonWithProgress";
import LanguageSelector from "../components/LanguageSelector";

class UserSignupPage extends React.Component{

    //each class component must override render
    
    state = {
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null,
        errors: {}
    };

    onChange = event =>{

        const {name, value} = event.target
        //const name = event.target.name;
        //const value = event.target.value;
        const errors = {...this.state.errors}; // copy errors
        errors[name] = undefined;

        if(name == "password" || name == "confirmPassword"){
            if(name == "password" && value != this.state.confirmPassword){
                errors.confirmPassword = this.props.t("Passwords do not match")
            }
            else if(name == "confirmPassword" && value != this.state.password){
                errors.confirmPassword = this.props.t("Passwords do not match")
            }else{
                errors.confirmPassword = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors: errors
        })
    };

    onClickSignup = async event =>{
        event.preventDefault()
        
        const {username,displayName,password,pendingApiCall} = this.state

        const body = {
            "username": username,
            "displayName": displayName,
            "password": password
        }

        try {
            const response = await signup(body)
            
        } catch (error) {
            
            if(error.response.data.validationErrors != null){
                this.setState({
                    errors: error.response.data.validationErrors 
                })
            }
            
        }
        
        
        /*
        .then(
            (response) => {
                this.setState({
                    pendingApiCall: false
                })
            }
        ).catch((error) => {
            this.setState({
                pendingApiCall: false
            })
        })
        */

    };

    render(){
        
        const {t,pendingApiCall} = this.props;
        const {errors} = this.state;
        return(
            <div className="container">
                <form> 
                    <h1 className="text-center">{t("Sign up")}</h1>
                    <Input type="text" name="username" label={t("Username")} error ={errors.username} onChange={this.onChange} />
                    <Input type="text" name="displayName" label={t("Display Name")} error ={errors.displayName} onChange={this.onChange} />
                    <Input type="password" name="password" label={t("Password")} error ={errors.password} onChange={this.onChange} />
                    <Input type="password" name="confirmPassword" label={t("Confirm Password")} error ={errors.confirmPassword} onChange={this.onChange} />
                    
                    {/*
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className={errors.username == null ? "form-control" : "form-control is-invalid"} name="username" onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {errors.username}
                        </div>
                    </div>
                    */}
                    <ButtonWithProgress buttonText={t("Sign up")} pendingApiCall={pendingApiCall} onClickMethod={this.onClickSignup} disabledStatement={pendingApiCall || errors.confirmPassword != undefined}/>
                </form>
                <LanguageSelector />
            </div>
        );
    }

}

export default withTranslation()(UserSignupPage);