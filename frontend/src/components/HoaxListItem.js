import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const HoaxListItem = (props) => {
    
    const loggedInUsername = useSelector((store) => {
        return store.username;
    })
    const {content, timeStamp, user, fileAttachment,hoaxId, onDeleteSuccess} = props;
    const {username,displayName,image} = user;
    const {i18n, t} = useTranslation();

    const pendingApiCall = useApiProgress("delete",`/api/1.0/hoaxes/${hoaxId}`,true);

    const [visible,setVisible] = useState(false);

    const formattedTime = format(timeStamp,i18n.language);

    const ownedByLoggedInUser = loggedInUsername === username;

    const onClickDelete = () => {
        setVisible(true);
    }

    const onClickCancelModal = () => {
        setVisible(false);
    }

    const onClickDeleteModal = async () => {
        await deleteHoax(hoaxId);
        onDeleteSuccess();
        setVisible(false);
    }

    return (
        <>
        <div className='card mt-3'>
            <div className='row'>
                <div className='col-auto'>
                    <ProfileImageWithDefault image={image} width="32" height="32" />
                    <span className='ms-2 fw-bold'>
                        <Link className="text-dark text-decoration-none" to={`/user/${username}`}>{displayName}@{username}</Link>
                    </span>
                    <span className='ms-2 fw-light'>
                        {formattedTime}
                    </span>
                    {ownedByLoggedInUser &&
                    <button className='btn btn-delete-link mt-1 ms-2' onClick={onClickDelete}>
                        <span class="material-symbols-outlined">delete</span>
                    </button> 
                    }
                </div>
            </div>
            <form>
                <div class="form-group">
                    <textarea class="form-control mt-2 mb-2" value={content}/>
                </div>
                {fileAttachment && <img className='img-thumbnail' src={"/images/" + fileAttachment.name}/> }
            </form>
        </div>
        <Modal title={t("Delete hoax")} visible={visible} onClickCancel={onClickCancelModal} onClickDelete={onClickDeleteModal} pendingApiCall={pendingApiCall} message={
            <div>
                <div className='row'>
                    <strong>{t("Are you sure to delete the hoax?")}</strong>
                </div>
                <div className='row'>
                    <span>{content}</span>
                </div>
            </div>
        }/>
        </>
    );
};

export default HoaxListItem;