import React from 'react';
import style from '../FormControl.module.css';

export interface I_renderFieldProps {
    input:any
    label: string
    type: string
    meta: any
}

export const renderField = ({input, label, type, meta: {touched, error, warning}}:I_renderFieldProps) => {
    let classForField = () => {
        if(touched) {
            return style.fieldWrapper + ' ' + (error && touched ? style.error : style.success)
        } else {
            return style.fieldWrapper;
        }
    };
    return (
    <div>
        <label>{label}</label>
        <div className={classForField()}>
            <input {...input} type={type}/>
            {touched &&
            ((error && <span className={style.errorMessage}>{error}</span>)
                || (warning && <span className={style.errorMessage}>{warning}</span>))}
        </div>
    </div>
)};



