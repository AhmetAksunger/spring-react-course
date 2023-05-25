import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';

const HoaxListItem = (props) => {
    
    const loggedInUsername = useSelector((store) => {
        return store.username;
    })
    const {content, timeStamp, user, fileAttachment,hoaxId, onDeleteSuccess} = props;
    const {username,displayName,image} = user;
    const {i18n} = useTranslation();

    const formattedTime = format(timeStamp,i18n.language);

    const ownedByLoggedInUser = loggedInUsername === username;

    const onClickDelete = async () => {
        await deleteHoax(hoaxId);
        onDeleteSuccess();
    }

    return (
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
    );
};

export default HoaxListItem;