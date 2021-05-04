import React, { Component } from 'react';

const Input = ({ name, label, error, type, value, preview_src, ...rest}) => {
    return (
        <div className="mb-3">
            <label for={name} className="form-label">{ label }</label>
            <div className="form-inline">
            { (type === 'file') && preview_src && <img width="100" height="100" src={preview_src} /> }
            <input {...rest} name={name} type={type} autoFocus className="form-control" id={name} placeholder={label} />
            </div>
            { error && <div className="alert alert-danger">{error}</div>}

        </div>
    );
}
 
export default Input;