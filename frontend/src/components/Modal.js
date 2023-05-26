import React from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {
    const {visible, onClickCancel, message, onClickDelete, pendingApiCall, title} = props;
    const {t} = useTranslation();
    let className = "modal fade";

    if(visible){
        className = "modal fade show d-block"
    }

    return (
        <div className={className} style={{backgroundColor: "#0000007a"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClickCancel}>{t("Close")}</button>
                        <ButtonWithProgress className="btn btn-danger" onClickMethod={onClickDelete} pendingApiCall={pendingApiCall} buttonText={t("Delete")} disabledStatement={pendingApiCall} /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;