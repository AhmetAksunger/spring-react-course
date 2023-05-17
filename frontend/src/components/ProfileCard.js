import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
//import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {

    const [inEditMode,setInEditMode] = useState(false);
    const [updatedDisplayName,setUpdatedDisplayName] = useState();
    const [user,setUser] = useState({...props.user});
    const [newImage,setNewImage] = useState();

    const {username, displayName, image} = user;


    const routeParams = useParams();
    const {t} = useTranslation();
    const pendingApiCall = useApiProgress("put",`/api/1.0/users/${username}`)
    
    const {loggedInUsername} = useSelector((store) => {
        return {
            loggedInUsername: store.username
        }
    })

    const pathUsername = routeParams.username;

    const editable = pathUsername === loggedInUsername;

    const onClickSave = async () => {

        let image;
        if (newImage){
            image = newImage.split(",")[1];
        }

        const body = {
            displayName: updatedDisplayName,
            image: image
        };

        try {
            const response = await updateUser(username,body);
            console.log(response);
            setUser(response.data);
            setInEditMode(false);
        } catch (error) {
            console.log(error)
        }
    
    }

    const onClickCancel = () => {
        setInEditMode(false);
        setUpdatedDisplayName(displayName);
        setNewImage(undefined);
    }


    const onChangeFile = (event) => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div class="card">
            <div className='card-header text-center'>
                <ProfileImageWithDefault image={image} tempImage={newImage} width="256" 
                />
            </div>
            <div class="card-body text-center">
                {!inEditMode &&
                <>
                <h5 class="card-title">{displayName}@{username}</h5>
                
                {editable &&
                    <button className='btn btn-success' onClick={() => setInEditMode(true)}>
                    <span class="material-symbols-outlined me-1 d-inline-flex" style={{fontSize:16}}>
                    edit
                    </span>
                    {t("Edit")}
                </button>}
                </>                
                }
                
                {inEditMode &&
                <div>
                    <Input label={t("Edit Display Name")} name="edit" type="text" defaultValue={displayName} onChange={(event) => setUpdatedDisplayName(event.target.value)}/>
                    
                    <div class="mb-3">
                    <label for="formFile" class="form-label">{t("Choose Profile Picture")}</label>
                    <input class="form-control" type="file" onChange={onChangeFile}/>
                    </div>

                    {/* Save Button */}
                    <ButtonWithProgress className='btn btn-success d-inline-flex mt-2' onClickMethod={onClickSave} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall}
                    buttonText={
                        <>
                        <span class="material-symbols-outlined">save</span>                   
                        {t("Save")}
                        </>
                    }
                    
                    />

                    {/* Cancel Button */}
                    <button className='btn btn-danger d-inline-flex mt-2 ms-1' onClick={onClickCancel}>
                    <span class="material-symbols-outlined">cancel</span>
                        {t
                        ("Cancel")}
                    </button>
                </div>
                }


            </div>
        </div>
    );

};

export default ProfileCard;