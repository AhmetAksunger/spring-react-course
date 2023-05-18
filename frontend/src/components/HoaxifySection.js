import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const HoaxifySection = (props) => {

    const {image} = useSelector((store) => {
        return {
            image: store.image
        }
    })

    const pendingApiCall = useApiProgress("post","/api/1.0/hoaxes");

    const [showButtons,setShowButtons] = useState(false);
    const [hoax,setHoax] = useState("");
    const [errors,setErrors] = useState({});

    const onClickTextArea = () => {
        setShowButtons(true);
    }

    const onChangeTextArea = (event) => {
        setHoax(event.target.value)
        setErrors({})
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
            setErrors(error.response.data.validationErrors);
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
                            <textarea class={errors.content ? "form-control mt-2 mb-2 is-invalid" : "form-control mt-2 mb-2"} rows={showButtons ? "5" : "2"} onClick={onClickTextArea} onChange={onChangeTextArea} value={hoax}></textarea>
                            <div className="invalid-feedback">
                            {errors.content}
                            </div>
                        </div>
                        {showButtons &&
                        <div className='mt-2 mb-2 text-end'>
                            <ButtonWithProgress className='btn btn-primary' buttonText="Hoaxify" onClickMethod={onClickHoaxify} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall}/>
                            <button disabled={pendingApiCall} className='btn btn-danger ms-1 me-2' onClick={onClickCancel}>Cancel</button>
                        </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HoaxifySection;