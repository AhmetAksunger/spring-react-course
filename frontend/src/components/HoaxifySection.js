import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax } from '../api/apiCalls';

const HoaxifySection = (props) => {

    const {image} = useSelector((store) => {
        return {
            image: store.image
        }
    })

    const [showButtons,setShowButtons] = useState(false);
    const [hoax,setHoax] = useState("");

    const onClickTextArea = () => {
        setShowButtons(true);
    }

    const onChangeTextArea = (event) => {
        setHoax(event.target.value)
    }

    const onClickCancel = () => {
        setHoax("")
        setShowButtons(false)
    }

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        };
        try {
            const response = await postHoax(body);
        } catch (error) {
            
        }

    }

    return (
        <div className='card'>
            <div className='row'>
                <div className='col-auto'>
                <ProfileImageWithDefault image={image} width="32" height="32" />
                </div>
                <div className='col'>
                    <form>
                        <div class="form-group">
                            <textarea class="form-control mt-2 mb-2" rows={showButtons ? "5" : "2"} onClick={onClickTextArea} onChange={onChangeTextArea} value={hoax}></textarea>
                        </div>
                        {showButtons &&
                        <div className='mt-2 mb-2 text-end'>
                            <button className='btn btn-primary' onClick={onClickHoaxify}>Hoaxify</button>
                            <button className='btn btn-danger ms-1 me-2' onClick={onClickCancel}>Cancel</button>
                        </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HoaxifySection;