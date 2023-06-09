import React from "react";

const Input = (props) => {
    const {name,label,onChange,error,type, defaultValue} = props
    const className = error == null ? "form-control" : "form-control is-invalid"
    return (
        <div className="form-group">
            <label>{label}</label>
            <input type={type} className={className} name={name} onChange={onChange} defaultValue={defaultValue}/>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
};

export default Input;