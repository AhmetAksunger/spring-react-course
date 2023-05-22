import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './input';
import AutoImageUpload from './AutoImageUpload';

const HoaxifySection = (props) => {

    const {image} = useSelector((store) => {
        return {
            image: store.image
        }
    })

    const pendingApiCall = useApiProgress("post","/api/1.0/hoaxes");
    const pendingApiCallForImage = useApiProgress("post","/api/1.0/hoax-attachments",true);
    
    const [showButtons,setShowButtons] = useState(false);
    const [hoax,setHoax] = useState("");
    const [errors,setErrors] = useState({});
    const [newImage, setNewImage] = useState();

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
        setNewImage(undefined)
    }

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        };
        try {
            const response = await postHoax(body);
            setHoax("")
            
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }

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

        uploadFile(file);
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file',file);
        await postHoaxAttachment(attachment);
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
                        <>
                            <Input type="file" onChange={onChangeFile} error={undefined}/>
                            <AutoImageUpload image={newImage} pending={pendingApiCallForImage}/>
                            <div className='mt-2 mb-2 text-end'>
                                <ButtonWithProgress className='btn btn-primary' buttonText="Hoaxify" onClickMethod={onClickHoaxify} pendingApiCall={pendingApiCall} disabledStatement={pendingApiCall || pendingApiCallForImage}/>
                                <button disabled={pendingApiCall} className='btn btn-danger ms-1 me-2' onClick={onClickCancel}>Cancel</button>
                            </div>
                        </>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HoaxifySection;