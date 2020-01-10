import React from 'react';
import style from '../FormControl.module.css';

export interface IrenderFieldProps {
    input:any
    label: string
    type: string
    meta: any
}

export const renderField = ({input, label, type, meta: {touched, error, warning}}:IrenderFieldProps) => {
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

export const DropDownSelect = ({input, label, times, meta: {touched, error, warning}}: any) => {

    const renderSelectOptions = (option: string, index: number) => (
        <option key={option} value={index}>{option}</option>
    );

    return (
        <div>
            <label>{label}</label>
            <div className={style.fieldWrapper}>
                <select {...input}>
                    <option value="">Select</option>
                    {times.map(renderSelectOptions)}
                </select>
                {touched &&
                ((error && <span className={style.errorMessage}>{error}</span>)
                    || (warning && <span className={style.errorMessage}>{warning}</span>))}
            </div>
        </div>
    );
};



