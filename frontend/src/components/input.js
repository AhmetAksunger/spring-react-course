import React from "react";

const Input = (props) => {
    const {name,label,onChange,error} = props
    const className = error == null ? "form-control" : "form-control is-invalid"
    return (
        <div className="form-group">
        <label>{label}</label>
        <input type="text" className={className} name={name} onChange={onChange}/>
        <div className="invalid-feedback">
            {props.error}
        </div>
    </div>
    )
};

export default Input;