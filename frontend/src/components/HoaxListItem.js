import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const HoaxListItem = (props) => {
    
    const {content, timeStamp, user, fileAttachment} = props;
    const {username,displayName,image} = user;
    const {i18n} = useTranslation();

    const formattedTime = format(timeStamp,i18n.language);

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