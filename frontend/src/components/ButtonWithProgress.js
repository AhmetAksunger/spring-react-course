import React from "react";

const ButtonWithProgress = (props) => {

    const {onClickMethod, pendingApiCall, buttonText, disabledStatement} = props

    let className = props.className;

    if(className === undefined){
        className = "btn btn-primary";
    }

    return(
        <button className={className} disabled={disabledStatement} onClick={onClickMethod}>
        {pendingApiCall &&
        <span className="spinner-border spinner-border-sm"></span>                    
        }
        {buttonText}
        </button>
    )
}

export default ButtonWithProgress;