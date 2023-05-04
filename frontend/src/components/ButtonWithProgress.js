import React from "react";

const ButtonWithProgress = (props) => {

    const {onClickMethod, pendingApiCall, buttonText, disabledStatement} = props

    return(
        <button className="btn btn-primary" disabled={disabledStatement} onClick={onClickMethod}>
        {pendingApiCall &&
        <span className="spinner-border spinner-border-sm"></span>                    
        }
        {buttonText}
        </button>
    )
}

export default ButtonWithProgress;