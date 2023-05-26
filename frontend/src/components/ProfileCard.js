import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './input';
import { deleteUser, updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/authActions';
import Modal from './Modal';
//import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {

    const [inEditMode,setInEditMode] = useState(false);
    const [user,setUser] = useState({...props.user});
    const [newImage,setNewImage] = useState();
    const [errors,setErrors] = useState({});
    const [visible,setVisible] = useState(false);

    const {username, displayName, image} = user;
    const dispatch = useDispatch();

    const [updatedDisplayName,setUpdatedDisplayName] = useState(displayName);


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

    useEffect(() => {setErrors({})}, [updatedDisplayName,newImage])


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

            dispatch(updateSuccess(response.data));
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.validationErrors)
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

    const onClickDeleteModal = async () => {
        await deleteUser(pathUsername);
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
                <>
                <div className='d-flex flex-column align-items-center'>
                    <button className='btn btn-success' onClick={() => setInEditMode(true)}>
                        <span class="material-symbols-outlined me-1 d-inline-flex" style={{fontSize:16}}>
                        edit
                        </span>
                        {t("Edit")}
                    </button>
                </div>
                <div class="d-flex flex-column align-items-center">
                <button class="btn btn-danger mt-2 d-flex align-items-center" onClick={() => setVisible(true)}>
                    <span class="material-symbols-outlined mr-1 me-1">
                    person_remove
                    </span>
                    {t("Delete my account")}
                </button>
                </div>
                <Modal title={t("Delete Account")} visible={visible} onClickCancel={() => setVisible(false)} onClickDelete={onClickDeleteModal} message={
                    <div>
                        <div className='row'>
                            <strong>{t("Are you sure to delete your account?")}</strong>
                        </div>
                    </div>
                }/>
                </>
               }
                </>                
                }
                
                {inEditMode &&
                <div>
                    <Input label={t("Edit Display Name")} name="edit" type="text" error={errors.displayName} defaultValue={displayName} onChange={(event) => setUpdatedDisplayName(event.target.value)}/>
                    
                    <div class="mb-3">
                    <label for="formFile" class="form-label">{t("Choose Profile Picture")}</label>
                    <Input type="file" onChange={onChangeFile} error={errors.image}/>
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